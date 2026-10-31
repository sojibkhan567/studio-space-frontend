// components/CategoryCards.tsx  (shadcn/ui + Tailwind)
// Setup: npx shadcn@latest add card   |   npm i lucide-react (already included by shadcn)
// Light/dark comes from your shadcn theme tokens, so no `dark:` classes are needed.

import Link from "next/link"
import {
  Camera,
  Music,
  Mic,
  PersonStanding,
  Palette,
  PartyPopper,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const categories: { slug: string; name: string; icon: LucideIcon }[] = [
  { slug: "photo-film", name: "Photo and film", icon: Camera },
  { slug: "music", name: "Music and recording", icon: Music },
  { slug: "podcast", name: "Podcast and voice", icon: Mic },
  { slug: "dance", name: "Dance and movement", icon: PersonStanding },
  { slug: "art-craft", name: "Art and craft", icon: Palette },
  { slug: "events", name: "Events and pop-ups", icon: PartyPopper },
]

export default function CategorySection() {
  return (
    <section
      aria-label="Studio categories"
      className="bg-background py-20 sm:py-25"
    >
      <div className="flex items-center justify-center pb-10">
        <div className="text-center">
          <h1 className="pb-2 text-3xl font-bold">Category</h1>
          <p>Explore your&apos;s best studios with multiple categories.</p>
        </div>
      </div>
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4 sm:px-10 lg:grid-cols-6 lg:px-16">
        {categories.map(({ slug, name, icon: Icon }) => (
          <li key={slug}>
            <Link
              href={`/studios?category=${slug}`}
              className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-lg">
                <CardContent className="flex flex-col items-center gap-4 px-4 py-7 text-center">
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[15px] leading-snug font-semibold">
                    {name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
