import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Headphones,
  MapPin,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

const WHATSAPP = "5527996062121";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Empresa de Cobrança e Recuperação de Crédito | Assertiva" },
      {
        name: "description",
        content:
          "Assessoria de cobrança extrajudicial com 20+ anos de mercado, IA e 250 milhões de dados. Terceirize a cobrança da sua empresa e recupere mais. Análise gratuita.",
      },
      { property: "og:title", content: "Assertiva | Empresa de Cobrança e Recuperação de Crédito" },
      {
        property: "og:description",
        content: "Cobrança extrajudicial humanizada e multicanal para bancos, cooperativas e empresas. Solicite uma análise gratuita da sua carteira.",
      },
    ],
  }),
  component: Landing,
});

const logos = [
  { src: "/logos/logo_5_sicredi_final.png", alt: "Sicredi" },
  { src: "/logos/logo_4_sicoob_final.png", alt: "Sicoob" },
  { src: "/logos/logo_1_banestes_final.png", alt: "Banestes" },
  { src: "/logos/logo_2_grupo_lima_final.png", alt: "Grupo Lima" },
];

const services = [
  { icon: Headphones, t: "Tele Cobrança", d: "Equipe treinada em abordagem respeitosa e focada em conversão." },
  { icon: Scale, t: "Cobrança Amigável e Judicial", d: "Estratégia escalonada por perfil, evitando judicialização precoce." },
  { icon: MapPin, t: "Visita Externa", d: "Equipe em todo o Brasil, com fotos, relatório e parecer conclusivo." },
  { icon: Truck, t: "Apreensão e Remoção", d: "Recuperação de garantias com procedimento legal assistido." },
  { icon: Zap, t: "Cobrança Digital com IA", d: "Plataforma SALT: robô 24/7 no WhatsApp, SMS e web, 2x mais eficiente." },
  { icon: FileText, t: "Gestão de Documentos", d: "Higienização, guarda e controle de todo o ciclo documental." },
];

const steps = [
  { t: "Diagnóstico da carteira", d: "Analisamos valores, aging e perfil dos devedores sem custo." },
  { t: "Localização com dados", d: "Mais de 250 milhões de registros para encontrar e enriquecer contatos." },
  { t: "Negociação multicanal", d: "WhatsApp, SMS, e-mail, voz, telefone e visita: o canal certo para cada perfil." },
  { t: "Relatórios em tempo real", d: "Dashboards, BI e integração via API com seu ERP ou CRM." },
];

const segments = ["Cooperativas e bancos", "Seguros e consórcio", "Consignado", "Cartões", "Varejo e maquinário", "Imobiliário, IPTU e IPVA", "Pesados e agrícola"];

const faqs = [
  { q: "Como funciona a terceirização da cobrança?", a: "Recebemos sua carteira, fazemos o diagnóstico e assumimos toda a régua de cobrança extrajudicial, com relatórios de cada ação e repasse dos valores recuperados." },
  { q: "A cobrança prejudica o relacionamento com meus clientes?", a: "Não. Somos especialistas em cobrança humanizada: abordagem respeitosa, transparente e alinhada à sua política comercial e à LGPD." },
  { q: "Atendem cooperativas de crédito?", a: "Sim. Estamos cadastrados no CAS do Sicredi, o que permite que mais de 100 cooperativas nos contratem de imediato, e atuamos há mais de 6 anos com cooperativas." },
  { q: "Vocês atuam em todo o Brasil?", a: "Sim. Operação digital nacional e equipe de visita externa fidelizada em todo o território." },
];

function track(event: string) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  w.gtag?.("event", event);
  w.dataLayer?.push({ event });
}

function LeadForm({ id }: { id?: string }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Olá! Quero uma análise gratuita da minha carteira.\nNome: ${f.get("nome")}\nEmpresa: ${f.get("empresa")}\nWhatsApp: ${f.get("telefone")}\nSegmento: ${f.get("segmento")}\nVolume em atraso: ${f.get("volume")}`;
    track("generate_lead");
    setSent(true);
    window.open(waLink(msg), "_blank");
  };
  const field = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";
  if (sent)
    return (
      <div id={id} className="rounded-2xl border border-primary/40 bg-card p-8 text-center shadow-glow">
        <Check className="mx-auto size-12 rounded-full bg-primary p-2 text-primary-foreground" />
        <h3 className="mt-4 text-2xl font-bold">Recebemos seu pedido!</h3>
        <p className="mt-2 text-sm text-muted-foreground">Um especialista vai falar com você no WhatsApp em instantes, em horário comercial.</p>
      </div>
    );
  return (
    <form id={id} onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-glow sm:p-8">
      <h3 className="text-2xl font-bold">Análise gratuita da sua carteira</h3>
      <p className="mt-1 text-sm text-muted-foreground">Resposta de um especialista em até 1 dia útil.</p>
      <div className="mt-6 grid gap-3">
        <input required name="nome" placeholder="Seu nome" className={field} />
        <input required name="empresa" placeholder="Empresa / Cooperativa" className={field} />
        <input required name="telefone" type="tel" inputMode="tel" placeholder="WhatsApp com DDD" className={field} />
        <select required name="segmento" defaultValue="" className={field}>
          <option value="" disabled>Segmento</option>
          {segments.map((s) => <option key={s}>{s}</option>)}
          <option>Outro</option>
        </select>
        <select required name="volume" defaultValue="" className={field}>
          <option value="" disabled>Valor em atraso na carteira</option>
          <option>Até R$ 100 mil</option>
          <option>R$ 100 mil a R$ 500 mil</option>
          <option>R$ 500 mil a R$ 2 milhões</option>
          <option>Acima de R$ 2 milhões</option>
        </select>
        <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-display text-base font-bold text-primary-foreground transition hover:brightness-110">
          Quero recuperar meu crédito <ArrowRight className="size-5" />
        </button>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Seus dados estão protegidos conforme a LGPD.</p>
    </form>
  );
}

function Landing() {
  const [open, setOpen] = useState<number | null>(0);
  const wa = waLink("Olá! Vim pelo site e quero falar sobre cobrança da minha carteira.");
  return (
    <main className="overflow-x-hidden pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src="/logos/logo-assertiva.png" alt="Assertiva Multicanalidade" className="h-10 w-auto" />
          <a href="#form" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:brightness-110">Análise gratuita</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" /> Empresa de cobrança · 20+ anos
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Terceirize sua cobrança e <span className="text-gradient">recupere mais crédito</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Assessoria de cobrança extrajudicial humanizada e multicanal, com inteligência artificial e mais de 250 milhões de dados para localizar e negociar com seus inadimplentes.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {["Cobrança extrajudicial e judicial", "Robô de negociação 24/7", "Visita externa em todo o Brasil", "Relatórios e BI em tempo real"].map((b) => (
                <li key={b} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[["20+", "anos de mercado"], ["250MM", "dados na base"], ["2x", "mais eficiência digital"]].map(([n, l]) => (
                <div key={l}><div className="font-display text-3xl font-bold text-primary">{n}</div><div className="text-xs text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <LeadForm id="form" />
        </div>
      </section>

      {/* Logos */}
      <section className="bg-paper py-10 text-paper-foreground">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-sm font-semibold">Recuperando ativos de grandes cooperativas, bancos e empresas</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((l) => <img key={l.alt} src={l.src} alt={l.alt} className="h-10 w-auto object-contain md:h-12" loading="lazy" />)}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm opacity-75">Cadastrados no <strong>CAS do Sicredi</strong>: mais de 100 cooperativas podem nos contratar de imediato.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-3xl text-3xl font-bold sm:text-4xl">Inadimplência parada é dinheiro que <span className="text-gradient">sua empresa deixa de ter</span></h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { i: Clock, t: "Quanto mais tempo, menor a chance", d: "Cada mês sem ação reduz a probabilidade de recuperação da dívida." },
            { i: Headphones, t: "Equipe interna sobrecarregada", d: "Cobrar consome o time e não tem escala, dados nem régua estruturada." },
            { i: ShieldCheck, t: "Abordagem errada custa caro", d: "Cobrança mal feita gera atrito, reclamações e perda do cliente." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-surface p-6">
              <I className="size-6 text-sky" />
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Serviços de cobrança</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Uma assessoria completa, do contato ao pagamento</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/50">
                <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><I className="size-5 text-primary" /></div>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">Como recuperamos seu crédito</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t}>
              <div className="font-display text-5xl font-extrabold text-gradient">0{i + 1}</div>
              <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-primary/30 bg-hero bg-card p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold">Plataforma SALT: cobrança digital 2x mais eficiente</h3>
            <p className="mt-2 max-w-2xl text-muted-foreground">Negociação automatizada com IA no WhatsApp, SMS e web, navegação 3G/4G patrocinada e boleto emitido na hora. Mais recuperação sem aumentar custos.</p>
          </div>
          <a href="#form" className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:brightness-110 md:mt-0">Solicitar análise <ArrowRight className="size-4" /></a>
        </div>
      </section>

      {/* Segments */}
      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Segmentos atendidos</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {segments.map((s) => <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">{s}</span>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
                {f.q}<ChevronDown className={`size-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-hero">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Pronto para seu crédito <span className="text-gradient">render mais?</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Receba uma análise gratuita da sua carteira e descubra quanto é possível recuperar.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#form" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 font-bold text-primary-foreground hover:brightness-110">Quero minha análise gratuita <ArrowRight className="size-5" /></a>
            <a href={wa} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-7 py-4 font-bold text-primary hover:bg-primary/10"><MessageCircle className="size-5" /> Falar no WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Assertiva Multicanalidade · Recuperação de Crédito · <a href="https://assertivarc.com.br" className="underline">assertivarc.com.br</a>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <a href="#form" className="rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground">Análise gratuita</a>
        <a href={wa} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")} className="flex items-center justify-center gap-1.5 rounded-lg border border-primary py-3 text-sm font-bold text-primary"><MessageCircle className="size-4" /> WhatsApp</a>
      </div>
      <a href={wa} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click")} aria-label="WhatsApp" className="fixed bottom-6 right-6 z-50 hidden rounded-full bg-primary p-4 text-primary-foreground shadow-glow md:block"><MessageCircle className="size-6" /></a>
    </main>
  );
}
