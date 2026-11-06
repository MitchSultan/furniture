import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";

export default async function sitemap() {
  const baseUrl = "https://ziaglass.com";

  // Static routes
  const routes = [
    "",
    "/shop",
    "/journal",
    "/contact",
    "/cart",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const products = await getAllProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic article routes
  const articles = await getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...articleRoutes];
}
