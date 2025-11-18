export async function handler(event, context) {
  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { subject, message } = data;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  const emailData = {
    from: "2Wheelsyard <no-reply@2wheelsyard.com>",
    to: "2wheelsyard@gmail.com",
    subject: subject,
    text: message
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
  });

  if (response.ok) {
    return { statusCode: 200, body: "OK" };
  } else {
    const error = await response.text();
    return { statusCode: 500, body: error };
  }
}
