export function postSlug(id: string) {
  const normalized = id.replace(/\\/g, "/").replace(/\.(md|mdx)$/i, "");
  return normalized.endsWith("/index") ? normalized.slice(0, -6) : normalized;
}
