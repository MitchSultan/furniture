"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AppShell({ children }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return children;
  }

  return (
    <CartProvider>
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}