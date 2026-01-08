import { useEffect, useRef } from "react";

export default function AnimatedArchitecture() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate the SVG elements
    const elements = svgRef.current?.querySelectorAll(".animated-element");
    if (elements) {
      elements.forEach((el, index) => {
        const delay = index * 0.2;
        (el as SVGElement).style.animation = `fadeInScale 0.8s ease-out ${delay}s both`;
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes flow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .pulse-element {
          animation: pulse 2s ease-in-out infinite;
        }

        .flow-line {
          stroke-dasharray: 100;
          animation: flow 3s ease-in-out infinite;
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        className="w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="800" height="600" fill="transparent" />

        {/* Title */}
        <text x="400" y="30" textAnchor="middle" className="text-2xl font-bold" fill="currentColor">
          Architecture Agentique
        </text>

        {/* Layer 1: User Interface */}
        <g className="animated-element">
          <rect x="50" y="80" width="700" height="80" rx="8" fill="#f0f4f8" stroke="#2c3e50" strokeWidth="2" />
          <text x="400" y="115" textAnchor="middle" className="font-semibold" fill="#2c3e50">
            Interface Utilisateur & Applications
          </text>
          <circle cx="150" cy="135" r="20" fill="#3b82f6" className="pulse-element" />
          <circle cx="400" cy="135" r="20" fill="#3b82f6" className="pulse-element" />
          <circle cx="650" cy="135" r="20" fill="#3b82f6" className="pulse-element" />
        </g>

        {/* Arrows Down */}
        <g className="animated-element">
          <line x1="150" y1="160" x2="150" y2="190" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="400" y1="160" x2="400" y2="190" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="650" y1="160" x2="650" y2="190" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Layer 2: Agent Systems */}
        <g className="animated-element">
          <rect x="50" y="200" width="700" height="100" rx="8" fill="#e8f4f8" stroke="#2c3e50" strokeWidth="2" />
          <text x="400" y="225" textAnchor="middle" className="font-semibold" fill="#2c3e50">
            Systèmes Agentiques Intelligents
          </text>

          {/* Agent 1 */}
          <rect x="80" y="240" width="140" height="50" rx="4" fill="#10b981" />
          <text x="150" y="270" textAnchor="middle" className="text-sm font-medium" fill="white">
            Agent Décision
          </text>

          {/* Agent 2 */}
          <rect x="330" y="240" width="140" height="50" rx="4" fill="#8b5cf6" />
          <text x="400" y="270" textAnchor="middle" className="text-sm font-medium" fill="white">
            Agent Apprentissage
          </text>

          {/* Agent 3 */}
          <rect x="580" y="240" width="140" height="50" rx="4" fill="#f59e0b" />
          <text x="650" y="270" textAnchor="middle" className="text-sm font-medium" fill="white">
            Agent Optimisation
          </text>
        </g>

        {/* Arrows Down */}
        <g className="animated-element">
          <line x1="150" y1="290" x2="150" y2="320" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="400" y1="290" x2="400" y2="320" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="650" y1="290" x2="650" y2="320" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Layer 3: Processing & Automation */}
        <g className="animated-element">
          <rect x="50" y="330" width="700" height="100" rx="8" fill="#fef3c7" stroke="#2c3e50" strokeWidth="2" />
          <text x="400" y="355" textAnchor="middle" className="font-semibold" fill="#2c3e50">
            Automatisation & Traitement
          </text>

          {/* Processing 1 */}
          <rect x="80" y="370" width="140" height="50" rx="4" fill="#ec4899" />
          <text x="150" y="400" textAnchor="middle" className="text-sm font-medium" fill="white">
            Traitement
          </text>

          {/* Processing 2 */}
          <rect x="330" y="370" width="140" height="50" rx="4" fill="#06b6d4" />
          <text x="400" y="400" textAnchor="middle" className="text-sm font-medium" fill="white">
            Orchestration
          </text>

          {/* Processing 3 */}
          <rect x="580" y="370" width="140" height="50" rx="4" fill="#14b8a6" />
          <text x="650" y="400" textAnchor="middle" className="text-sm font-medium" fill="white">
            Optimisation
          </text>
        </g>

        {/* Arrows Down */}
        <g className="animated-element">
          <line x1="150" y1="420" x2="150" y2="450" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="400" y1="420" x2="400" y2="450" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="650" y1="420" x2="650" y2="450" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Layer 4: Data & Storage */}
        <g className="animated-element">
          <rect x="50" y="460" width="700" height="80" rx="8" fill="#dbeafe" stroke="#2c3e50" strokeWidth="2" />
          <text x="400" y="490" textAnchor="middle" className="font-semibold" fill="#2c3e50">
            Données & Stockage
          </text>

          <circle cx="150" cy="510" r="20" fill="#3b82f6" className="pulse-element" />
          <circle cx="400" cy="510" r="20" fill="#3b82f6" className="pulse-element" />
          <circle cx="650" cy="510" r="20" fill="#3b82f6" className="pulse-element" />
        </g>

        {/* Feedback Arrows (Right side) */}
        <g className="animated-element">
          <path
            d="M 730 135 Q 760 300 730 510"
            stroke="#ef4444"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead-red)"
          />
          <text x="750" y="320" className="text-xs" fill="#ef4444">
            Feedback
          </text>
        </g>

        {/* Arrow Markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
          <marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
