import { Users, BedDouble, Car, UtensilsCrossed, WashingMachine, Wifi, CalendarDays, FileText } from "lucide-react";

const features = [
  { icon: Users, label: "Sleeps up to 5" },
  { icon: BedDouble, label: "2 Bedrooms" },
  { icon: Car, label: "Free Parking" },
  { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
  { icon: WashingMachine, label: "Laundry Facilities" },
  { icon: Wifi, label: "Fast Wi-Fi" },
  { icon: CalendarDays, label: "Flexible Accommodation" },
  { icon: FileText, label: "Company Invoicing Available" },
];

const FeaturesStrip = () => {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 p-4 border rounded-lg">
              <f.icon className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesStrip;
