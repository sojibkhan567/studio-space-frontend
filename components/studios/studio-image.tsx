"use client"

import { useState } from "react"
import { ImageOff } from "lucide-react"

// Tries each image in order; shows a neutral placeholder if all fail to load
export function StudioImage({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [index, setIndex] = useState(0)
  const src = images[index]

  if (!src) {
    return (
      <div className="grid size-full place-items-center bg-linear-to-br from-primary/20 to-muted text-primary/60">
        <ImageOff className="size-8" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setIndex((i) => i + 1)}
      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}
