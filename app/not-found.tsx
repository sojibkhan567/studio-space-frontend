import Link from "next/link"
import {
  ArrowLeft,
  Camera,
  Clapperboard,
  Compass,
  Mic,
  Music,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Page not found | Studio Space" }

const POPULAR = [
  { label: "Photo Studio", slug: "photo-studio", icon: Camera },
  { label: "Film Stage", slug: "film-stage", icon: Clapperboard },
  { label: "Podcast Room", slug: "podcast-room", icon: Mic },
  { label: "Music Suite", slug: "music-suite", icon: Music },
  { label: "Art Workshop", slug: "art-workshop", icon: Palette },
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/30 px-4 py-16">
      {/* Soft green glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-160 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-40 size-105 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative w-full max-w-xl text-center">
        {/* 4 [clapperboard] 4 */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-5"
          aria-label="Error 404"
        >
          <span className="text-8xl font-black tracking-tighter sm:text-9xl">
            4
          </span>
          <div className="grid size-24 rotate-6 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/30 sm:size-28">
            <Clapperboard className="size-12 sm:size-14" />
          </div>
          <span className="text-8xl font-black tracking-tighter sm:text-9xl">
            4
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Cut! This scene wasn&apos;t found.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or the
          studio is no longer listed. Let&apos;s get you back on set.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-xl px-6 font-semibold"
          >
            <Link href="/studios">
              <Compass className="size-4" /> Explore studios
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-xl px-6 font-semibold"
          >
            <Link href="/">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </Button>
        </div>

        {/* Popular categories */}
        <div className="mt-12">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Or browse by category
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {POPULAR.map(({ label, slug, icon: Icon }) => (
              <Link
                key={slug}
                href={`/studios?category=${slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
