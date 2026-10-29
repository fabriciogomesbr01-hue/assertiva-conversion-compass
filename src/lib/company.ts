// Dados institucionais exibidos no rodapé, nas páginas legais e no JSON-LD.
// O Google Ads exige que a landing page identifique claramente quem é o anunciante.
export const COMPANY = {
  name: "Assertiva Multicanalidade",
  legalName: "", // Razão social. Preencha para exibir no rodapé e nas políticas.
  cnpj: "", // Ex.: "00.000.000/0001-00". Preencha para exibir no rodapé.
  address: "Espírito Santo, Brasil",
  phones: ["(27) 2142-1092", "(27) 2142-1107"],
  whatsapp: "5527996062121",
  whatsappLabel: "(27) 99606-2121",
  email: "", // Ex.: "contato@assertivarc.com.br". Preencha para exibir no rodapé e nas políticas.
  instagram: "https://www.instagram.com/assertiva_recuperacaodecredito/",
  website: "https://assertivarc.com.br",
};

// URL pública desta landing page (usada em canonical, og:url e sitemap).
export const SITE_URL = "https://lp.assertivarc.com.br";

// ID do Google Tag Manager (ex.: "GTM-XXXXXXX"). Vazio = nenhuma tag é carregada.
// No GTM, configure a conversão do Google Ads com um acionador de evento personalizado "generate_lead".
// Ele é enviado ao dataLayer pela página /obrigado, só depois de um envio de formulário com sucesso
// (acessos diretos ou recarregamentos do /obrigado não disparam). Cliques no WhatsApp geram "whatsapp_click",
// que pode ser usado como conversão secundária, sem entrar nos lances.
export const GTM_ID = "";

export const telHref = (phone: string) => `tel:+55${phone.replace(/\D/g, "")}`;
// WhatsApp do comercial que recebe os leads no botão da página /obrigado.
export const LEADS_WHATSAPP = "5527997029114";

export const waLink = (msg: string, number = COMPANY.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

export function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

// Chave do sessionStorage que leva os dados do formulário até a página /obrigado.
export const LEAD_KEY = "assertiva-lead";

// Destinatários dos contatos do formulário. O envio é feito pelo FormSubmit (formsubmit.co):
// no primeiro envio, o FormSubmit manda um e-mail de ativação para o primeiro endereço; é preciso confirmar
// uma única vez para os contatos começarem a chegar.
export const LEAD_EMAILS = ["alexandrer@assertivarc.com.br", "fabricio@assertivarc.com.br"];

export async function sendLead(fields: Record<string, string>) {
  const [to, ...cc] = LEAD_EMAILS;
  const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...fields,
      _subject: `Novo contato pela landing page: ${fields["Empresa"] || fields["Nome"]}`,
      _cc: cc.join(","),
      _template: "table",
      _captcha: "false",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
  if (!res.ok || String(data.success) === "false") throw new Error("Falha ao enviar o formulário");
}

// Dados que o formulário deixa no sessionStorage para a página /obrigado.
// "tracked" evita contar a conversão de novo se a pessoa recarregar a página.
export type Lead = { nome: string; segmento: string; volume: string; msg: string; tracked: boolean };
