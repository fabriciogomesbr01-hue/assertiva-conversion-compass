import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, MessageCircle } from "lucide-react";

import { SimplePage } from "@/components/site/SimplePage";
import { LEAD_KEY, track, waLink, type Lead } from "@/lib/company";

const DEFAULT_MSG = "Olá! Acabei de pedir uma análise gratuita da minha carteira pelo site.";

// Página de agradecimento: é aqui que a conversão (generate_lead) é disparada,
// só para quem chegou depois de enviar o formulário com sucesso.
export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado! Recebemos sua solicitação | Assertiva" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    let saved: Lead | null = null;
    try {
      const raw = sessionStorage.getItem(LEAD_KEY);
      saved = raw ? (JSON.parse(raw) as Lead) : null;
    } catch {
      saved = null;
    }
    if (!saved) return; // Acesso direto ao /obrigado: não conta conversão.
    if (!saved.tracked) {
      track("generate_lead", { segmento: saved.segmento, volume: saved.volume });
      saved = { ...saved, tracked: true };
      try {
        sessionStorage.setItem(LEAD_KEY, JSON.stringify(saved));
      } catch {
        // Sem armazenamento: um recarregamento poderia contar de novo, mas o envio já aconteceu.
      }
    }
    setLead(saved);
  }, []);

  return (
    <SimplePage title={`Obrigado${lead?.nome ? `, ${lead.nome}` : ""}!`}>
      <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center shadow-glow">
        <Check className="mx-auto size-12 rounded-full bg-primary p-2 text-primary-foreground" />
        <p className="mt-4 text-lg font-semibold text-foreground">Recebemos sua solicitação de análise gratuita.</p>
        <p className="mt-2">Um especialista da Assertiva vai entrar em contato em até 1 dia útil.</p>
        <p className="mt-6 font-semibold text-foreground">Quer agilizar? Fale agora com a gente pelo WhatsApp:</p>
        <a
          href={waLink(lead?.msg || DEFAULT_MSG)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { location: "obrigado" })}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground hover:brightness-110 sm:w-auto"
        >
          <MessageCircle className="size-5" /> Falar no WhatsApp
        </a>
      </div>
      <p className="mt-8 text-center text-sm">
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </SimplePage>
  );
}
