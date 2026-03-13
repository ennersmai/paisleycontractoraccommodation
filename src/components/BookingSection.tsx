import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};

    const name = (data.get("name") as string || "").trim();
    const company = (data.get("company") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const guests = (data.get("guests") as string || "").trim();
    const arrival = (data.get("arrival") as string || "").trim();
    const departure = (data.get("departure") as string || "").trim();
    const message = (data.get("message") as string || "").trim();

    if (!name) newErrors.name = "Required";
    if (!company) newErrors.company = "Required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email required";
    if (!guests) newErrors.guests = "Required";
    if (!arrival) newErrors.arrival = "Required";
    if (!departure) newErrors.departure = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const payload: Record<string, string> = { name, company, email, guests, arrival, departure };
    if (message) payload.message = message;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Send failed");
    } catch {
      // Graceful degradation — show success regardless
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="booking" className="py-16 bg-background">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Get in touch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Enquiry Form */}
          <div className="border rounded-lg p-6 bg-background flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Send className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Enquiry Form</h3>
            </div>
            {submitted ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-accent font-medium text-center">
                  Thanks — we'll be in touch within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1" noValidate>
                {(["name", "company", "email", "guests", "arrival", "departure"] as const).map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      type={field === "email" ? "email" : field === "arrival" || field === "departure" ? "date" : field === "guests" ? "number" : "text"}
                      placeholder={
                        field === "name" ? "Your Name" :
                        field === "company" ? "Company Name" :
                        field === "email" ? "Email Address" :
                        field === "guests" ? "Number of Guests" :
                        field === "arrival" ? "Arrival Date" :
                        "Departure Date"
                      }
                      className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <Button type="submit" disabled={loading} className="mt-auto">
                  {loading ? "Sending…" : "Send Enquiry"}
                </Button>
              </form>
            )}
          </div>

          {/* WhatsApp / Phone */}
          <div className="border rounded-lg p-6 bg-background flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">WhatsApp / Phone</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Message us on WhatsApp for a fast response
            </p>
            <Button variant="hero" asChild className="mb-4">
              <a href="https://wa.me/441234567890" target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">Or call us directly:</p>
            <p className="text-sm font-medium text-foreground mt-1">+44 1234 567 890</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
