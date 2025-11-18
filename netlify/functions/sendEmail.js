export async function handler(event, context) {
  // Garantir que o body é JSON
  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    console.log("Erro ao fazer parse do JSON:", e);
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { subject, message } = data;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  console.log("Subject recebido:", subject);
  console.log("Mensagem recebida:", message);

  const emailData = {
    from: "2Wheelsyard <no-reply@2wheelsyard.com>",
    to: "2wheelsyard@gmail.com",
    subject: subject,
    text: message
  };

  console.log("A enviar para a Resend...");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
  });

  // LOG DO STATUS E DO BODY DA RESEND
  console.log("Response status:", response.status);

  const text = await response.text();
  console.log("Response body:", text);

  if (response.ok) {
    console.log("Email enviado com sucesso!");
    return { statusCode: 200, body: "OK" };
  } else {
    console.log("Erro ao enviar email:", text);
    return { statusCode: 500, body: text };
  }
}
