export async function handler(event) {
  try {
    const { subject, message, userEmail } = JSON.parse(event.body);

    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("User Email:", userEmail);

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.log("Missing API key!");
      return { statusCode: 500, body: "Missing API key" };
    }

    const emailData = {
      from: "onboarding@resend.dev", // TEMP para teste
      to: "2wheelsyard@gmail.com",
      subject: "New shop request: " + subject,
      text:
        `Customer email: ${userEmail}\n\n` +
        "Message:\n" +
        message
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    const text = await response.text();

    console.log("Resend status:", response.status);
    console.log("Resend response:", text);

    if (response.ok) {
      return { statusCode: 200, body: "OK" };
    } else {
      return { statusCode: 500, body: text };
    }

  } catch (error) {
    console.log("SendEmail ERROR:", error);
    return { statusCode: 500, body: error.toString() };
  }
}
