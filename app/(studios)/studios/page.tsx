import { getStudios } from "@/lib/studios"
import { StudioExplorer } from "@/components/studios/studio-explorer"

export const metadata = { title: "Studio Space | Explore Creative Studios" }

// Next.js 15/16: searchParams is a Promise
export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { category } = await searchParams
  const studios = await getStudios()

  return (
    <StudioExplorer
      studios={studios}
      initialCategory={Array.isArray(category) ? category[0] : category}
    />
  )
}
