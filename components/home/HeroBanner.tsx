"use client"

// components/HeroSlider.tsx
// Setup:  npm i swiper
// Images: drop 3 high-res photos (about 2400px wide) into /public/images/hero/
//         (photo-studio.jpg, music-studio.jpg, dance-studio.jpg) or edit `slides` below.

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/effect-fade"

type Slide = {
  image: string
  alt: string
  category: string
  title: string
  text: string
}

const slides: Slide[] = [
  {
    image: "/images/hero/photo-studio.jpg",
    alt: "Photography studio with a softbox light and a seamless paper backdrop",
    category: "Photo and film",
    title: "Find the studio that fits your craft.",
    text: "Book vetted photo and film spaces by the hour, with lighting, backdrops and gear ready when you arrive.",
  },
  {
    image: "/images/hero/music-studio.jpg",
    alt: "Recording studio with a mixing console and a vocal booth",
    category: "Music and podcast",
    title: "Record, rehearse, release.",
    text: "Soundproofed rooms with pro monitoring and no long contracts. Pay only for the hours you use.",
  },
  {
    image: "/images/hero/dance-studio.jpg",
    alt: "Bright dance studio with mirrored walls and large windows",
    category: "For hosts",
    title: "Your empty space is someone’s stage.",
    text: "List your room, set your hours and get paid for every booking. We handle payments, insurance and scheduling.",
  },
]

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured studios"
      className="relative h-[88svh] max-h-205 min-h-135 w-full overflow-hidden bg-[#10151c] text-white"
    >
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="h-full w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.title} className="h-full!">
            {/* Background photo: slow settle-in on the active slide */}
            <div className="duration-7000ms absolute inset-0 scale-110 transition-transform ease-out in-[.swiper-slide-active_&]:scale-100 motion-reduce:transition-none">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="100vw"
                quality={85}
                priority={i === 0}
                className="object-cover"
              />
            </div>

            {/* Legibility overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-[#10151c]/90 via-[#10151c]/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#10151c]/70 via-transparent to-transparent" />

            {/* Copy: fades up when the slide becomes active */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-10 lg:px-16">
              <div className="max-w-2xl translate-y-6 opacity-0 transition duration-700 ease-out in-[.swiper-slide-active_&]:translate-y-0 in-[.swiper-slide-active_&]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none">
                <p className="mb-4 text-sm font-medium text-green-500">
                  {s.category}
                </p>
                <h1
                  className={`text-4xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl`}
                >
                  {s.title}
                </h1>
                <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg">
                  {s.text}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/studios"
                    className="rounded-full bg-green-500 px-7 py-3.5 text-base font-semibold text-[#10151c] transition hover:bg-green-600 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/studios"
                    className="rounded-full border-2 border-white/70 px-7 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/15 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-7xl items-center justify-end px-5 pb-7 sm:px-10 lg:px-16">
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-black/20 backdrop-blur transition hover:bg-white hover:text-[#10151c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-black/20 backdrop-blur transition hover:bg-white hover:text-[#10151c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
