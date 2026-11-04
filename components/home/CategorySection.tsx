// Put this file at: components/home/browse-categories.tsx
// Use it on your homepage:  <BrowseCategories />
// Needs: npm i lucide-react   (no extra shadcn components)

import Link from "next/link"
import { ArrowRight, Camera, Film, Mic, Music, Palette } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Category = {
  title: string
  description: string
  spaces: string
  slug: string // used for /studios?category=<slug>
  icon: LucideIcon
  tile: string // icon tile colors
}

// Demo data: replace with your own (e.g. counts from the API)
const CATEGORIES: Category[] = [
  {
    title: "Photo Studios",
    description:
      "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    spaces: "24+ Spaces",
    slug: "photo-studio",
    icon: Camera,
    tile: "bg-sky-50 text-sky-500",
  },
  {
    title: "Sound Stages",
    description:
      "Acoustic blackboxes, green screens, camlock power, and drive-in access.",
    spaces: "16+ Spaces",
    slug: "film-stage",
    icon: Film,
    tile: "bg-violet-50 text-violet-500",
  },
  {
    title: "Podcast Rooms",
    description:
      "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    spaces: "19+ Spaces",
    slug: "podcast-room",
    icon: Mic,
    tile: "bg-primary/10 text-primary",
  },
  {
    title: "Music Suites",
    description:
      "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    spaces: "14+ Spaces",
    slug: "music-suite",
    icon: Music,
    tile: "bg-amber-50 text-amber-500",
  },
  {
    title: "Art & Ceramics Workshops",
    description:
      "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    spaces: "11+ Spaces",
    slug: "art-workshop",
    icon: Palette,
    tile: "bg-rose-50 text-rose-500",
  },
]

function BrowseCategories() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-primary uppercase">
              Curated production categories
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Browse by Creative Discipline
            </h2>
          </div>

          <Link
            href="/studios"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Explore All Workspaces
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CategoryCard({ category: c }: { category: Category }) {
  const Icon = c.icon

  return (
    <Link
      href={`/studios?category=${c.slug}`}
      className="group flex h-full flex-col rounded-2xl border bg-background p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className={`grid size-11 place-items-center rounded-xl ${c.tile}`}>
        <Icon className="size-5" />
      </div>

      <h3 className="mt-5 text-base font-bold transition-colors group-hover:text-primary">
        {c.title}
      </h3>
      <p className="mt-1.5 mb-1.5 text-xs leading-relaxed text-muted-foreground">
        {c.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>{c.spaces}</span>
        <span className="flex size-6 items-center justify-center rounded-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

export default BrowseCategories
