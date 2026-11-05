import { getStudios } from "@/lib/studios"
import { StudioExplorer } from "@/components/studios/studio-explorer"
import EmptyState from "@/components/common/empty-states"

export const metadata = { title: "Studio Space | Explore Creative Studios" }

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { category } = await searchParams

  const studios = await getStudios()

  return (
    <>
      {studios.length === 0 ? (
        <main className="bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-15 sm:px-6">
            <EmptyState btnTitle="Add New Studio" href="/add-studio" />
          </div>
        </main>
      ) : (
        <StudioExplorer
          studios={studios}
          initialCategory={Array.isArray(category) ? category[0] : category}
        />
      )}
    </>
  )
}
