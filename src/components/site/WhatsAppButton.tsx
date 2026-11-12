import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { LEADS_WHATSAPP, LEADS_WHATSAPP_MSG, track, waLink } from "@/lib/company";

// Link de WhatsApp do comercial. Cada clique gera o evento "whatsapp_click" com o local do botão,
// para medir no GTM/Google Ads separado do formulário.
export function WhatsAppLink({ location, className, children }: { location: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={waLink(LEADS_WHATSAPP_MSG, LEADS_WHATSAPP)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_click", { location })}
      className={className}
    >
      {children}
    </a>
  );
}

// Verde do WhatsApp com texto escuro: reconhecível e com bom contraste.
export const waButton = "bg-[#25D366] text-[#0b1426] hover:brightness-105";

// Botão flutuante no canto inferior direito (computador). No celular o WhatsApp fica na barra fixa.
// "hidden" esconde o botão enquanto o formulário (que já tem o seu botão de WhatsApp) está na tela.
export function WhatsAppFloat({ hidden = false }: { hidden?: boolean }) {
  return (
    <WhatsAppLink
      location="flutuante"
      className={`fixed bottom-5 right-5 z-50 hidden items-center gap-2 rounded-full px-5 py-3.5 font-bold shadow-lg shadow-black/30 transition hover:-translate-y-0.5 md:inline-flex ${waButton} ${hidden ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
    >
      <MessageCircle className="size-6" /> Fale no WhatsApp
    </WhatsAppLink>
  );
}
