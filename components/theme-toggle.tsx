"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Monitor className="size-4" />
      </Button>
    )
  }

  const themes = ["light", "dark", "system"] as const

  const currentIndex = themes.indexOf(theme as (typeof themes)[number])

  const nextTheme = themes[(currentIndex + 1) % themes.length]

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Current theme: ${theme}. Switch to ${nextTheme}`}
      title={`Theme: ${theme}`}
    >
      <Icon className="size-5 transition-all duration-300" />
    </Button>
  )
}
