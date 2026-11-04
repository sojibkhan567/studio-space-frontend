import Link from "next/link"
import { Building2, CirclePlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Studio Space | My Studio Listing" }

import StudioListingTable from "@/components/my-list/listing-table"
import { getTokenFromServer } from "@/lib/getTokenFormServer"

export default async function MyListingsPage() {
  const token = await getTokenFromServer()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  const studios = Array.isArray(data) ? data : []

  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 gap-1.5 bg-primary/10 text-[11px] font-bold tracking-wide text-primary uppercase hover:bg-primary/10"
            >
              <Building2 className="size-3" /> Host workspace manager
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your published creative production spaces, rates, and
              listings
            </p>
          </div>
          <Button
            asChild
            className="h-10 shrink-0 rounded-xl px-5 font-semibold"
          >
            <Link href="/add-studio">
              <CirclePlus className="size-4" /> Add New Studio
            </Link>
          </Button>
        </header>

        <StudioListingTable studios={studios} />
      </div>
    </main>
  )
}
