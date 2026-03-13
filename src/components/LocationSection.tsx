const stats = [
  { place: "Glasgow Airport", time: "9 minutes" },
  { place: "AMIDS South corridor", time: "10 minutes" },
  { place: "Royal Alexandra Hospital", time: "2 minutes" },
  { place: "Glasgow city centre", time: "20 minutes" },
];

const LocationSection = () => {
  return (
    <section id="location" className="py-16 bg-background">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Perfectly located for west Glasgow projects
        </h2>
        <div className="w-full aspect-video rounded-lg overflow-hidden border">
          <iframe
            title="Property Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17944.0!2d-4.4230!3d55.8460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846d0a4b7b4e1%3A0x5f3e3e3e3e3e3e3e!2sCross+Rd%2C+Paisley+PA2+9QH!5e0!3m2!1sen!2suk!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((s) => (
            <div key={s.place} className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-accent">{s.time}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
