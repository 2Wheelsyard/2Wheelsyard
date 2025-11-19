function sendEmail() {
  const subject = document.getElementById("emailSubject").value;
  const message = document.getElementById("emailMessage").value;
  const userEmail = document.getElementById("userEmail").value;

  fetch("/.netlify/functions/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subject, message, userEmail })
  })
    .then(res => res.text())
    .then(result => {
      if (result === "OK") {
        alert("All set! We've received your message.");
        closeEmailPopup();
      } else {
        alert("An error occurred while sending the message.");
      }
    })
    .catch(() => {
      alert("Error communicating with the server.");
    });
}
