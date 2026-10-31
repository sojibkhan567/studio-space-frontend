// components/HowItWorks.tsx  (Tailwind + shadcn/ui)
// Setup: npx shadcn@latest add card button   |   lucide-react ships with shadcn

import Link from "next/link"
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  Search,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps: {
  title: string
  text: string
  icon: LucideIcon
  tile: string
}[] = [
  {
    title: "Discover Spaces",
    text: "Filter verified cyc walls, podcast lounges, soundstages, and mixing suites by location, gear inventory, and creator reviews.",
    icon: Search,
    tile: "bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
  },
  {
    title: "Select Shoot Hours",
    text: "Inspect live calendar availability, choose precise hourly blocks, and review transparent breakdown rates with zero surprise fees.",
    icon: CalendarClock,
    tile: "bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300",
  },
  {
    title: "Book Instantly",
    text: "Lock in your reservation with double-booking collision prevention, instant host confirmation, and downloadable invoice vouchers.",
    icon: Zap,
    tile: "bg-emerald-100 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
  },
  {
    title: "Create & Produce",
    text: "Arrive at the stage with verified access codes, plug into ready-calibrated equipment grids, and bring your vision to life.",
    icon: Sparkles,
    tile: "bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300",
  },
]

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      className="bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-wider text-green-500 uppercase">
            Frictionless Booking
          </p>
          <h2
            id="how-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            How Studio Space Works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
            Four simple steps from pre-production concept to rolling camera in
            world-class creative facilities.
          </p>
        </div>

        {/* Steps */}
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, text, icon: Icon, tile }, i) => (
            <li key={title} className="relative">
              <Card className="h-full rounded-2xl border bg-card/60 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className={`grid h-12 w-12 place-items-center rounded-xl ${tile}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-2xl font-extrabold text-muted-foreground/25 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </CardContent>
              </Card>

              {/* Connector arrow between cards (desktop only) */}
              {i < steps.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="absolute top-1/2 -right-5 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/40 lg:block"
                />
              )}
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-green-500 px-7 text-base font-semibold text-black shadow-lg shadow-green-500/25 hover:bg-green-400"
          >
            <Link href="/studios">
              Start Exploring Workspaces
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
