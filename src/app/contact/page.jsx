"use client";

import { useActionState } from "react";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import siteData from "@/data/site.json";
import { submitContactInquiry } from "@/actions/contact";

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, {
    success: false,
    message: "",
    error: "",
  });

  return (
    <div className="w-full pt-28 pb-24 md:pt-36 md:pb-32" id="contact-inquiry">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Atelier Info & Showroom Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <SectionHeading
              eyebrow="CONCIERGE & SHOWROOM"
              title="Initiate a commission or schedule a private viewing."
              subtitle="Whether discussing a custom dimension for your residence or inspecting our timber and fluted mirrors in person, we welcome your inquiry."
            />

            <div className="flex flex-col gap-6 pt-4 border-t border-ink/10">
              {/* Showroom */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-oak flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-title text-ink">
                    SoHo Showroom
                  </span>
                  <p className="font-sans text-small text-ink/70">
                    {siteData.address.street}, {siteData.address.area}
                    <br />
                    {siteData.address.city}, {siteData.address.state} {siteData.address.zip}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-oak flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-title text-ink">Hours</span>
                  <p className="font-sans text-small text-ink/70">
                    {siteData.showroom.hours}
                    <br />
                    <span className="text-oak">{siteData.showroom.note}</span>
                  </p>
                </div>
              </div>

              {/* Atelier */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-oak flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-title text-ink">
                    Workshop Atelier
                  </span>
                  <p className="font-sans text-small text-ink/70">
                    Karen, Nairobi County, Kenya
                  </p>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-oak flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-serif text-title text-ink">Direct</span>
                  <a
                    href={`mailto:${siteData.email}`}
                    className="font-sans text-small text-ink/70 hover:text-oak transition-colors"
                  >
                    {siteData.email}
                  </a>
                  <a
                    href={`tel:${siteData.phone}`}
                    className="font-sans text-small text-ink/70 hover:text-oak transition-colors"
                  >
                    {siteData.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-sand p-8 sm:p-12 shadow-sm border border-ink/5">
              <h2 className="font-serif text-2xl text-ink mb-2">
                Inquiry Form
              </h2>
              <p className="font-sans text-small text-ink/70 mb-8">
                Please share details regarding your space, preferred edition, or custom dimension requirements.
              </p>

              {state?.success ? (
                <div className="rounded-2xl bg-cream p-8 text-center flex flex-col items-center gap-4 border border-oak/20 animate-in fade-in">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oak/10 text-oak">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-title text-ink">
                    Inquiry Dispatched
                  </h3>
                  <p className="font-sans text-body text-ink/75 max-w-md">
                    {state.message}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="flex flex-col gap-5">
                  <Input
                    label="Your Name *"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Amina Kimani"
                  />

                  <Input
                    label="Email Address *"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. amina@domain.com"
                  />

                  <Input
                    label="Piece or Custom Requirement"
                    id="piece"
                    name="piece"
                    placeholder="e.g. Mara Credenza in custom 220cm length"
                  />

                  <div className="flex flex-col gap-1.5 text-left">
                    <label
                      htmlFor="message"
                      className="font-sans text-small font-medium text-ink/80"
                    >
                      Message / Project Scope *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about the room, timber preferences, or delivery timeline..."
                      className="w-full rounded-xl bg-white px-5 py-3.5 font-sans text-body text-ink placeholder:text-ink/40 border border-ink/10 focus:border-oak focus:outline-none focus:ring-1 focus:ring-oak transition-shadow"
                    />
                  </div>

                  {state?.error && (
                    <p className="font-sans text-small text-red-600">
                      {state.error}
                    </p>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isPending}
                      className="w-full sm:w-auto"
                    >
                      {isPending ? "Sending Inquiry..." : "Dispatch Inquiry"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
