"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Plus,
  MapPin,
  ExternalLink,
  Pencil,
  Trash2,
  Building2,
  Video,
  Music2,
  Camera,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"

type Studio = {
  id: number
  title: string
  description: string
  location: string
  category: string
  hourlyRate: number
  deposit: number
  capacity: number
  icon: "video" | "music" | "camera"
}

const initialStudios: Studio[] = [
  {
    id: 1,
    title: "Neon Vault 4K Cinema Soundstage & Edit Bay",
    description: "Professional cinematic production studio",
    location: "Arts District, Downtown Los Angeles, CA",
    category: "Film Stage",
    hourlyRate: 135,
    deposit: 150,
    capacity: 30,
    icon: "video",
  },
  {
    id: 2,
    title: "Et eaque iusto velit",
    description: "In dolore dolore min",
    location: "New York, United States",
    category: "Music Suite",
    hourlyRate: 42,
    deposit: 0,
    capacity: 183,
    icon: "music",
  },
  {
    id: 3,
    title: "Creative Photography Studio",
    description: "Modern photography and content creation space",
    location: "Brooklyn, New York",
    category: "Photo Studio",
    hourlyRate: 85,
    deposit: 100,
    capacity: 15,
    icon: "camera",
  },
]

const studioIcons = {
  video: Video,
  music: Music2,
  camera: Camera,
}

export default function StudioListingsPage() {
  const [studios, setStudios] = useState(initialStudios)

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this studio?"
    )

    if (confirmed) {
      setStudios((prev) => prev.filter((studio) => studio.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/10"
            >
              <Building2 className="h-3.5 w-3.5" />
              HOST WORKSPACE MANAGER
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Studio Listings
            </h1>

            <p className="text-sm text-muted-foreground">
              Manage your published creative production spaces, rates, and
              listings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              className="gap-2 rounded-lg bg-primary font-semibold shadow-sm hover:bg-primary/90"
            >
              <Link href="/add-studio">
                <Plus className="h-4 w-4" />
                Add New Studio
              </Link>
            </Button>
          </div>
        </div>

        {/* Studio Table */}
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-12 min-w-[280px] pl-5 text-xs font-semibold tracking-wide uppercase">
                  Studio Space
                </TableHead>

                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Category
                </TableHead>

                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Hourly Rate
                </TableHead>

                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Deposit
                </TableHead>

                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Capacity
                </TableHead>

                <TableHead className="pr-5 text-right text-xs font-semibold tracking-wide uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {studios.map((studio) => {
                const Icon = studioIcons[studio.icon]

                return (
                  <TableRow
                    key={studio.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Studio details */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex min-w-[260px] items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 space-y-1">
                          <p className="truncate text-sm font-semibold">
                            {studio.title}
                          </p>

                          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0 text-primary" />
                            {studio.location}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-3 font-medium whitespace-nowrap"
                      >
                        {studio.category}
                      </Badge>
                    </TableCell>

                    {/* Hourly rate */}
                    <TableCell>
                      <span className="text-sm font-bold whitespace-nowrap text-primary">
                        ${studio.hourlyRate}/hr
                      </span>
                    </TableCell>

                    {/* Deposit */}
                    <TableCell className="text-sm tabular-nums">
                      ${studio.deposit}
                    </TableCell>

                    {/* Capacity */}
                    <TableCell className="text-sm whitespace-nowrap">
                      {studio.capacity} people
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Link
                            href={`/studios/${studio.id}`}
                            aria-label="View studio"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          <Link
                            href={`/studios/${studio.id}/edit`}
                            aria-label="Edit studio"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(studio.id)}
                          aria-label="Delete studio"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

              {studios.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                      <p className="font-medium">No studios found</p>
                      <p className="text-sm text-muted-foreground">
                        Add your first studio listing to get started.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {studios.length}
            </span>{" "}
            studio listings
          </p>

          <p>Manage and organize your creative spaces.</p>
        </div>
      </div>
    </main>
  )
}
