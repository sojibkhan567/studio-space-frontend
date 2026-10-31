"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, MapPin, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type Studio = {
  slug: string
  title: string
  description: string
  category: string
  image: string
  location: string
  pricePerHour: number
  rating: number
  capacity: number
  deposit: number
}

export default function StudioCard({ studio }: { studio: Studio }) {
  const [saved, setSaved] = useState(false)

  return (
    <Card className="group gap-0 overflow-hidden rounded-3xl border bg-card p-0 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Image: full-bleed cover across the top of the card */}
      <div className="relative aspect-3/2 w-full overflow-hidden">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Bottom fade so price stays readable on any photo */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        <Badge className="absolute top-3 left-3 rounded-full border border-green-400/40 bg-green-950/70 px-3 py-1 text-xs font-semibold text-green-300 backdrop-blur hover:bg-green-950/70">
          {studio.category}
        </Badge>

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from favorites" : "Save to favorites"}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow backdrop-blur transition outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart
            className={cn(
              "h-[18px] w-[18px] transition",
              saved && "fill-red-500 text-red-500"
            )}
          />
        </button>

        <p className="absolute bottom-3 left-4 text-white">
          <span className="text-xl font-bold text-green-300">
            ${studio.pricePerHour}
          </span>
          <span className="ml-1 text-sm text-white/80">/ hr</span>
        </p>

        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star
            className="h-3.5 w-3.5 fill-green-400 text-green-400"
            aria-hidden="true"
          />
          <span>{studio.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Body */}
      <CardContent className="flex flex-col gap-3 p-5">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin
            className="h-4 w-4 shrink-0 text-green-500"
            aria-hidden="true"
          />
          <span className="truncate">{studio.location}</span>
        </p>

        <h3 className="truncate text-lg leading-tight font-bold tracking-tight">
          {studio.title}
        </h3>

        <p className="line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
          {studio.description}
        </p>

        <div className="mt-1 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            Up to {studio.capacity} creators
          </span>
          <span>Deposit: ${studio.deposit}</span>
        </div>

        <Button
          asChild
          size="lg"
          className="mt-1 h-12 w-full rounded-2xl bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
        >
          <Link href={`/studios/${studio.slug}`}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
