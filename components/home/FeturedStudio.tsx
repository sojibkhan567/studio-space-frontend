import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StudioCard } from "../studios/studio-card"
import { getStudios } from "@/lib/studios"
import { Button } from "../ui/button"
import EmptyState from "../common/empty-states"

const FeturedStudio = async () => {
  const studios = await getStudios()
  return (
    <section className="bg-gray-100/90 py-20 sm:py-25 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-10">
          <div className="max-w-xl">
            <h1 className="mb-2 font-bold sm:text-xl md:text-2xl lg:text-3xl">
              Featured Creative Workspaces
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hand-Insecpted production facilities and studio suties top rated
              by professional directors, producres and audio engineers.
            </p>
          </div>
          <Link
            href={"/studios"}
            className="flex items-center gap-2 text-sm font-medium text-green-600"
          >
            View All Workspaces
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {studios.length === 0 ? (
          <EmptyState btnTitle="Add New Studio" href="/add-studio" />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.slice(0, 6).map((studio, i) => (
                <StudioCard key={i} studio={studio} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-green-500 px-7 text-base font-semibold text-black shadow-lg shadow-green-500/25 hover:bg-green-400"
              >
                <Link href="/studios">
                  Exploring All Workspaces
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default FeturedStudio
