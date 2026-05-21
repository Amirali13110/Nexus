// utils/slugify.ts
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()

    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

    .replace(/-+/g, "-")

    .replace(/^-|-$/g, "");
}
