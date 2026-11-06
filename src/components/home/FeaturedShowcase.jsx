import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { formatPrice } from "@/lib/format";

/**
 * Featured Piece Showcase: The Olerai Lounge Chair & Ottoman.
 * 6-image horizontal gallery with 4:5 crops.
 */
export default function FeaturedShowcase({ product }) {
  if (!product) return null;

  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBDILwmdb5DH3uivDYnbayzGCymZqBgTJ69QCFVozPS_4ugvQs66dZyfL55Aw_7D8mPqumP7vmeXFUNTcgTUrTnRIFHrZUjSA-RaieGKvvm0cKqLyUQvIHw4rjQFkVNREEltdE8kzsAcCObabey7RzhC0TQmhudRn6Sl52ZBB6wirgMDYCGz6LOVfqMmu40IDhQALNXAAQ-nsn7dWKD6bxOQeKOORxqg_c7SRtAqC8",
      label: "01 — Profile stance",
      alt: "Olerai lounge chair crafted in hand-planed olivewood with oatmeal Belgian linen",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBceuumwnlPSej2j8O0OYLQNspiSOIVsYryA_E82ylAT8kg55cCZRI9eHViSNvuKk3TBM3fr3Qff5PIeg-tYgx8u4p4JBqmhP7C560BInmbDiEdx4HAcpT66WWqxG8Sa-5uHl-Wk1YUEIjC87g3mdq4kHy_mxEZQhr8GYZvgS6bKar5JFRsuUnWYWDo5bjXaHRKt9PXt909-ejJNZ-ruhpIJdilXUFfz8McMcEUxqOh",
      label: "02 — Mortise & tenon",
      alt: "Hand-chiselled mortise and tenon wood joinery on olivewood lounge chair armrest",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyq3dEyXMbwDPuHU0FZPtALZxAkhsC3tW7EFFCdcDze2v06mXaFdCR_Hpmj1Now9J8PVlFnuVurqRNv42Rd2e1yXQqUnwAvDI2JOxinQ514qY_sd3fdDVymW16kLL4Iy3arujpWuIDOgecRQwIKjJSsbWU_BLVOczpbvmTcrieTXDmRku2CAdjgtrOi8nXWui5r5Yv2BG_LBFvJm1khMjMXgyF6AC-lCQ1WbeleZHf",
      label: "03 — Olivewood grain",
      alt: "Organic marbled East African olivewood grain with satin wax finish",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-22xYrt_yDvfxhRh-nkwcCMj8KmQnMaR0QanAXkgo2dFfEtzVLTB_xFnILVnRLsUOoPdSd_UwJnz2kUHFYcR-heWVSVPEH-VY6K8hCXxLL7rw_qDgAl-sKTac-BOlI5ddhDc6nCh-WaGDf0rU4W4BdTZpJEMN0Q4wrtQkk7mv9rVz_zCMg90rOWe3Aod8N4XKx-7ny2nGHAJFECbhiPmh7Itor4ebCgvyA7qBjvOw",
      label: "04 — Ottoman pairing",
      alt: "Matching Olerai ottoman cushion stitched with heavy linen thread on dark smoked oak frame",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3N2hD4zp2n4WCCe8NfoFfnqvVPWaNS8pZ9SqoUVAeR7JSVxP4lIuF8o3PF9gL1LzI3p4CxT6ddhb2mQLuxEMaqWMIi1s_62NEzkJR9m3AkEYMmBCmnrHVf8B8dx5V2zKPlVX3jIn5WtkkbxmA64cXABtS15OGlZ21RJUtLH8RfnDtroRKErHG1pI3_OLvaLnCiJcD6NhnU9m9LME3q2ae-5RjsEj7EK98KAdh66yS",
      label: "05 — Rear spine structure",
      alt: "Rear perspective showing steam bent ergonomic spine rail with custom cast unlacquered brass screw plugs",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5PEYa4lh_pl2lSUPOOrODmoO2OeO3AaGBkFsfOtLqMFyRPxm0MfbuXif_ZlL1b4YE6J0IreJnFW7sFBy68MovdM-jTY6J3zt0hfyCqdORLxi3DzsTkNu8AOrPIJPDmZzR_CO19s6snu_6p1tFj2YjKnoG57clm1WPU6JUCxXQnI5ghP319Ffeb-DSNUU_GCJKFOgMasqRc-3E5XbzoIAAEjLMMvzWkTTUeHGVwYTL",
      label: "06 — In residence",
      alt: "Olerai chair styled beside a low fluted glass partition with ceramic vase",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Header with specs and direct view button */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-ink/10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <Eyebrow>Featured Piece No. 02</Eyebrow>
              <h2 className="font-serif text-h2 text-ink">
                {product.name}
              </h2>
              <p className="font-sans text-body text-ink/70">
                {product.dimensions} · {product.material}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="font-serif text-2xl text-ink">
                {formatPrice(product.price, "KES")}{" "}
                <span className="font-sans text-small text-ink/60">
                  / ${product.priceUSD || 725} complete
                </span>
              </div>
              <Button href={`/products/${product.slug}`} size="md">
                <span>View piece</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* 6-Image Horizontal Gallery (4:5 Crops) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-sand shadow-sm group block"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <span className="font-sans text-small text-ink/60">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
