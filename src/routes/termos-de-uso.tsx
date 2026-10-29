import { createFileRoute, Link } from "@tanstack/react-router";

import { SimplePage } from "@/components/site/SimplePage";
import { COMPANY, SITE_URL } from "@/lib/company";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Assertiva" },
      { name: "description", content: "Termos de uso da página de serviços de cobrança e recuperação de crédito da Assertiva Multicanalidade." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/termos-de-uso` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SimplePage title="Termos de Uso" updated="29 de outubro de 2026">
      <p>
        Ao acessar esta página, mantida pela <strong>{COMPANY.legalName || COMPANY.name}</strong>
        {COMPANY.cnpj && <> (CNPJ {COMPANY.cnpj})</>}, você concorda com os termos abaixo.
      </p>

      <h2>1. Finalidade da página</h2>
      <p>
        Esta página apresenta os serviços de cobrança extrajudicial e recuperação de crédito da Assertiva para empresas, bancos e cooperativas,
        e permite solicitar contato comercial. Ela não se destina a devedores nem realiza cobranças ou negociação de dívidas de pessoas físicas.
      </p>

      <h2>2. Informações e resultados</h2>
      <p>
        As informações aqui publicadas têm caráter informativo. Os resultados de recuperação variam conforme o perfil, a idade e o volume de cada
        carteira, e não há garantia de valores ou percentuais específicos. Condições comerciais são definidas em proposta e contrato próprios.
      </p>

      <h2>3. Análise gratuita</h2>
      <p>
        A análise gratuita da carteira é uma avaliação comercial inicial, sem custo e sem obrigação de contratação.
      </p>

      <h2>4. Uso adequado</h2>
      <p>Você se compromete a fornecer informações verdadeiras no formulário e a não usar esta página para fins ilícitos.</p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Textos, marcas e elementos visuais pertencem à Assertiva ou a seus respectivos titulares. Os logotipos de clientes são exibidos apenas
        para referência de atuação.
      </p>

      <h2>6. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a nossa <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>

      <h2>7. Contato</h2>
      <p>
        Dúvidas sobre estes termos: {COMPANY.email && <>{COMPANY.email}, </>}telefones {COMPANY.phones.join(" ou ")} ou WhatsApp{" "}
        {COMPANY.whatsappLabel}.
      </p>
    </SimplePage>
  );
}
