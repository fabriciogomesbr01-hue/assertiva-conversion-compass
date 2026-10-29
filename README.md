# Landing page Assertiva (Google Ads)

Landing page de captação de leads da Assertiva Multicanalidade para campanhas no Google Ads.
Publicada em **https://lp.assertivarc.com.br** via GitHub Pages.

## Como funciona

- Site estático: TanStack Start + Vite pré-renderiza todas as páginas em `dist/client`.
- Cada envio para o `main` roda o workflow `.github/workflows/deploy.yml`, que testa, gera e publica o site.
- Formulário: envia os contatos por e-mail via FormSubmit (destinatários em `src/lib/company.ts`).
- Conversão: o evento `generate_lead` vai para o `dataLayer` na página `/obrigado`, uma vez por envio.

## Configuração

Tudo que muda com frequência fica em `src/lib/company.ts`: dados da empresa (CNPJ, razão social, e-mail),
telefones, WhatsApp, e-mails que recebem os leads, ID do Google Tag Manager e URL do site.
Se a URL mudar, atualize também `public/CNAME`, `public/sitemap.xml` e `public/robots.txt`.

## Desenvolvimento

Requer Node.js 24 ou mais recente.

```sh
npm install
npm run dev      # servidor local
npm test         # testes
npm run build    # gera o site estático em dist/client
```
