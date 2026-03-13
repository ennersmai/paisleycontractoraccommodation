import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import galleryBedroom from "@/assets/gallery-bedroom.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryTwinBedroom from "@/assets/gallery-twin-bedroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryExterior from "@/assets/gallery-exterior.jpg";

const images = [
  { src: galleryExterior, alt: "Property exterior" },
  { src: galleryBedroom, alt: "Master bedroom with bay window" },
  { src: galleryTwinBedroom, alt: "Twin bedroom" },
  { src: galleryLiving, alt: "Living room with sofa" },
  { src: galleryBathroom, alt: "Modern bathroom with shower" },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const prev = () =>
    setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <section id="gallery" className="py-16 bg-surface">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Property Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openImage(i)}
              className="overflow-hidden rounded-lg aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeImage}>
        <DialogContent className="max-w-4xl p-0 bg-foreground/95 border-none [&>button]:hidden">
          {selectedIndex !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-sm">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
