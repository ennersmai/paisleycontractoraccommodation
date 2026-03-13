const rates = [
  { duration: "1 – 2 Weeks", rate: "From £105/night equivalent" },
  { duration: "3 – 4 Weeks", rate: "From £665/week" },
  { duration: "5 – 8 Weeks", rate: "From £550/week" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 bg-surface">
      <div className="container max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Flexible rates for every project
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rates.map((r) => (
            <div key={r.duration} className="border rounded-lg bg-background p-6 text-center">
              <p className="text-lg font-semibold text-foreground">{r.duration}</p>
              <p className="text-sm text-muted-foreground mt-2">{r.rate}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
          All rates for whole-property use. Company accounts and purchase orders accepted. Invoicing available on request.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
