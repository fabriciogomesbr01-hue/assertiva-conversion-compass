import { createFileRoute } from "@tanstack/react-router";

import { SimplePage } from "@/components/site/SimplePage";
import { COMPANY, SITE_URL } from "@/lib/company";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Assertiva" },
      { name: "description", content: "Saiba como a Assertiva Multicanalidade coleta, usa e protege seus dados pessoais, em conformidade com a LGPD." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/politica-de-privacidade` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const owner = COMPANY.legalName || COMPANY.name;
  const contact = COMPANY.email ? `pelo e-mail ${COMPANY.email}, ` : "";
  return (
    <SimplePage title="Política de Privacidade" updated="29 de outubro de 2026">
      <p>
        Esta Política explica como a <strong>{owner}</strong>
        {COMPANY.cnpj && <>, inscrita no CNPJ {COMPANY.cnpj},</>} ("Assertiva", "nós") trata os dados pessoais coletados nesta página, conforme a
        Lei Geral de Proteção de Dados (Lei nº 13.709/2018, "LGPD").
      </p>

      <h2>1. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados informados por você no formulário:</strong> nome, empresa, telefone/WhatsApp, segmento de atuação e faixa de valor em atraso.</li>
        <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador e dispositivo, páginas visitadas e origem do acesso (por exemplo, um anúncio do Google), coletados por cookies e tecnologias semelhantes.</li>
      </ul>

      <h2>2. Para que usamos os dados</h2>
      <ul>
        <li>Entrar em contato com você para apresentar nossos serviços e elaborar a análise da carteira solicitada.</li>
        <li>Medir o desempenho das nossas campanhas de publicidade (como o Google Ads) e melhorar esta página.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
      <p>
        As bases legais são o seu consentimento, o procedimento preliminar a um contrato solicitado por você e o legítimo interesse da Assertiva,
        sempre respeitando seus direitos.
      </p>

      <h2>3. Cookies e publicidade</h2>
      <p>
        Usamos cookies próprios e de terceiros, como o Google (Google Ads, Google Analytics e Google Tag Manager), para medir conversões e
        exibir anúncios relevantes. Os cookies de publicidade e análise só são ativados se você clicar em "Aceitar" no aviso de cookies.
        Você também pode bloqueá-los nas configurações do seu navegador. Saiba como o Google usa os dados em{" "}
        <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR" target="_blank" rel="noreferrer">policies.google.com</a>.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>
        Não vendemos seus dados. Eles podem ser compartilhados apenas com fornecedores que nos ajudam a operar (hospedagem, ferramentas de
        atendimento, como o WhatsApp, e plataformas de publicidade e análise) ou com autoridades, quando exigido por lei.
      </p>

      <h2>5. Armazenamento e segurança</h2>
      <p>
        Mantemos os dados apenas pelo tempo necessário às finalidades descritas ou exigido por lei, e adotamos medidas técnicas e
        administrativas para protegê-los contra acesso não autorizado.
      </p>

      <h2>6. Seus direitos</h2>
      <p>
        Você pode, a qualquer momento, solicitar confirmação do tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus
        dados, além de revogar o consentimento. Para isso, fale conosco {contact}pelos telefones {COMPANY.phones.join(" ou ")} ou pelo WhatsApp{" "}
        {COMPANY.whatsappLabel}.
      </p>

      <h2>7. Alterações</h2>
      <p>Esta Política pode ser atualizada. A versão vigente estará sempre disponível nesta página, com a data da última atualização.</p>
    </SimplePage>
  );
}
