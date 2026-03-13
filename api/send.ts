const FROM = "Paisley Inquiries <book@paisleycontractoraccommodation.co.uk>";
const TO = "bookings@voyagecollection.co.uk";

const LABEL: Record<string, string> = {
  name: "Name",
  guest_name: "Name",
  email: "Email",
  guest_email: "Email",
  company: "Company",
  phone: "Phone",
  guest_phone: "Phone",
  guests: "Number of Guests",
  adults: "Adults",
  children: "Children",
  arrival: "Arrival Date",
  departure: "Departure Date",
  check_in: "Check-in",
  check_out: "Check-out",
  message: "Message",
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const replyTo = body.email || body.guest_email;
  if (!replyTo) {
    return new Response(JSON.stringify({ error: "Email address is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const senderName = body.name || body.guest_name || "Guest";

  const rows = Object.entries(body)
    .filter(([, val]) => val && val.trim() !== "")
    .map(([key, val]) => {
      const label = LABEL[key] ?? key.replace(/_/g, " ");
      return `<tr>
        <td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="padding:6px 12px;color:#222">${val}</td>
      </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222">
      <h2 style="margin-bottom:16px;border-bottom:2px solid #e5e7eb;padding-bottom:12px;color:#1a1a1a">
        New Booking Enquiry — Paisley Contractor Accommodation
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows}
      </table>
      <p style="font-size:12px;color:#999;margin-top:24px;border-top:1px solid #e5e7eb;padding-top:12px">
        Hit Reply to respond directly to ${senderName}.
      </p>
    </div>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: replyTo,
      subject: `Booking enquiry from ${senderName}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    console.error("Resend API error:", errText);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
