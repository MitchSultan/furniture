import Link from "next/link";
import siteData from "@/data/site.json";
import Container from "@/components/ui/Container";

/**
 * Editorial footer matching Figma spec:
 * Deep charcoal background (#211D1A), 4 columns, huge subtle wordmark banner.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-charcoal text-cream pt-20 pb-12">
      <Container>
        {/* 4 Column links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Shop */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-eyebrow uppercase tracking-widest text-oak">
              Shop
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/shop?category=living"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Mirrors &amp; Reflectors
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=living"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Glass Tables &amp; Consoles
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=study"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Architectural Partitions
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Objects &amp; Vessel Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-eyebrow uppercase tracking-widest text-oak">
              Studio
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/journal"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  The Workshop Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Journal &amp; Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Custom Atelier Commissions
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="font-sans text-small text-cream/70 hover:text-cream transition-colors"
                >
                  Client Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-eyebrow uppercase tracking-widest text-oak">
              Contact
            </span>
            <ul className="flex flex-col gap-2 text-small text-cream/70">
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-cream/40">
                  Concierge Inquiries
                </span>
                <a
                  href={`mailto:${siteData.email}`}
                  className="hover:text-cream transition-colors"
                >
                  {siteData.email}
                </a>
              </li>
              <li className="pt-1">
                <span className="block text-[11px] uppercase tracking-wider text-cream/40">
                  Telephone
                </span>
                <a
                  href={`tel:${siteData.phone}`}
                  className="hover:text-cream transition-colors"
                >
                  {siteData.phone}
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="text-oak hover:text-cream transition-colors"
                >
                  Direct Inquiry Form &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-eyebrow uppercase tracking-widest text-oak">
              Showroom
            </span>
            <p className="font-sans text-small text-cream/70 leading-relaxed">
              {siteData.address.street}
              <br />
              {siteData.address.area}, {siteData.address.city},{" "}
              {siteData.address.state} {siteData.address.zip}
              <br />
              <span className="block text-[12px] mt-2 text-cream/50">
                {siteData.showroom.hours}
                <br />
                {siteData.showroom.note}
              </span>
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="font-sans text-small text-cream hover:text-oak transition-colors"
              >
                Book an appointment &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Large Decorative Wordmark */}
        <div className="overflow-hidden select-none py-8 border-t border-b border-white/10">
          <p className="font-serif text-5xl md:text-[84px] md:leading-[92px] tracking-tighter lowercase text-cream/15 text-center whitespace-nowrap">
            {siteData.name.toLowerCase()}.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-cream/60 font-sans text-small">
          <p>&copy; {new Date().getFullYear()} {siteData.name} atelier llc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="italic font-serif text-title text-oak/90">
              {siteData.tagline}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
