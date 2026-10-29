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
export const SITE_URL = "https://assertiva-conversion-compass.lovable.app";

// ID do Google Tag Manager (ex.: "GTM-XXXXXXX"). Vazio = nenhuma tag é carregada.
// No GTM, configure a conversão do Google Ads pela visualização da página /obrigado
// ou pelo evento "generate_lead" enviado ao dataLayer.
export const GTM_ID = "";

export const telHref = (phone: string) => `tel:+55${phone.replace(/\D/g, "")}`;
export const waLink = (msg: string) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;

export function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

// Chave do sessionStorage que leva os dados do formulário até a página /obrigado.
export const LEAD_KEY = "assertiva-lead";
