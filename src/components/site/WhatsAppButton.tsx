import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { LEADS_WHATSAPP, LEADS_WHATSAPP_MSG, track, waLink } from "@/lib/company";

// Link de WhatsApp do comercial. Cada clique gera o evento "whatsapp_click" com o local do botão,
// para medir no GTM/Google Ads separado do formulário.
export function WhatsAppLink({ location, className, children, inert = false }: { location: string; className?: string; children: ReactNode; inert?: boolean }) {
  return (
    <a
      href={waLink(LEADS_WHATSAPP_MSG, LEADS_WHATSAPP)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_click", { location })}
      className={className}
      aria-hidden={inert || undefined}
      tabIndex={inert ? -1 : undefined}
    >
      {children}
    </a>
  );
}

// Verde do WhatsApp com texto escuro: reconhecível e com bom contraste.
export const waButton = "bg-[#25D366] text-[#0b1426] hover:brightness-105";

// Botão flutuante do WhatsApp (celular e computador). Só aparece depois que a pessoa começa a rolar
// e some enquanto o formulário está na tela, para não competir com a conversão principal.
// No celular é só o ícone; no computador mostra o texto.
export function WhatsAppFloat({ show }: { show: boolean }) {
  return (
    <WhatsAppLink
      location="flutuante"
      inert={!show}
      className={`fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full p-4 font-bold shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 md:bottom-5 md:right-5 md:px-5 md:py-3.5 ${waButton} ${show ? "" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <MessageCircle className="size-6" />
      <span className="sr-only md:not-sr-only">Fale no WhatsApp</span>
    </WhatsAppLink>
  );
}
