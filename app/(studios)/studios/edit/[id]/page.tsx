"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  ImageIcon,
  User,
  Mail,
  Plus,
  X,
  Save,
  Loader2,
  TriangleAlert,
  SearchX,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import toast from "react-hot-toast"
import { getTokenFromClient } from "@/lib/getTokenFormClient"

const BACKEND = process.env.NEXT_PUBLIC_API_URL
const METHOD = "PATCH"
const MAX_IMAGES = 4

const CATEGORIES = [
  "Photo Studio",
  "Recording Studio",
  "Podcast Studio",
  "Film Stage",
  "Art & Ceramics Studio",
]

const AMENITIES = [
  "Cyclorama Wall",
  "4K DMX Lighting Grid",
  "Soundproof Vocal Booth",
  "Acoustic Treatment Slat Walls",
  "Neve / SSL Preamps",
  "Shure SM7B Multi-Mic Setup",
  "Drive-In Loading Bay",
  "Hair & Makeup Vanity Station",
  "Client Lounge with Espresso Bar",
  "High-Speed Gigabit WiFi",
  "Green Screen / Blue Screen Drops",
  "Heavy Rigging Trusses (2-Ton)",
  "Electric Ceramic Kiln & Wheels",
  "Industrial Screen Printing Press",
]

type Host = { name?: string; email?: string }
type LoadState = "loading" | "ready" | "notfound" | "error"

// Input with a leading icon
function IconInput({
  icon: Icon,
  className = "",
  ...props
}: React.ComponentProps<typeof Input> & { icon: React.ElementType }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={`h-11 bg-muted/40 pl-9 focus-visible:ring-green-600 ${className}`}
        {...props}
      />
    </div>
  )
}

export default function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [state, setState] = useState<LoadState>("loading")
  const [reloadKey, setReloadKey] = useState(0)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: "",
    category: "",
    capacity: "",
    rate: "",
    deposit: "",
    address: "",
    imageUrl: "",
    description: "",
  })
  const [amenities, setAmenities] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const [host, setHost] = useState<Host | null>(null) // original owner, read-only

  // 1) Fetch the studio by id and fill the inputs
  useEffect(() => {
    let cancelled = false
    setState("loading")

    async function load() {
      try {
        const res = await fetch(`${BACKEND}/studios/${id}`)
        if (res.status === 404 || res.status === 400) {
          if (!cancelled) setState("notfound")
          return
        }
        if (!res.ok) throw new Error("Failed to load")

        const json = await res.json()
        const s = json?.data ?? json?.studio ?? json
        if (!s?.title) {
          if (!cancelled) setState("notfound")
          return
        }
        if (cancelled) return

        setForm({
          title: s.title ?? "",
          category: s.category ?? "",
          capacity: String(s.capacity ?? ""),
          rate: String(s.rate ?? ""),
          deposit: String(s.deposit ?? ""),
          address: s.address ?? "",
          imageUrl: "",
          description: s.description ?? "",
        })
        setImages(Array.isArray(s.images) ? s.images : [])
        setAmenities(Array.isArray(s.amenities) ? s.amenities : [])
        setHost(s.user ?? null)
        setFailed([])
        setState("ready")
      } catch (err) {
        console.log(err)
        if (!cancelled) setState("error")
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id, reloadKey])

  // Keep values that aren't in our lists (old category, custom amenities)
  const categories =
    form.category && !CATEGORIES.includes(form.category)
      ? [form.category, ...CATEGORIES]
      : CATEGORIES
  const allAmenities = [
    ...AMENITIES,
    ...amenities.filter((a) => !AMENITIES.includes(a)),
  ]

  const addImage = () => {
    const url = form.imageUrl.trim()
    if (!url || images.includes(url) || images.length >= MAX_IMAGES) return
    setImages((prev) => [...prev, url])
    setForm((f) => ({ ...f, imageUrl: "" }))
  }

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((u) => u !== url))
    setFailed((prev) => prev.filter((u) => u !== url))
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
    }

  const toggleAmenity = (name: string, checked: boolean) =>
    setAmenities((prev) =>
      checked ? [...prev, name] : prev.filter((a) => a !== name)
    )

  // 2) Save changes
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = await getTokenFromClient()

    const { imageUrl: _draft, ...data } = form
    const studioData = { ...data, images, amenities, user: host }

    setSaving(true)
    try {
      const res = await fetch(`${BACKEND}/studios/${id}`, {
        method: METHOD,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.message ?? "Something went wrong.")
      }

      toast.success("Studio updated successfully.")
      router.push("/studios")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      )
    } finally {
      setSaving(false)
    }
  }

  /* ---------- non-form states ---------- */

  if (state === "loading" || isPending) return <FormSkeleton />

  if (state === "notfound") {
    return (
      <Message
        icon={<SearchX className="h-10 w-10 text-muted-foreground" />}
        title="Studio not found"
        text="This studio doesn't exist or was removed."
      />
    )
  }

  if (state === "error") {
    return (
      <Message
        icon={<TriangleAlert className="h-10 w-10 text-destructive" />}
        title="Couldn't load this studio"
        text="Check your connection and try again."
        action={
          <Button variant="outline" onClick={() => setReloadKey((k) => k + 1)}>
            Try again
          </Button>
        }
      />
    )
  }

  // Only the owner may edit (the server must enforce this too)
  if (session && host?.email && session.user.email !== host.email) {
    return (
      <Message
        icon={<TriangleAlert className="h-10 w-10 text-destructive" />}
        title="You can't edit this studio"
        text="Only the host who published this listing can change it."
      />
    )
  }

  /* ---------- the form ---------- */

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-2xl rounded-3xl border bg-background p-8 shadow-sm sm:p-10"
      >
        {/* Header */}
        <header className="mb-8 border-b pb-6">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            Host dashboard
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Edit Your Studio Listing
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your rates, photos, amenities, and details. Changes go live
            as soon as you save.
          </p>
        </header>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Studio Title / Space Name *</Label>
            <IconInput
              id="title"
              icon={Building2}
              required
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Apex 4K Multi-Cam Podcast Studio & Cinema Stage"
            />
          </div>

          {/* Category + capacity */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Studio Discipline / Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger className="h-11 bg-muted/40 focus:ring-green-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Max Creator Capacity *</Label>
              <IconInput
                id="capacity"
                icon={Users}
                type="number"
                min={1}
                required
                value={form.capacity}
                onChange={set("capacity")}
              />
            </div>
          </div>

          {/* Rate + deposit */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rate">Hourly Rate ($ USD) *</Label>
              <IconInput
                id="rate"
                icon={DollarSign}
                type="number"
                min={0}
                required
                placeholder="95"
                value={form.rate}
                onChange={set("rate")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">
                Refundable Security Deposit ($ USD)
              </Label>
              <IconInput
                id="deposit"
                icon={DollarSign}
                type="number"
                min={0}
                placeholder="100"
                value={form.deposit}
                onChange={set("deposit")}
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Location / Full Address *</Label>
            <IconInput
              id="address"
              icon={MapPin}
              required
              placeholder="e.g. 520 W 28th St, Chelsea Arts District, New York, NY"
              value={form.address}
              onChange={set("address")}
            />
          </div>

          {/* Image URLs + previews */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              Studio Image URL{" "}
              <span className="font-normal text-muted-foreground">
                (Direct link from ImgBB, Unsplash, or CDN)
              </span>
            </Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <IconInput
                  id="imageUrl"
                  icon={ImageIcon}
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.imageUrl}
                  onChange={set("imageUrl")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addImage()
                    }
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addImage}
                disabled={!form.imageUrl.trim() || images.length >= MAX_IMAGES}
                className="h-11 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800"
              >
                <Plus className="mr-1 h-4 w-4" /> Add image
              </Button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
              <span>The first image is used as the cover photo.</span>
              <span>
                {images.length}/{MAX_IMAGES} added
              </span>
            </div>

            {images.length === 0 ? (
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed bg-muted/30 text-xs text-muted-foreground">
                Added images will show up here
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-3 sm:gap-4">
                {images.map((url, i) => (
                  <div
                    key={url}
                    className="group relative aspect-4/3 overflow-hidden rounded-xl border bg-muted"
                  >
                    {failed.includes(url) ? (
                      <div className="flex h-full items-center justify-center px-3 text-center text-xs text-muted-foreground">
                        Can&apos;t load this image. Check that the link points
                        directly to an image.
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={`Studio preview ${i + 1}`}
                        className="h-full w-full object-cover"
                        onError={() => setFailed((prev) => [...prev, url])}
                      />
                    )}
                    {i === 0 && (
                      <span className="absolute top-2 left-2 rounded-full bg-green-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      aria-label={`Remove image ${i + 1}`}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Included Amenities & Production Gear</Label>
            <div className="grid gap-x-6 gap-y-3 rounded-xl border bg-muted/40 p-4 sm:grid-cols-2">
              {allAmenities.map((name) => {
                const aid = `amenity-${name.replace(/\W+/g, "-").toLowerCase()}`
                return (
                  <div key={name} className="flex items-center gap-2.5">
                    <Checkbox
                      id={aid}
                      checked={amenities.includes(name)}
                      onCheckedChange={(c) => toggleAmenity(name, c === true)}
                      className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                    />
                    <Label
                      htmlFor={aid}
                      className="cursor-pointer text-xs font-normal"
                    >
                      {name}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Detailed Studio Overview & Equipment Specifications *
            </Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the space, gear, rules, and what's included."
              className="bg-muted/40 focus-visible:ring-green-600"
            />
          </div>

          {/* Host (read-only, the original owner) */}
          {host && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="mb-2 text-xs font-bold text-green-800">
                Read-only host identification
              </p>
              <div className="flex flex-col gap-2 text-xs sm:flex-row sm:justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" /> Host Name:{" "}
                  <b className="text-foreground">{host.name}</b>
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> Host Email:{" "}
                  <b className="text-foreground">{host.email}</b>
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              asChild
              type="button"
              variant="outline"
              className="h-12 sm:w-40"
            >
              <Link href="/host/studios">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="h-12 flex-1 bg-green-600 text-base font-semibold text-white shadow-lg shadow-green-600/25 hover:bg-green-700"
            >
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {saving ? "Saving changes…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  )
}

/* ---------- small helpers ---------- */

function FormSkeleton() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div
        aria-busy="true"
        className="mx-auto w-full max-w-2xl animate-pulse space-y-6 rounded-3xl border bg-background p-8 sm:p-10"
      >
        <div className="space-y-3 border-b pb-6">
          <div className="h-6 w-28 rounded-full bg-muted" />
          <div className="h-10 w-3/4 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="h-11 rounded-md bg-muted" />
          </div>
        ))}
        <div className="h-28 rounded-xl bg-muted" />
      </div>
    </main>
  )
}

function Message({
  icon,
  title,
  text,
  action,
}: {
  icon: React.ReactNode
  title: string
  text: string
  action?: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-muted/30 px-4 text-center">
      {icon}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="max-w-sm text-sm text-muted-foreground">{text}</p>
      <div className="mt-2 flex gap-2">
        {action}
        <Button asChild className="bg-green-600 text-white hover:bg-green-700">
          <Link href="/my-listing">Back to my studios</Link>
        </Button>
      </div>
    </main>
  )
}
