import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { agentRouter } from "./api/agents";
import {
  createChatConversation,
  getChatConversationBySessionId,
  getChatMessages,
  addChatMessage,
  createContactMessage
} from "./db";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { AGENT_TOOLS, executeTool, getToolsForLLM } from "./agent-tools";

// In-memory chat storage for when database is not available
const inMemoryChats = new Map<string, { id: number; messages: Array<{ role: string; content: string }> }>();
let chatIdCounter = 1;

export const appRouter = router({
  system: systemRouter,
  agents: agentRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    // Initialize or get conversation
    initConversation: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .mutation(async ({ input }) => {
        try {
          let conversation = await getChatConversationBySessionId(input.sessionId);

          if (!conversation) {
            await createChatConversation(input.sessionId);
            conversation = await getChatConversationBySessionId(input.sessionId);
          }

          return conversation;
        } catch {
          // Fallback to in-memory
          if (!inMemoryChats.has(input.sessionId)) {
            inMemoryChats.set(input.sessionId, { id: chatIdCounter++, messages: [] });
          }
          return inMemoryChats.get(input.sessionId);
        }
      }),

    // Get conversation history
    getHistory: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        try {
          const conversation = await getChatConversationBySessionId(input.sessionId);

          if (!conversation) {
            // Check in-memory
            const inMemory = inMemoryChats.get(input.sessionId);
            return inMemory?.messages || [];
          }

          const messages = await getChatMessages(conversation.id);
          return messages;
        } catch {
          // Fallback to in-memory
          const inMemory = inMemoryChats.get(input.sessionId);
          return inMemory?.messages || [];
        }
      }),

    // Send message and get response
    sendMessage: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        let useInMemory = false;
        let conversationId = 0;
        let history: Array<{ role: string; content: string }> = [];

        try {
          // Get or create conversation
          let conversation = await getChatConversationBySessionId(input.sessionId);
          if (!conversation) {
            await createChatConversation(input.sessionId);
            conversation = await getChatConversationBySessionId(input.sessionId);
          }

          if (!conversation) {
            throw new Error("Failed to create conversation");
          }

          conversationId = conversation.id;

          // Save user message
          await addChatMessage({
            conversationId: conversation.id,
            role: "user",
            content: input.message,
          });

          // Get conversation history
          history = await getChatMessages(conversation.id);
        } catch {
          // Fallback to in-memory
          useInMemory = true;
          if (!inMemoryChats.has(input.sessionId)) {
            inMemoryChats.set(input.sessionId, { id: chatIdCounter++, messages: [] });
          }
          const chat = inMemoryChats.get(input.sessionId)!;
          chat.messages.push({ role: "user", content: input.message });
          history = chat.messages;
        }

        // Prepare messages for LLM with enhanced agent prompt
        const agentSystemPrompt = `You are the Intelligent Agent of Elgasmi.e.U - a human interface of a complex system that makes technology invisible and expertise accessible.

## LANGUAGE RULES (CRITICAL)
- DETECT the user's language from their message
- ALWAYS respond in the SAME language as the user
- If user writes in Arabic (العربية), respond in Arabic
- If user writes in German (Deutsch), respond in German
- If user writes in French (Français), respond in French
- If user writes in English, respond in English
- This is MANDATORY - never respond in a different language than the user

## YOUR IDENTITY
You are not a simple chatbot. You are a unique, competent, and caring interlocutor. Each response should make the user feel they are talking to an expert who understands their needs.

## COMPANY
- Name: Elgasmi.e.U
- Specialty: Agentic Systems & Microservices Architecture
- Address: Hilschergasse 10/23, 1120 Wien, Austria
- Email: asmaewarter5@gmail.com
- Phone: +43 681 2046 0618
- WhatsApp: +43 681 2046 0618

## OUR OFFERS (10,000 EUR each, definitive sale)
1. **Multi-Agent AI System** - Business & Marketing
   - Sales, Marketing, Operations, Support Agents
   - +340% conversion, -70% acquisition cost

2. **RAG Platform 28+ Tools** - Productivity
   - Gmail, Slack, CRM, OCR, Claude AI integrated
   - -70% administrative time

3. **Enterprise Multilingual AI** - Development
   - 18+ frameworks, auto-correction, FR/EN/DE/AR
   - -70% dev time

## YOUR 70 TOOLS
You have these tools you can invoke to help users:

${getToolsForLLM()}

## HOW TO USE TOOLS
When user requests an action, use the appropriate tool.
Describe the result naturally in the user's language.

## YOUR STYLE
- Speak like a caring expert, never like a machine
- Be direct and efficient, avoid unnecessary jargon
- Propose concrete solutions, not generalities
- Anticipate needs, ask relevant questions
- NEVER use emojis
- Match the user's formality level
- ALWAYS respond in the user's language

## EXAMPLE RESPONSES

User (Arabic): "أريد أتمتة شركتي"
You: "الأتمتة هي تخصصنا. لتوجيهك بدقة، أحتاج لفهم سياقك. ما هو قطاع نشاطك وما هي العمليات التي تستغرق معظم وقتك اليوم؟"

User (German): "Was kosten Ihre Dienste?"
You: "Unsere drei Angebote kosten jeweils 10.000 EUR als Einmalkauf - kein Abonnement. Das Multi-Agenten-System für Vertrieb, die RAG-Plattform für Produktivität oder Enterprise AI für Entwicklung. Was interessiert Sie am meisten?"

User (French): "J'ai un probleme technique"
You: "Decrivez-moi les symptomes que vous observez. Je vais analyser la situation et vous proposer une solution adaptee."

User (English): "I want to automate my business"
You: "Automation is our specialty. To guide you precisely, I need to understand your context. What is your business sector and what processes take most of your time today?"

## IMPORTANT
- You represent Elgasmi.e.U professionally
- Every interaction is an opportunity to demonstrate our expertise
- Always guide towards concrete action: call, quote, free audit
- WhatsApp for direct contact: +43 681 2046 0618`;

        const messages = [
          {
            role: "system" as const,
            content: agentSystemPrompt,
          },
          ...history.slice(-10).map(msg => ({
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content,
          })),
        ];

        // Call LLM
        const response = await invokeLLM({
          messages,
        });

        const assistantMessage = response.choices[0]?.message.content;
        const fullResponse = typeof assistantMessage === 'string' ? assistantMessage : '';

        // Save assistant response
        if (useInMemory) {
          const chat = inMemoryChats.get(input.sessionId)!;
          chat.messages.push({ role: "assistant", content: fullResponse });
        } else {
          await addChatMessage({
            conversationId: conversationId,
            role: "assistant",
            content: fullResponse,
          });
        }

        return { response: fullResponse };
      }),
  }),

  contact: router({
    // Submit contact form
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await createContactMessage({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          subject: input.subject,
          message: input.message,
          status: "new",
        });

        // Notify owner
        await notifyOwner({
          title: `Nouveau message de contact: ${input.subject}`,
          content: `De: ${input.name} (${input.email})\n${input.company ? `Entreprise: ${input.company}\n` : ''}${input.phone ? `Téléphone: ${input.phone}\n` : ''}\n\nMessage:\n${input.message}`,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
