"use client";

import { useActionState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { subscribeNewsletter } from "@/actions/newsletter";

/**
 * Editorial Newsletter Subscription form with server action.
 */
export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, {
    success: false,
    message: "",
    error: "",
  });

  return (
    <section className="w-full py-16 md:py-24" id="newsletter">
      <Container>
        <div className="w-full rounded-2xl bg-sand p-8 sm:p-14 lg:p-20 shadow-sm">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
            <Eyebrow color="oak">ATELIER DISPATCHES</Eyebrow>
            <h2 className="font-serif text-h2 text-ink">
              Letters from the workshop.
            </h2>
            <p className="font-sans text-body text-ink/75">
              Occasional essays on joinery, wood care, and preview access to small-batch seasonal releases. No sales urgency, only thoughts on pieces that settle in.
            </p>

            {state?.success ? (
              <div className="rounded-full bg-cream px-6 py-4 border border-oak/30 font-sans text-small text-oak font-medium animate-in fade-in">
                {state.message}
              </div>
            ) : (
              <form
                action={formAction}
                className="w-full flex flex-col sm:flex-row items-center gap-3 pt-2"
              >
                <div className="relative w-full flex-1">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-full bg-cream text-ink placeholder:text-ink/40 font-sans text-body border border-ink/10 focus:outline-none focus:ring-1 focus:ring-oak transition-shadow"
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  disabled={isPending}
                  className="w-full sm:w-auto px-8 py-4 whitespace-nowrap"
                >
                  {isPending ? "Dispatched..." : "Subscribe"}
                </Button>
              </form>
            )}

            {state?.error && (
              <p className="font-sans text-small text-red-600">
                {state.error}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
