export async function handler(event) {
  try {
    // --- READ DATA FROM FRONTEND ---
    const { subject, message, userEmail } = JSON.parse(event.body);

    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("User Email:", userEmail);

    // --- LOAD RESEND API KEY ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.log("❌ ERROR: RESEND_API_KEY missing!");
      return { statusCode: 500, body: "ERROR: Missing key" };
    }

    // --- PREPARE EMAIL BODY ---
    const emailData = {
      from: "2Wheelsyard <no-reply@2wheelsyard.com>",
      to: "2wheelsyard@gmail.com",
      subject: "New shop request: " + subject,
      text:
        `Customer email: ${userEmail}\n\n` +
        `Product: ${subject}\n\n` +
        "Message:\n" +
        message
    };

    // --- SEND EMAIL TO RESEND ---
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    const data = await response.json();

    console.log("Response status:", response.status);
    console.log("Response:", data);

    // --- RETURN SUCCESS OR FAILURE ---
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
