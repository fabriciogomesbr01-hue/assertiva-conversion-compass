import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgePercent,
  Check,
  FileCheck,
  Handshake,
  Lock,
  TrendingUp,
  UserCheck,
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

import { SiteFooter } from "@/components/site/SiteFooter";
import { COMPANY, LEAD_KEY, LEADS_WHATSAPP, SITE_URL, sendLead, track, waLink, type Lead } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Empresa de Cobrança e Recuperação de Crédito | Assertiva" },
      {
        name: "description",
        content:
          "Assessoria de cobrança extrajudicial com mais de 20 anos de mercado, IA e base com 250 milhões de dados. Terceirize a cobrança da sua empresa. Análise gratuita.",
      },
      { property: "og:title", content: "Assertiva | Empresa de Cobrança e Recuperação de Crédito" },
      {
        property: "og:description",
        content: "Cobrança extrajudicial humanizada e multicanal para bancos, cooperativas e empresas. Solicite uma análise gratuita da sua carteira.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Landing,
});

const logos = [
  { src: "/logos/logo_5_sicredi_final.png", alt: "Sicredi", w: 382, h: 96 },
  { src: "/logos/logo_4_sicoob_final.png", alt: "Sicoob", w: 423, h: 96 },
  { src: "/logos/logo_1_banestes_final.png", alt: "Horizontes Fibra", w: 506, h: 96 },
  // Logo quadrado: precisa de mais altura para ter o mesmo peso visual dos logos horizontais.
  { src: "/logos/logo_2_grupo_lima_final.png", alt: "Grupo Lima", w: 160, h: 160, square: true },
];

const services = [
  { icon: Headphones, t: "Tele Cobrança", d: "Equipe treinada em abordagem respeitosa e focada em conversão." },
  { icon: Scale, t: "Cobrança Amigável e Judicial", d: "Estratégia escalonada por perfil, evitando judicialização precoce." },
  { icon: MapPin, t: "Visita Externa", d: "Equipe em todo o Brasil, com fotos, relatório e parecer conclusivo." },
  { icon: Truck, t: "Apreensão e Remoção", d: "Recuperação de garantias com procedimento legal assistido." },
  { icon: Zap, t: "Cobrança Digital com IA", d: "Plataforma SALT: robô de negociação 24/7 no WhatsApp, SMS e web." },
  { icon: FileText, t: "Gestão de Documentos", d: "Higienização, guarda e controle de todo o ciclo documental." },
];

const steps = [
  { t: "Diagnóstico da carteira", d: "Analisamos valores, aging e perfil dos devedores sem custo." },
  { t: "Localização com dados", d: "Mais de 250 milhões de registros para encontrar e enriquecer contatos." },
  { t: "Negociação multicanal", d: "WhatsApp, SMS, e-mail, voz, telefone e visita: o canal certo para cada perfil." },
  { t: "Relatórios em tempo real", d: "Dashboards, BI e integração via API com seu ERP ou CRM." },
];

const segments = ["Cooperativas e bancos", "Seguros e consórcio", "Consignado", "Cartões", "Varejo e maquinário", "Imobiliário, IPTU e IPVA", "Pesados e agrícola"];

const lgpd = [
  { icon: FileCheck, t: "Finalidade definida", d: "Os dados da sua carteira são usados apenas para a cobrança contratada, nada além disso." },
  { icon: Lock, t: "Segurança da informação", d: "Acesso restrito à equipe responsável e armazenamento protegido." },
  { icon: UserCheck, t: "Respeito ao devedor", d: "Abordagem transparente, sem constrangimento ou exposição, como prevê o Código de Defesa do Consumidor." },
  { icon: Scale, t: "Conformidade com a lei", d: "Processos de cobrança alinhados à LGPD (Lei nº 13.709/2018) em todos os canais." },
];

const faqs = [
  { q: "Como a Assertiva é remunerada?", a: "Por êxito. Nossa remuneração é calculada sobre a carteira efetivamente recuperada, ou seja, só ganhamos quando você recebe." },
  { q: "Como funciona a terceirização da cobrança?", a: "Recebemos sua carteira, fazemos o diagnóstico e assumimos toda a régua de cobrança extrajudicial, com relatórios de cada ação e repasse dos valores recuperados." },
  { q: "Vocês trabalham dentro da LGPD?", a: "Sim. Atuamos exclusivamente dentro da LGPD: os dados são usados só para a finalidade da cobrança, com acesso restrito, armazenamento seguro e abordagem respeitosa ao devedor." },
  { q: "A cobrança prejudica o relacionamento com meus clientes?", a: "Não. Somos especialistas em cobrança humanizada: abordagem respeitosa, transparente e alinhada à sua política comercial e à LGPD." },
  { q: "Atendem cooperativas de crédito?", a: "Sim. Estamos cadastrados no CAS do Sicredi, o que permite que mais de 100 cooperativas nos contratem de imediato, e atuamos há mais de 6 anos com cooperativas." },
  { q: "Vocês atuam em todo o Brasil?", a: "Sim. Operação digital nacional e equipe de visita externa fidelizada em todo o território." },
];

function LeadForm({ id }: { id?: string }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [fallbackMsg, setFallbackMsg] = useState("");
  // Antes do JavaScript carregar, o navegador enviaria o formulário "cru" (dados na URL, nada enviado).
  // O botão só é liberado quando o envio por JavaScript está pronto.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("_honey")) return; // Campo invisível preenchido: robô de spam.
    setStatus("sending");
    const msg = `Olá! Quero uma análise gratuita da minha carteira.\nNome: ${f.get("nome")}\nEmpresa: ${f.get("empresa")}\nTelefone: ${f.get("telefone")}\nSegmento: ${f.get("segmento")}\nValor em atraso: ${f.get("volume")}`;
    try {
      await sendLead({
        Nome: String(f.get("nome")),
        Empresa: String(f.get("empresa")),
        Telefone: String(f.get("telefone")),
        Segmento: String(f.get("segmento")),
        "Valor em atraso": String(f.get("volume")),
        Origem: window.location.href,
      });
    } catch {
      // Nenhum serviço de envio respondeu: oferece o WhatsApp com os dados, para o contato não se perder.
      setFallbackMsg(msg);
      setStatus("error");
      track("form_error");
      return;
    }
    // O evento de conversão (generate_lead) é disparado pela página /obrigado, a partir destes dados.
    const lead: Lead = {
      nome: String(f.get("nome") || "").split(" ")[0] ?? "",
      segmento: String(f.get("segmento")),
      volume: String(f.get("volume")),
      msg,
      tracked: false,
    };
    try {
      sessionStorage.setItem(LEAD_KEY, JSON.stringify(lead));
    } catch {
      // Sem sessionStorage: a página de obrigado não consegue confirmar o envio nem disparar a conversão.
    }
    navigate({ to: "/obrigado" });
  };
  const field = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <form id={id} onSubmit={onSubmit} method="post" action="#form" className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-glow sm:p-8">
      <h2 className="text-2xl font-bold">Análise gratuita da sua carteira</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sem custo e sem compromisso. Resposta de um especialista em até 1 dia útil.</p>
      <div className="mt-6 grid gap-3">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="sr-only" htmlFor="nome">Seu nome</label>
        <input required id="nome" name="nome" autoComplete="name" placeholder="Seu nome" className={field} />
        <label className="sr-only" htmlFor="empresa">Empresa ou cooperativa</label>
        <input required id="empresa" name="empresa" autoComplete="organization" placeholder="Empresa / Cooperativa" className={field} />
        <label className="sr-only" htmlFor="telefone">WhatsApp com DDD</label>
        <input required id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" minLength={10} placeholder="WhatsApp com DDD" className={field} />
        <label className="sr-only" htmlFor="segmento">Segmento</label>
        <select required id="segmento" name="segmento" defaultValue="" className={field}>
          <option value="" disabled>Segmento</option>
          {segments.map((s) => <option key={s}>{s}</option>)}
          <option>Outro</option>
        </select>
        <label className="sr-only" htmlFor="volume">Valor em atraso na carteira</label>
        <select required id="volume" name="volume" defaultValue="" className={field}>
          <option value="" disabled>Valor em atraso na carteira</option>
          <option>Até R$ 100 mil</option>
          <option>R$ 100 mil a R$ 500 mil</option>
          <option>R$ 500 mil a R$ 2 milhões</option>
          <option>Acima de R$ 2 milhões</option>
        </select>
        <button type="submit" disabled={!ready || status === "sending"} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-display text-base font-bold text-primary-foreground transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Enviando..." : <>Quero recuperar meu crédito <ArrowRight className="size-5" /></>}
        </button>
        {status === "error" && (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <p className="text-foreground">Não conseguimos enviar pelo formulário agora. Envie seus dados pelo WhatsApp que respondemos por lá:</p>
            <a href={waLink(fallbackMsg, LEADS_WHATSAPP)} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "form_error" })}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:brightness-110">
              <MessageCircle className="size-5" /> Enviar pelo WhatsApp
            </a>
          </div>
        )}
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <span>
          Ao enviar, você concorda em ser contatado pela Assertiva sobre esta solicitação. Seus dados são tratados conforme a LGPD e a nossa{" "}
          <Link to="/politica-de-privacidade" className="underline hover:text-foreground">Política de Privacidade</Link>.
        </span>
      </p>
    </form>
  );
}

function Landing() {
  const [open, setOpen] = useState<number | null>(0);
  // Esconde o botão fixo do celular enquanto o formulário está na tela (evita cobrir os campos).
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const form = document.getElementById("form");
    if (!form || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setFormVisible(!!e?.isIntersecting), { threshold: 0.15 });
    io.observe(form);
    return () => io.disconnect();
  }, []);
  return (
    <main className="overflow-x-hidden pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src="/logos/logo-assertiva.png" alt={COMPANY.name} width={237} height={120} fetchPriority="high" className="h-14 w-auto" />
          <a href="#form" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:brightness-110">Análise gratuita</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        {/* No celular: título → formulário → benefícios, para o formulário aparecer logo na primeira rolagem. */}
        <div className="relative mx-auto grid max-w-6xl gap-x-12 gap-y-7 px-5 py-8 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-y-0 lg:py-20">
          <div className="lg:self-end">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
              <Sparkles className="size-3.5" /> Empresa de cobrança · 20+ anos
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] sm:mt-5 sm:text-5xl lg:text-6xl">
              Terceirize sua cobrança e <span className="text-gradient">recupere mais crédito</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:mt-5 sm:text-lg">
              Assessoria de cobrança extrajudicial humanizada e multicanal, com inteligência artificial e mais de 250 milhões de dados para localizar e negociar com seus inadimplentes.
            </p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <LeadForm id="form" />
          </div>
          <div className="lg:self-start">
            <ul className="grid gap-2 text-sm sm:grid-cols-2 lg:mt-6">
              {["Remuneração por êxito", "100% dentro da LGPD", "Cobrança extrajudicial e judicial", "Robô de negociação 24/7", "Visita externa em todo o Brasil", "Relatórios e BI em tempo real"].map((b) => (
                <li key={b} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 sm:mt-8">
              {[["20+", "anos de mercado"], ["250MM", "dados na base"], ["24/7", "negociação digital"]].map(([n, l]) => (
                <div key={l}><div className="font-display text-2xl font-bold text-primary sm:text-3xl">{n}</div><div className="text-xs text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="bg-paper py-10 text-paper-foreground">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-sm font-semibold">Recuperando ativos de grandes cooperativas, bancos e empresas</p>
          <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-6 md:flex md:flex-wrap md:justify-center md:gap-x-14">
            {logos.map((l) => (
              <img key={l.alt} src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" decoding="async"
                className={`w-auto max-w-full object-contain ${l.square ? "h-16 md:h-20" : "h-8 sm:h-10 md:h-12"}`} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm opacity-75">Cadastrados no <strong>CAS do Sicredi</strong>: mais de 100 cooperativas podem nos contratar de imediato.</p>
        </div>
      </section>

      {/* Success fee */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card bg-hero p-8 shadow-glow sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><Handshake className="size-4" /> Remuneração por êxito</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Só ganhamos quando <span className="text-gradient">você ganha</span></h2>
              <p className="mt-4 max-w-xl text-muted-foreground">Trabalhamos por êxito: nossa remuneração é calculada sobre a carteira efetivamente recuperada. Nosso interesse é o mesmo que o seu, recuperar o máximo possível.</p>
            </div>
            <ul className="grid gap-3">
              {[
                { i: BadgePercent, t: "Remuneração sobre o valor efetivamente recuperado" },
                { i: TrendingUp, t: "Interesses alinhados: quanto mais você recebe, melhor para os dois" },
                { i: Handshake, t: "Parceria de longo prazo, com relatórios de cada ação" },
              ].map(({ i: I, t }) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4 text-sm">
                  <I className="mt-0.5 size-5 shrink-0 text-primary" />{t}
                </li>
              ))}
            </ul>
          </div>
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
      <section id="servicos" className="scroll-mt-20 border-y border-border bg-surface py-20">
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
      <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
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
            <h3 className="text-2xl font-bold">Plataforma SALT: cobrança digital com inteligência artificial</h3>
            <p className="mt-2 max-w-2xl text-muted-foreground">Negociação automatizada com IA no WhatsApp, SMS e web, navegação 3G/4G patrocinada e boleto emitido na hora, para o seu cliente negociar quando e onde preferir.</p>
          </div>
          <a href="#form" className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:brightness-110 md:mt-0">Solicitar análise <ArrowRight className="size-4" /></a>
        </div>
      </section>

      {/* LGPD */}
      <section id="lgpd" className="scroll-mt-20 border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><ShieldCheck className="size-4" /> Proteção de dados</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">Cobrança feita exclusivamente <span className="text-gradient">dentro da LGPD</span></h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Os dados dos seus clientes são tratados com responsabilidade em todas as etapas. Recuperar crédito não pode colocar a sua empresa em risco.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lgpd.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-xl border border-border bg-card p-6">
                <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><I className="size-5 text-primary" /></div>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
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
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-20">
        <h2 className="text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
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
          <div className="mt-8 flex justify-center">
            <a href="#form" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 font-bold text-primary-foreground hover:brightness-110">Quero minha análise gratuita <ArrowRight className="size-5" /></a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile sticky CTA */}
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur transition-transform md:hidden ${formVisible ? "translate-y-full" : ""}`} aria-hidden={formVisible}>
        <a href="#form" className="block rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground">Quero minha análise gratuita</a>
      </div>
    </main>
  );
}
