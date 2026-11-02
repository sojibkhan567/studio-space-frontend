import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getStudioById } from "@/lib/studios"
import { StudioDetailHeader } from "@/components/studio-details/studio-detail-header"
import { StudioGallery } from "@/components/studio-details/studio-gallery"
import { StudioStats } from "@/components/studio-details/studio-stats"
import { StudioOverview } from "@/components/studio-details/studio-overview"
import { StudioAmenities } from "@/components/studio-details/studio-amenities"
import { StudioHost } from "@/components/studio-details/studio-host"
import { BookingCard } from "@/components/studio-details/booking-card"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const studio = await getStudioById(id)
  return {
    title: studio ? `${studio.title} | Studio Space` : "Studio not found",
  }
}

export default async function StudioDetailsPage({ params }: Props) {
  const { id } = await params
  const studio = await getStudioById(id)
  if (!studio) notFound()

  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <Link
          href="/studios"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to studios
        </Link>

        <StudioDetailHeader studio={studio} />
        <StudioGallery images={studio.images} title={studio.title} />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <StudioStats studio={studio} />
            <StudioOverview description={studio.description} />
            <StudioAmenities amenities={studio.amenities} />
            {studio.host && <StudioHost name={studio.host.name} />}
          </div>

          <aside className="lg:sticky lg:top-24">
            <BookingCard studio={studio} />
          </aside>
        </div>
      </div>
    </main>
  )
}
