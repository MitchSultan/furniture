import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <div className="w-full pt-36 pb-32 text-center">
      <Container>
        <div className="max-w-md mx-auto flex flex-col items-center gap-6 py-16">
          <Eyebrow>404 — PAGE UNFOUND</Eyebrow>
          <h1 className="font-serif text-h2 text-ink">
            A quiet space with no pieces.
          </h1>
          <p className="font-sans text-body text-ink/70">
            The edition or archive you were searching for has settled elsewhere, or the link may have shifted.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center">
            <Button href="/" variant="primary" size="md">
              Return Home
            </Button>
            <Button href="/shop" variant="secondary" size="md">
              Browse the Shop
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
