import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message envoyé avec succès!", {
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error("Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer plus tard.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Le nom est requis");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Email valide requis");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Le sujet est requis");
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Le message doit contenir au moins 10 caractères");
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nom complet <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            required
            disabled={submitMutation.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jean.dupont@exemple.com"
            required
            disabled={submitMutation.isPending}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+33 6 12 34 56 78"
            disabled={submitMutation.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nom de votre entreprise"
            disabled={submitMutation.isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">
          Sujet <span className="text-destructive">*</span>
        </Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Demande d'information sur vos services"
          required
          disabled={submitMutation.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet ou votre demande..."
          rows={6}
          required
          disabled={submitMutation.isPending}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">Minimum 10 caractères</p>
      </div>

      <Button type="submit" size="lg" className="w-full gradient-primary" disabled={submitMutation.isPending}>
        {submitMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer le message"
        )}
      </Button>
    </form>
  );
}
