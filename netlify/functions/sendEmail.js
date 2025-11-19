import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const { subject, message, userEmail } = JSON.parse(event.body);

    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("User Email:", userEmail);

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    const emailData = {
      from: "2Wheelsyard <no-reply@2wheelsyard.com>",
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
      const userEmail = document.getElementById("userEmail").value;

body: JSON.stringify({ subject, message, userEmail })

    });

    const data = await response.json();

    console.log("Response status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
      return { statusCode: 200, body: "OK" };
    } else {
      return { statusCode: 500, body: "ERROR" };
    }
  } catch (error) {
    console.log("SendEmail error:", error);
    return { statusCode: 500, body: "ERROR" };
  }
}
