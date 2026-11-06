export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cart",
    },
    sitemap: "https://ziaglass.com/sitemap.xml",
  };
}
