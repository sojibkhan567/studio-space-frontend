import Link from "next/link"
import {
  Aperture,
  ArrowRight,
  Heart,
  type LucideIcon,
  Mail,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const explore = [
  { label: "All Workspaces", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Host Your Studio", href: "/host" },
  { label: "Booking History", href: "/bookings" },
]

const categories = [
  { label: "Photo Studios", href: "/studios?category=photo-film" },
  { label: "Cinema & Sound Stages", href: "/studios?category=film-stage" },
  { label: "Podcast Lounges", href: "/studios?category=podcast" },
  { label: "Music & Dolby Suites", href: "/studios?category=music" },
  { label: "Art & Ceramic Workshops", href: "/studios?category=art-craft" },
]

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
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

const socialCls =
  "grid h-9 w-9 place-items-center rounded-lg border bg-background text-muted-foreground outline-none transition hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"

const linkCls =
  "text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary outline-none"

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
      {children}
    </h3>
  )
}

export default function Footer() {
  return (
    <>
      {/* Trust strip */}
      <div className="relative border-t bg-background/60">
        <ul className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
          {guarantees.map(({ title, text, icon: Icon }) => (
            <li key={title} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* Brand + newsletter */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                  <Aperture className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-lg font-extrabold tracking-tight">
                  Studio<span className="text-primary">Space</span>
                </span>
              </Link>
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
                The premier peer-to-peer workspace sharing marketplace
                connecting filmmakers, photographers, musicians, and creators
                with world-class production facilities.
              </p>

              <form
                action="/api/subscribe"
                method="post"
                className="mt-5 max-w-sm"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail
                      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="footer-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email for updates"
                      className="h-10 rounded-lg pl-9"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <ColumnTitle>Explore</ColumnTitle>
              <ul className="mt-4 space-y-3">
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Categories */}
            <nav aria-label="Categories">
              <ColumnTitle>Categories</ColumnTitle>
              <ul className="mt-4 space-y-3">
                {categories.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <ColumnTitle>Connect With Us</ColumnTitle>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className={socialCls}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={socialCls}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className={socialCls}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Need assistance? Email support:
                <br />
                <a
                  href="mailto:support@studiospace.io"
                  className="font-semibold text-foreground hover:text-primary"
                >
                  support@studiospace.io
                </a>
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Studio Space. All rights reserved.
            </p>
            <ul className="flex gap-5">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
