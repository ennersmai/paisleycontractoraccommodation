import { Star } from "lucide-react";

const reviews = [
  {
    text: "Huge property.\nEverything to hand.\nGood on street parking.\nQuiet.\nHuge kitchen and lounge.\nWell supplied with cookware.\n\n",
    author: "Julie",
    stars: 5,
  },
  {
    text: "Very smartly done out. Clean good facilities very nice rooms especially bathroom and kitchen. Clearly the price is much higher normally got a deal so excellent value for money.\n\n\n",
    author: "Fisher",
    stars: 5,
  },
  {
    text: "Very impressed. Stayed as 4 adults and a 4 month old baby. Absolutely loves this apartment and will definitely return to",
    author: "Avril",
    stars: 4,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          What guests say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-background border rounded-lg p-6">
              <p className="text-sm text-foreground leading-relaxed italic whitespace-pre-line">"{r.text}"</p>
              <p className="mt-4 text-xs text-muted-foreground font-medium">{r.author}</p>
              <div className="flex gap-0.5 mt-2">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
