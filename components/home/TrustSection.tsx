// components/TrustSection.tsx  (Tailwind + shadcn/ui, green primary, light + dark)
// Setup: npx shadcn@latest add button card

import Link from "next/link"
import {
  Aperture,
  ArrowRight,
  Headset,
  Heart,
  ShieldCheck,
  UserCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const protections: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "$1,000,000 Host Liability Protection",
    text: "Comprehensive property and stage damage coverage backed by top-tier creative insurance underwriters for every booking.",
    icon: ShieldCheck,
  },
  {
    title: "Identity & Professional Verification",
    text: "Every studio host and booking creator undergoes rigorous ID and portfolio verification to ensure professional workspace safety.",
    icon: UserCheck,
  },
  {
    title: "Production Equipment Safeguard",
    text: "High-value cinema lenses, vintage microphones, and lighting grids are protected with itemized check-in/out protocols.",
    icon: Wrench,
  },
  {
    title: "24/7 Dedicated Production Concierge",
    text: "Direct on-call dispatch assistance for technical access, power hookups, acoustic calibration, and emergency reschedules.",
    icon: Headset,
  },
]

const stats = [
  { value: "$1M", label: "Liability cover" },
  { value: "24/7", label: "Live concierge" },
  { value: "100%", label: "ID-verified users" },
]

const guarantees: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Host Guarantee",
    text: "Comprehensive liability & gear protection",
    icon: ShieldCheck,
  },
  {
    title: "Verified Workspaces",
    text: "Inspected acoustics, power, & gear",
    icon: Aperture,
  },
  {
    title: "Creator First",
    text: "Zero hidden fees, transparent booking",
    icon: Heart,
  },
]

export default function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative overflow-hidden bg-muted/30"
    >
      {/* Soft green glow behind the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-10">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Trust, safety &amp; peace of mind
          </span>
          <h2
            id="trust-heading"
            className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.6rem]"
          >
            Built on Uncompromising Protection for Both{" "}
            <span className="text-primary">Hosts &amp; Creators</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            We understand creative production is unpredictable. StudioSpace
            provides enterprise-grade safety umbrellas, verified host
            guarantees, and around-the-clock technical support so you can focus
            entirely on craft.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl px-6 font-semibold">
              <Link href="/host">
                Become a Verified Host
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl px-6 font-semibold"
            >
              <Link href="/studios">Browse Protected Spaces</Link>
            </Button>
          </div>

          {/* Quick stats */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-foreground">
                  {s.value}
                </dd>
                <p
                  className="mt-0.5 text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: staggered cards, first one featured */}
        <ul className="grid gap-5 sm:grid-cols-2 sm:pb-8">
          {protections.map(({ title, text, icon: Icon }, i) => {
            const featured = i === 0
            return (
              <li key={title} className={cn(i % 2 === 1 && "sm:translate-y-8")}>
                <Card
                  className={cn(
                    "group h-full rounded-2xl shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg",
                    featured
                      ? "border-primary bg-primary text-primary-foreground shadow-primary/20"
                      : "border bg-card hover:border-primary/50"
                  )}
                >
                  <CardContent className="p-6">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl transition-colors",
                        featured
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3
                      className={cn(
                        "mt-5 text-base leading-snug font-bold tracking-tight",
                        !featured && "text-foreground"
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2.5 text-sm leading-relaxed",
                        featured
                          ? "text-primary-foreground/85"
                          : "text-muted-foreground"
                      )}
                    >
                      {text}
                    </p>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Trust strip */}
      <div className="relative border-t bg-background/60">
        <ul className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
          {guarantees.map(({ title, text, icon: Icon }) => (
            <li key={title} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
