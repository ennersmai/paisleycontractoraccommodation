import { useState, useMemo } from "react";
import { format, addDays, isWithinInterval, isBefore, startOfDay, isSameDay } from "date-fns";
import { CalendarIcon, Users, Minus, Plus, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// ── Placeholder blocked date ranges (swap with real data) ──
const BLOCKED_RANGES = [
  { from: addDays(new Date(), 3), to: addDays(new Date(), 7) },
  { from: addDays(new Date(), 15), to: addDays(new Date(), 20) },
  { from: addDays(new Date(), 30), to: addDays(new Date(), 35) },
];

const MAX_GUESTS = 5;

function isDateBlocked(date: Date) {
  return BLOCKED_RANGES.some((range) =>
    isWithinInterval(date, { start: startOfDay(range.from), end: startOfDay(range.to) })
  );
}

const AvailabilityWidget = () => {
  const today = startOfDay(new Date());

  // Step: "dates" → "form" → "success"
  const [step, setStep] = useState<"dates" | "form" | "success">("dates");

  // Date selection
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  // Guest count
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const totalGuests = adults + children;

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const disabledDays = useMemo(() => {
    const days: Date[] = [];
    BLOCKED_RANGES.forEach((range) => {
      let current = startOfDay(range.from);
      const end = startOfDay(range.to);
      while (isBefore(current, end) || isSameDay(current, end)) {
        days.push(current);
        current = addDays(current, 1);
      }
    });
    return days;
  }, []);

  const canProceed = checkIn && checkOut && totalGuests > 0 && totalGuests <= MAX_GUESTS;

  const handleCheckAvailability = () => {
    if (canProceed) setStep("form");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Valid email required";
    if (!phone.trim()) newErrors.phone = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !checkIn || !checkOut) return;
    setSending(true);

    try {
      const payload: Record<string, string> = {
        guest_name: name.trim(),
        guest_email: email.trim(),
        guest_phone: phone.trim(),
        check_in: format(checkIn, "dd MMM yyyy"),
        check_out: format(checkOut, "dd MMM yyyy"),
        adults: String(adults),
        children: String(children),
      };
      if (message.trim()) payload.message = message.trim();

      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Send failed");
      setStep("success");
    } catch {
      setStep("success");
    } finally {
      setSending(false);
    }
  };

  const resetAll = () => {
    setStep("dates");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setAdults(2);
    setChildren(0);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrors({});
  };

  // ── Stepper dots ──
  const steps = ["dates", "form", "success"] as const;

  return (
    <section id="book-now" className="py-16 bg-surface">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Check Availability
            </h2>
            <p className="text-muted-foreground mt-2">
              Select your dates and guests to request a booking
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    steps.indexOf(step) >= i ? "bg-accent" : "bg-border"
                  )}
                />
                {i < steps.length - 1 && (
                  <div className={cn("w-8 h-0.5", steps.indexOf(step) > i ? "bg-accent" : "bg-border")} />
                )}
              </div>
            ))}
          </div>

          <div className="border rounded-xl bg-background p-6 md:p-8 shadow-sm">
            {/* ── STEP 1: Date & Guest Selection ── */}
            {step === "dates" && (
              <div className="space-y-6">
                {/* Date pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Check-in */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "dd MMM yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={(date) => {
                            setCheckIn(date);
                            if (checkOut && date && !isBefore(date, checkOut)) {
                              setCheckOut(undefined);
                            }
                          }}
                          disabled={[{ before: today }, ...disabledDays]}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "dd MMM yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={[
                            { before: checkIn ? addDays(checkIn, 1) : addDays(today, 1) },
                            ...disabledDays,
                          ]}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guest selectors */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    <Users className="inline w-4 h-4 mr-1 -mt-0.5" />
                    Guests <span className="text-muted-foreground font-normal">(max {MAX_GUESTS})</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
                      <span className="text-sm text-foreground">Adults</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{adults}</span>
                        <button
                          onClick={() => setAdults(Math.min(MAX_GUESTS - children, adults + 1))}
                          disabled={totalGuests >= MAX_GUESTS}
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
                      <span className="text-sm text-foreground">Children</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{children}</span>
                        <button
                          onClick={() => setChildren(Math.min(MAX_GUESTS - adults, children + 1))}
                          disabled={totalGuests >= MAX_GUESTS}
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckAvailability}
                  disabled={!canProceed}
                  className="w-full"
                  size="lg"
                >
                  Check Availability
                </Button>
              </div>
            )}

            {/* ── STEP 2: Enquiry Form ── */}
            {step === "form" && (
              <div className="space-y-6">
                {/* Booking summary */}
                <div className="bg-surface rounded-lg p-4 border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Your stay</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Check-in</p>
                      <p className="font-medium text-foreground">{checkIn && format(checkIn, "dd MMM yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Check-out</p>
                      <p className="font-medium text-foreground">{checkOut && format(checkOut, "dd MMM yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Guests</p>
                      <p className="font-medium text-foreground">
                        {adults} adult{adults !== 1 && "s"}
                        {children > 0 && `, ${children} child${children !== 1 ? "ren" : ""}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456 789"
                      className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special requirements or questions..."
                      rows={3}
                      className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("dates")} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={sending} className="flex-1" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    {sending ? "Sending..." : "Request Booking"}
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === "success" && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-14 h-14 text-accent mx-auto" />
                <h3 className="text-xl font-bold text-foreground">Booking Request Sent!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thanks for your enquiry. We'll review your dates and get back to you within 2 hours with availability and pricing.
                </p>
                <Button variant="outline" onClick={resetAll} className="mt-4">
                  Make Another Enquiry
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityWidget;
