import Container from "@/components/ui/Container";

/**
 * Trust Stats: 25 years, 100 nights, 8 weeks, 0 plastic.
 */
export default function StatsRow() {
  const stats = [
    {
      value: "25 years",
      label: "Atelier Guarantee",
      desc: "Full warranty on all mortise-and-tenon structural joints.",
    },
    {
      value: "100 nights",
      label: "Domestic Trial",
      desc: "Live with a piece in your natural light and daily routines.",
    },
    {
      value: "8 weeks",
      label: "Handcraft Cadence",
      desc: "From timber drying check to delivery inside Nairobi county.",
    },
    {
      value: "0 plastic",
      label: "Pure Integrity",
      desc: "Zero synthetic veneers, polyurethane glues, or toxic lacquers.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <Container>
        <div className="w-full rounded-2xl bg-sand p-8 sm:p-14 lg:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-serif text-4xl lg:text-5xl text-ink tracking-tight">
                  {stat.value}
                </span>
                <span className="font-sans text-eyebrow uppercase tracking-wider text-oak font-semibold">
                  {stat.label}
                </span>
                <p className="font-sans text-small text-ink/70">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
