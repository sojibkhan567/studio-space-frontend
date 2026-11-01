import StudioCard, { Studio } from "../common/StudioCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/600`

export const studios: Studio[] = [
  {
    slug: "apex-dolby-atmos-suite",
    title: "Apex Dolby Atmos Music & Mixing Suite",
    description:
      "Tuned by world-class acousticians, Apex Suite provides an immersive spatial audio mixing and vocal tracking environment with analog outboard gear.",
    category: "Music Suite",
    image: img("apex-music-suite"),
    location: "Downtown Arts District, Los Angeles, CA",
    pricePerHour: 95,
    rating: 5.0,
    capacity: 8,
    deposit: 100,
  },
  {
    slug: "daylight-cyclorama-loft",
    title: "Daylight Cyclorama Loft with Natural Light",
    description:
      "A 2,400 sq ft white-wall loft with a 14-foot cyc, north-facing windows and a private prep area. Strobes and stands included.",
    category: "Photo Studio",
    image: img("daylight-cyc-loft"),
    location: "Williamsburg, Brooklyn, NY",
    pricePerHour: 70,
    rating: 4.9,
    capacity: 15,
    deposit: 150,
  },
  {
    slug: "quietroom-podcast-pod",
    title: "QuietRoom Podcast Pod for Up to 4 Guests",
    description:
      "Treated, ready-to-record pod with four Shure SM7B mics, a RodeCaster Pro and a comfortable sofa lounge for guests.",
    category: "Podcast Room",
    image: img("quietroom-podcast"),
    location: "South Congress, Austin, TX",
    pricePerHour: 45,
    rating: 4.8,
    capacity: 4,
    deposit: 50,
  },
  {
    slug: "mirror-hall-dance-studio",
    title: "Mirror Hall Sprung-Floor Dance Studio",
    description:
      "Full-wall mirrors, a professional sprung maple floor and a Bluetooth sound system. Ideal for classes, rehearsals and shoots.",
    category: "Dance Studio",
    image: img("mirror-hall-dance"),
    location: "Capitol Hill, Seattle, WA",
    pricePerHour: 40,
    rating: 4.7,
    capacity: 25,
    deposit: 75,
  },
  {
    slug: "kiln-and-clay-ceramics",
    title: "Kiln & Clay Open Ceramics Workshop",
    description:
      "Shared wheels, hand-building tables and two electric kilns. Glazes and basic tools are provided for every booking.",
    category: "Art Studio",
    image: img("kiln-clay-ceramics"),
    location: "Pearl District, Portland, OR",
    pricePerHour: 30,
    rating: 4.9,
    capacity: 10,
    deposit: 40,
  },
  {
    slug: "the-greenhouse-event-space",
    title: "The Greenhouse Glass-Roof Event & Pop-up Space",
    description:
      "A light-filled event space with exposed brick, glass roof, 60-person capacity and a small catering kitchen for launches and workshops.",
    category: "Event Space",
    image: img("greenhouse-event"),
    location: "River North, Chicago, IL",
    pricePerHour: 120,
    rating: 4.8,
    capacity: 60,
    deposit: 300,
  },
  {
    slug: "analog-heart-tracking-room",
    title: "Analog Heart Live Tracking Room with Vintage Console",
    description:
      "A warm-sounding live room built around a restored 1976 Neve console. Great for bands, drums and string sessions.",
    category: "Music Suite",
    image: img("analog-heart-room"),
    location: "East Nashville, Nashville, TN",
    pricePerHour: 85,
    rating: 4.9,
    capacity: 7,
    deposit: 120,
  },
  {
    slug: "noir-black-box-film-stage",
    title: "Noir Black Box Film & Video Stage",
    description:
      "Light-controlled black box with a lighting grid, blackout drapes and drive-in loading access. Perfect for interviews and short films.",
    category: "Photo Studio",
    image: img("noir-black-box"),
    location: "Wynwood, Miami, FL",
    pricePerHour: 110,
    rating: 4.6,
    capacity: 20,
    deposit: 200,
  },
  {
    slug: "voice-booth-vo-studio",
    title: "Voice Booth Studio for Voice-Over & Audiobooks",
    description:
      "Broadcast-quality isolated booth with a Neumann U87, remote direction support and fast file delivery.",
    category: "Podcast Room",
    image: img("voice-booth-vo"),
    location: "Silver Lake, Los Angeles, CA",
    pricePerHour: 55,
    rating: 5.0,
    capacity: 3,
    deposit: 60,
  },
]

const FeturedStudio = () => {
  return (
    <section className="bg-gray-100/90 py-20 sm:py-25 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-10">
          <div className="max-w-xl">
            <h1 className="mb-2 font-bold sm:text-xl md:text-2xl lg:text-3xl">
              Featured Creative Workspaces
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hand-Insecpted production facilities and studio suties top rated
              by professional directors, producres and audio engineers.
            </p>
          </div>
          <Link
            href={"/studios"}
            className="flex items-center gap-2 text-sm font-medium text-green-600"
          >
            View All Workspaces
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio.slug} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeturedStudio
