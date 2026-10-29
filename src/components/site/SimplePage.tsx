import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { COMPANY } from "@/lib/company";
import { SiteFooter } from "./SiteFooter";

// Casca das páginas secundárias (políticas, agradecimento): cabeçalho com volta para a home + rodapé.
export function SimplePage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border bg-background/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/"><img src="/logos/logo-assertiva.png" alt={COMPANY.name} width={237} height={120} className="h-12 w-auto" /></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Voltar ao início
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-muted-foreground">Última atualização: {updated}</p>}
        <div className="legal mt-8 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}
