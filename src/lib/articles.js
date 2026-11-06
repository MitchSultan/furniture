import articlesData from "@/data/articles.json";

export async function getAllArticles() {
  return articlesData;
}

export async function getArticleBySlug(slug) {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}
