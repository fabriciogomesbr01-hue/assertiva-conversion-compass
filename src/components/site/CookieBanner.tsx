import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const KEY = "assertiva-consent";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

// Atualiza o Consent Mode v2 do Google (o padrão "denied" é definido no <head>, em __root.tsx).
function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    if (saved) applyConsent(saved);
    else setVisible(true);
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      // Sem armazenamento: a escolha vale só para esta visita.
    }
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    // Faixa compacta: avisa sem cobrir a primeira tela nem competir com o formulário.
    <div role="dialog" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-3 z-[60] flex items-center gap-3 rounded-xl border border-border bg-card/95 px-3 py-2.5 text-xs shadow-lg backdrop-blur md:inset-x-auto md:bottom-4 md:left-4 md:max-w-md md:text-sm">
      <p className="min-w-0 flex-1 text-muted-foreground">
        Usamos cookies para medir nossos anúncios.{" "}
        <Link to="/politica-de-privacidade" className="font-semibold text-foreground underline">Saiba mais</Link>
      </p>
      <div className="flex shrink-0 gap-2">
        <button onClick={() => choose("denied")} className="rounded-lg border border-input px-3 py-1.5 font-semibold text-foreground hover:bg-secondary">Recusar</button>
        <button onClick={() => choose("granted")} className="rounded-lg bg-primary px-3 py-1.5 font-bold text-primary-foreground hover:brightness-110">Aceitar</button>
      </div>
    </div>
  );
}
