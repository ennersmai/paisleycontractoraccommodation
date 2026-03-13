import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const HeroSection = () => {
  return (
    <section className="relative text-primary-foreground py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }} />
      
      <div className="absolute inset-0 bg-primary/80" />
      <div className="container text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Contractor &amp; Business Accommodation in Paisley
          <span className="block mt-1 text-2xl md:text-4xl font-bold opacity-90">
            Near Glasgow Airport
          </span>
        </h1>
        <ul className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-lg md:text-xl opacity-90">
          {["Fully furnished", "Sleeps 5", "Weekly & monthly stays", "Company invoicing available"].map((item) =>
          <li key={item} className="flex items-center gap-2">
              <Check className="w-5 h-5 shrink-0" />
              <span>{item}</span>
            </li>
          )}
        </ul>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <a href="#booking" className="font-bold">BOOK NOW </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="https://wa.me/441234567890" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm opacity-80">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold">8.6</span> rated on Booking.com
          </div>
          <span>·</span>
          <span>52 verified reviews</span>
          <span>·</span>
          <span>Direct booking available</span>
        </div>
      </div>
    </section>);

};

export default HeroSection;