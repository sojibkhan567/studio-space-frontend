// "Podcast Room" -> "podcast room", "podcast-room" -> "podcast room"
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()

// "Podcast Room" -> "podcast-room" (used for the URL)
export const toSlug = (s: string) => norm(s).replace(/ /g, "-")

// Turns a URL value like "podcast" into a real category from your data
// ("Podcast Room"). Returns "All" when nothing matches.
export function resolveCategory(
  param: string | undefined | null,
  categories: string[]
): string {
  if (!param) return "All"
  const p = norm(param)
  if (!p || p === "all") return "All"

  return (
    categories.find((c) => norm(c) === p) ?? // exact: "podcast-room"
    categories.find((c) => norm(c).includes(p)) ?? // partial: "podcast"
    categories.find((c) => p.includes(norm(c))) ??
    "All"
  )
}
