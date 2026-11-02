"use client"

import { useState } from "react"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

function Placeholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-full place-items-center bg-linear-to-br from-primary/20 to-muted text-primary/60",
        className
      )}
    >
      <ImageOff className="size-6" />
    </div>
  )
}

export function StudioGallery({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<Set<number>>(new Set())
  const markFailed = (i: number) => setFailed((prev) => new Set(prev).add(i))

  const current = images[active]

  return (
    <section aria-label="Photo gallery" className="space-y-3">
      <div className="relative aspect-16/8 overflow-hidden rounded-3xl bg-muted shadow-lg">
        {!current || failed.has(active) ? (
          <Placeholder />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={active}
            src={current}
            alt={`${title}, photo ${active + 1}`}
            onError={() => markFailed(active)}
            className="size-full object-cover"
          />
        )}
        {images.length > 0 && (
          <span className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Photo {active + 1} of {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                i === active
                  ? "border-primary shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              {failed.has(i) ? (
                <Placeholder />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  onError={() => markFailed(i)}
                  className="size-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
