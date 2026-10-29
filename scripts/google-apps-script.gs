/**
 * Recebe os contatos do formulário da landing page, salva numa planilha e envia por e-mail.
 *
 * Como instalar (uma vez só, com a conta Google que vai enviar os e-mails):
 * 1. Crie uma planilha em https://sheets.new e dê um nome, por exemplo "Leads landing page".
 * 2. Na planilha, abra Extensões > Apps Script, apague o código que aparecer e cole este arquivo inteiro.
 * 3. Clique em Implantar > Nova implantação > tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Clique em Implantar e autorize o acesso quando o Google pedir.
 * 5. Copie a "URL do app da Web" (termina em /exec) e coloque em LEAD_ENDPOINT, em src/lib/company.ts.
 *
 * Se alterar este código depois, use Implantar > Gerenciar implantações > editar > Nova versão,
 * para manter a mesma URL.
 */

const RECIPIENTS = ["alexandrer@assertivarc.com.br", "fabricio@assertivarc.com.br"];
const COLUMNS = ["Data", "Nome", "Empresa", "Telefone", "Segmento", "Valor em atraso", "Origem"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.Nome || !data.Telefone) return reply({ ok: false, error: "campos obrigatórios" });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
    const row = COLUMNS.map((c) => (c === "Data" ? new Date() : String(data[c] || "").slice(0, 500)));
    sheet.appendRow(row);

    const html =
      "<h2>Novo contato pela landing page</h2><table cellpadding='6' style='border-collapse:collapse'>" +
      COLUMNS.slice(1)
        .map((c) => "<tr><td style='border:1px solid #ddd'><b>" + c + "</b></td><td style='border:1px solid #ddd'>" + escapeHtml(data[c]) + "</td></tr>")
        .join("") +
      "</table>";
    MailApp.sendEmail({
      to: RECIPIENTS.join(","),
      subject: String(data._subject || "Novo contato pela landing page").slice(0, 200),
      htmlBody: html,
      name: "Landing page Assertiva",
    });

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function escapeHtml(v) {
  return String(v || "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
