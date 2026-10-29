import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { SimplePage } from "@/components/site/SimplePage";
import { LEAD_KEY } from "@/lib/company";

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
  const [nome, setNome] = useState("");

  useEffect(() => {
    try {
      setNome(sessionStorage.getItem(LEAD_KEY) || "");
    } catch {
      // Sem sessionStorage: agradece sem o nome.
    }
  }, []);

  return (
    <SimplePage title={`Obrigado${nome ? `, ${nome}` : ""}!`}>
      <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center shadow-glow">
        <Check className="mx-auto size-12 rounded-full bg-primary p-2 text-primary-foreground" />
        <p className="mt-4 text-lg font-semibold text-foreground">Recebemos sua solicitação de análise gratuita.</p>
        <p className="mt-2">Um especialista da Assertiva vai entrar em contato em até 1 dia útil pelo telefone informado.</p>
      </div>
      <p className="mt-8 text-center text-sm">
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </SimplePage>
  );
}
