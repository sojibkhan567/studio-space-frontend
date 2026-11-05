import Link from "next/link"
import { ArrowRight, MapPin, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Studio } from "@/types/studio"
import { StudioImage } from "./studio-image"
import WishlistButton from "../wishlist/wishlist-button"

const MAX_AMENITIES = 2

export function StudioCard({ studio: s }: { studio: Studio }) {
  const extra = s.amenities.length - MAX_AMENITIES

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl py-0 shadow-sm transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden">
        <StudioImage images={s.images} alt={s.title} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

        <Badge className="absolute top-3 left-3 border-0 bg-background/90 text-foreground backdrop-blur">
          {s.category}
        </Badge>

        <WishlistButton
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          studioId={s.id}
        />

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
          <div className="rounded-lg bg-primary px-2.5 py-1 text-primary-foreground">
            <span className="text-lg font-extrabold">${s.rate}</span>
            <span className="ml-1 text-xs opacity-90">/ hr</span>
          </div>
          {s.rating !== undefined && (
            <div className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {s.rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{s.address}</span>
        </p>

        <h3 className="line-clamp-1 text-lg leading-tight font-bold transition-colors group-hover:text-primary">
          {s.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {s.description}
        </p>

        {s.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.amenities.slice(0, MAX_AMENITIES).map((a) => (
              <Badge
                key={a}
                variant="secondary"
                className="max-w-40 truncate bg-primary/10 text-xs font-normal text-primary hover:bg-primary/10"
              >
                {a}
              </Badge>
            ))}
            {extra > 0 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{extra}
              </Badge>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" /> Up to {s.capacity} creators
          </span>
          <span>Deposit: ${s.deposit}</span>
        </div>

        {s.host && (
          <p className="text-xs text-muted-foreground">
            Hosted by{" "}
            <span className="font-medium text-foreground">{s.host.name}</span>
          </p>
        )}

        <Button asChild className="h-10 w-full rounded-xl font-semibold">
          <Link href={`/studios/${s.id}`}>
            View Details <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
