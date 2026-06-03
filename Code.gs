// Morgan Lawn Services — Quote Request Handler
// Deploy as a Web App: Execute as Me, Who has access: Anyone
// After each code change you must create a NEW deployment (not update the existing one)

var RECIPIENT_EMAIL = "jonas4309@gmail.com";

function doPost(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    var data = JSON.parse(e.postData.contents);

    var subject = "New Quote Request — Morgan Lawn Services";

    var body = [
      "You have a new quote request from your website!\n",
      "─────────────────────────────────────",
      "Name:      " + data.firstName + " " + data.lastName,
      "Phone:     " + data.phone,
      "Email:     " + (data.email || "Not provided"),
      "Address:   " + data.address,
      "Service:   " + (data.service || "Not specified"),
      "Yard Size: " + (data.yardSize || "Not specified"),
      "─────────────────────────────────────",
      "Message:",
      data.message || "(No additional details provided)",
      "─────────────────────────────────────",
      "\nReply directly to this email or call/text the customer at " + data.phone + "."
    ].join("\n");

    var options = {};
    if (data.email) {
      options.replyTo = data.email;
    }

    GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body, options);

    output.setContent(JSON.stringify({ success: true }));
  } catch (err) {
    output.setContent(JSON.stringify({ success: false, error: err.message }));
  }

  return output;
}

// Handles CORS preflight OPTIONS requests
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this manually in the editor to verify email delivery works
function testEmail() {
  GmailApp.sendEmail(
    RECIPIENT_EMAIL,
    "Test — Morgan Lawn Services Form",
    "Your quote request form is working correctly!"
  );
}
