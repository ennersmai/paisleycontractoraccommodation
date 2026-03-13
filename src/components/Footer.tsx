const Footer = () => {
  return (
    <footer className="py-10 bg-primary text-primary-foreground">
      <div className="container text-center">
        <p className="font-semibold text-lg">Cross Road Apartment</p>
        <p className="text-sm opacity-80 mt-1">20A Cross Road, Paisley PA2 9QH</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm opacity-80">
          <span>Phone: +44 3330 600 600

          </span>
          <span>·</span>
          <a href="https://wa.me/441234567890" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">WhatsApp</a>
          <span>·</span>
          <a href="mailto:accounts@example.com" className="hover:opacity-100">bookings@voyagecollection.co.uk</a>
        </div>
        <p className="text-xs opacity-60 mt-6">
          Direct bookings welcome. Company accounts accepted.
        </p>
      </div>
    </footer>);};

export default Footer;