"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  ImageIcon,
  User,
  Mail,
  ArrowRight,
  Plus,
  X,
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
import { useRouter } from "next/navigation"
import { getTokenFromClient } from "@/lib/getTokenFormClient"

const CATEGORIES = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
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

export default function AddStudioForm() {
  const [form, setForm] = useState({
    title: "",
    category: "Photo Studio",
    capacity: "10",
    rate: "",
    deposit: "",
    address: "",
    imageUrl: "",
    description: "",
  })
  const [amenities, setAmenities] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const MAX_IMAGES = 4

  const router = useRouter()

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(
      Object.entries(form).filter(([key]) => key !== "imageUrl")
    )
    const studioData = { ...data, images, amenities, user: HOST }

    const token = await getTokenFromClient()

    // store data into db
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Somethings went wrong.")
      } else {
        toast.success("Studio have been added successfully.")
        router.push("/studios")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Replace with your authenticated user
  const { data: session } = authClient.useSession()
  const HOST = { name: session?.user.name, email: session?.user.email }

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
            List Your Creative Workspace
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your photography cyc wall, recording room, podcast setup, or
            film stage with creators
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
                  {CATEGORIES.map((c) => (
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

          {/* Image URLs + multiple previews */}
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
                        Can&pos;t load this image. Check that the link points
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
              {AMENITIES.map((name) => {
                const id = `amenity-${name.replace(/\W+/g, "-").toLowerCase()}`
                return (
                  <div key={name} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={amenities.includes(name)}
                      onCheckedChange={(c) => toggleAmenity(name, c === true)}
                      className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                    />
                    <Label
                      htmlFor={id}
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

          {/* Host */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="mb-2 text-xs font-bold text-green-800">
              Read-only host identification
            </p>
            <div className="flex flex-col gap-2 text-xs sm:flex-row sm:justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" /> Host Name:{" "}
                <b className="text-foreground">{HOST.name}</b>
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> Host Email:{" "}
                <b className="text-foreground">{HOST.email}</b>
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full bg-green-600 text-base font-semibold text-white shadow-lg shadow-green-600/25 hover:bg-green-700"
          >
            Publish Studio Listing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </main>
  )
}
