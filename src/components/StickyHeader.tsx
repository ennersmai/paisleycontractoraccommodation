import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Location", href: "#location" },
  { label: "Pricing", href: "#pricing" },
  { label: "Book", href: "#booking" },
];

const StickyHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-bold text-lg tracking-tight text-foreground">
          Cross Road Apartment
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#booking">Send Enquiry</a>
          </Button>
        </nav>
        <div className="md:hidden">
          <Button asChild size="sm">
            <a href="#booking">Send Enquiry</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
