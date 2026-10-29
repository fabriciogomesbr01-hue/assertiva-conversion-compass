import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, MessageCircle } from "lucide-react";

import { SimplePage } from "@/components/site/SimplePage";
import { COMPANY, LEAD_KEY, telHref, track, waLink } from "@/lib/company";

const DEFAULT_MSG = "Olá! Acabei de pedir uma análise gratuita da minha carteira pelo site.";

// Página de agradecimento: URL própria para contar a conversão no Google Ads.
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
  const [lead, setLead] = useState<{ nome: string; msg: string } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_KEY);
      if (raw) setLead(JSON.parse(raw));
    } catch {
      // Sem sessionStorage: usa a mensagem padrão.
    }
  }, []);

  return (
    <SimplePage title={`Obrigado${lead?.nome ? `, ${lead.nome}` : ""}!`}>
      <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center shadow-glow">
        <Check className="mx-auto size-12 rounded-full bg-primary p-2 text-primary-foreground" />
        <p className="mt-4 text-lg font-semibold text-foreground">Recebemos sua solicitação de análise gratuita.</p>
        <p className="mt-2">Um especialista da Assertiva vai entrar em contato em até 1 dia útil.</p>
        <p className="mt-6 font-semibold text-foreground">Quer agilizar? Envie seus dados agora pelo WhatsApp:</p>
        <a
          href={waLink(lead?.msg || DEFAULT_MSG)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { location: "obrigado" })}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground no-underline hover:brightness-110 sm:w-auto"
        >
          <MessageCircle className="size-5" /> Falar no WhatsApp
        </a>
        <p className="mt-6 text-sm">
          Ou ligue: {COMPANY.phones.map((p, i) => (
            <span key={p}>{i > 0 && " · "}<a href={telHref(p)} className="font-semibold text-foreground">{p}</a></span>
          ))}
        </p>
      </div>
      <p className="mt-8 text-center text-sm">
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </SimplePage>
  );
}
