import { Link } from "@tanstack/react-router";
import { AtSign, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { COMPANY, telHref, track, waLink } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface pb-24 pt-12 text-sm text-muted-foreground md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
        <div>
          <img src="/logos/logo-assertiva.png" alt={COMPANY.name} width={237} height={120} className="h-12 w-auto" loading="lazy" />
          <p className="mt-3 max-w-xs">Assessoria de cobrança extrajudicial e recuperação de crédito para bancos, cooperativas e empresas.</p>
        </div>
        <div>
          <h2 className="font-display text-base font-bold text-foreground">Contato</h2>
          <ul className="mt-3 grid gap-2">
            {COMPANY.phones.map((p) => (
              <li key={p}><a href={telHref(p)} className="inline-flex items-center gap-2 hover:text-foreground"><Phone className="size-4 text-primary" />{p}</a></li>
            ))}
            <li>
              <a href={waLink("Olá! Vim pelo site e gostaria de falar sobre cobrança.")} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "footer" })} className="inline-flex items-center gap-2 hover:text-foreground">
                <MessageCircle className="size-4 text-primary" />WhatsApp {COMPANY.whatsappLabel}
              </a>
            </li>
            {COMPANY.email && (
              <li><a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="size-4 text-primary" />{COMPANY.email}</a></li>
            )}
            <li className="inline-flex items-center gap-2"><MapPin className="size-4 text-primary" />{COMPANY.address}</li>
            <li><a href={COMPANY.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><AtSign className="size-4 text-primary" />Instagram @assertiva_recuperacaodecredito</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-bold text-foreground">Institucional</h2>
          <ul className="mt-3 grid gap-2">
            <li><a href={COMPANY.website} target="_blank" rel="noreferrer" className="hover:text-foreground">Site oficial da Assertiva</a></li>
            <li><Link to="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link></li>
            <li><Link to="/termos-de-uso" className="hover:text-foreground">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border px-5 pt-6 text-xs">
        © {new Date().getFullYear()} {COMPANY.legalName || COMPANY.name}
        {COMPANY.cnpj && <> · CNPJ {COMPANY.cnpj}</>} · Todos os direitos reservados.
      </div>
    </footer>
  );
}
