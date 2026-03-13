import { Plane, HardHat, Wrench, Building2, ClipboardList, Briefcase } from "lucide-react";

const audiences = [
  { icon: Plane, label: "Airport & aviation works teams" },
  { icon: HardHat, label: "Infrastructure & civil engineering crews" },
  { icon: Wrench, label: "Fit-out and specialist trades" },
  { icon: Building2, label: "Hospital and NHS relocation staff" },
  { icon: ClipboardList, label: "Site supervisors and project managers" },
  { icon: Briefcase, label: "Corporate relocation stays" },
];

const AudienceSection = () => {
  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Ideal for:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((a) => (
            <div key={a.label} className="flex items-center gap-4 p-5 bg-background border rounded-lg">
              <a.icon className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
