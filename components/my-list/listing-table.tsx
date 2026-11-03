"use client"
import { Listing } from "@/app/types/studio"
import { useState } from "react"
import { MapPin, ExternalLink, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CirclePlus,
  ImageOff,
  Loader2,
  SquarePen,
  TriangleAlert,
  Warehouse,
} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card } from "../ui/card"
import toast from "react-hot-toast"

type ListingsProps = {
  studios: Listing[]
}

const StudioListingTable = ({ studios }: ListingsProps) => {
  const [listings, setListings] = useState<Listing[] | null>(studios)
  const [actionError, setActionError] = useState<string | null>(null)
  const [toDelete, setToDelete] = useState<Listing | null>(null)
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async () => {
    if (!toDelete) return
    setDeleting(true)
    setActionError(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${toDelete.id}`,
        {
          method: "DELETE",
        }
      )
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        toast.error(json?.message ?? "Could not delete this studio.")
      }
      setListings((prev) => prev?.filter((l) => l.id !== toDelete.id) ?? prev)
    } catch (e) {
      setActionError(
        e instanceof Error ? e.message : "Could not delete this studio."
      )
    } finally {
      setDeleting(false)
      setToDelete(null)
      toast.success("Studio have been delete successfully")
    }
  }
  return (
    <>
      {actionError && (
        <p
          role="alert"
          className="mt-6 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          <TriangleAlert className="size-4 shrink-0" /> {actionError}
        </p>
      )}

      <div className="mt-8">
        {listings === null ? (
          <LoadingSkeleton />
        ) : listings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop table */}
            <Card className="hidden overflow-hidden rounded-2xl py-0 shadow-sm md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    {[
                      "Studio Space",
                      "Category",
                      "Hourly Rate",
                      "Deposit",
                      "Capacity",
                    ].map((h) => (
                      <TableHead
                        key={h}
                        className="h-11 px-4 text-[11px] font-bold tracking-wider text-muted-foreground uppercase first:pl-6"
                      >
                        {h}
                      </TableHead>
                    ))}
                    <TableHead className="h-11 px-4 pr-6 text-right text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((l) => (
                    <TableRow key={l.id} className="hover:bg-primary/5">
                      <TableCell className="py-3 pl-6">
                        <StudioCell listing={l} />
                      </TableCell>
                      <TableCell className="px-4">
                        <Badge
                          variant="secondary"
                          className="rounded-md font-medium"
                        >
                          {l.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 font-bold text-primary">
                        ${l.rate}/hr
                      </TableCell>
                      <TableCell className="px-4 text-sm">
                        ${l.deposit}
                      </TableCell>
                      <TableCell className="px-4 text-sm">
                        {l.capacity} people
                      </TableCell>
                      <TableCell className="px-4 pr-6">
                        <div className="flex justify-end">
                          <RowActions
                            listing={l}
                            onDelete={() => setToDelete(l)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {listings.map((l) => (
                <Card key={l.id} className="gap-3 rounded-2xl p-4 shadow-sm">
                  <StudioCell listing={l} />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="rounded-md font-medium"
                    >
                      {l.category}
                    </Badge>
                    <span className="font-bold text-primary">${l.rate}/hr</span>
                    <span>Deposit ${l.deposit}</span>
                    <span>{l.capacity} people</span>
                  </div>
                  <div className="flex justify-end border-t pt-3">
                    <RowActions listing={l} onDelete={() => setToDelete(l)} />
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <AlertDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && !deleting && setToDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this studio?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{toDelete?.title}&rdquo; will be removed from the
              marketplace. This can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Keep studio
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault() // stay open until the request finishes
                confirmDelete()
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="size-4 animate-spin" />}
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

/* ------------------------------ Pieces ------------------------------ */

function Thumb({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
      {!src || failed ? (
        <div className="grid size-full place-items-center bg-linear-to-br from-primary/20 to-muted text-primary/60">
          <ImageOff className="size-4" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  )
}

function StudioCell({
  listing: l,
}: {
  listing: Pick<Listing, "title" | "address"> & { images?: string[] }
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Thumb src={l.images?.[0]} alt={l.title} />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{l.title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0 text-primary" />
          <span className="truncate">{l.address}</span>
        </p>
      </div>
    </div>
  )
}

function RowActions({
  listing: l,
  onDelete,
}: {
  listing: Listing
  onDelete: () => void
}) {
  const base = "size-8 rounded-lg"
  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="ghost" size="icon" className={base}>
        <Link
          href={`/studios/${l.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${l.title} (opens in a new tab)`}
          title="View public page"
        >
          <ExternalLink className="size-4" />
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={`${base} text-primary hover:bg-primary/10 hover:text-primary`}
      >
        <Link
          href={`/host/studios/${l.id}/edit`}
          aria-label={`Edit ${l.title}`}
          title="Edit listing"
        >
          <SquarePen className="size-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        aria-label={`Delete ${l.title}`}
        title="Delete listing"
        className={`${base} text-destructive hover:bg-destructive/10 hover:text-destructive`}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}

/* --------------------------- Loading / empty / error --------------------------- */

function LoadingSkeleton() {
  return (
    <Card
      className="animate-pulse gap-0 overflow-hidden rounded-2xl py-0"
      aria-busy="true"
    >
      <div className="h-11 bg-muted/60" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3 border-t p-4">
          <div className="size-12 rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/4 rounded bg-muted" />
          </div>
        </div>
      ))}
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-background py-16 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
        <Warehouse className="size-7" />
      </div>
      <h2 className="text-lg font-bold">No studios listed yet</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Publish your first creative space and start receiving booking requests.
      </p>
      <Button asChild className="mt-2 rounded-xl">
        <Link href="/add-studio">
          <CirclePlus className="size-4" /> Add New Studio
        </Link>
      </Button>
    </div>
  )
}

export default StudioListingTable
