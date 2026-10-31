"use client"

// components/Navbar.tsx  (Next.js App Router + Tailwind + shadcn/ui)
// Setup: npx shadcn@latest add button dropdown-menu sheet avatar
//        npm i next-themes

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  CalendarCheck,
  Camera,
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
]

// Replace with your real session/user
const user = { name: "Alex", avatar: "" }

const activeCls = "bg-primary/10 font-semibold text-primary"
const idleCls =
  "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
        <Camera className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-foreground">
          Studio <span className="text-primary">Space</span>
        </span>
        <span className="mt-1 hidden text-[10px] font-semibold tracking-widest text-muted-foreground uppercase sm:block">
          Creative Marketplace
        </span>
      </span>
    </Link>
  )
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn("h-10 w-10 rounded-full", className)}
    >
      {/* Both icons rendered; CSS picks one, so there is no hydration flicker */}
      <Moon className="h-4.5 w-4.5 dark:hidden" />
      <Sun className="hidden h-4.5 w-4.5 dark:block" />
    </Button>
  )
}

function UserAvatar({ className }: { className?: string }) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={user.avatar} alt="" />
      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
        {user.name[0]}
      </AvatarFallback>
    </Avatar>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href.includes("#")) return false
    return href === "/" ? pathname === "/" : pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Logo />

        {/* Desktop nav (centered) */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive(l.href) ? activeCls : idleCls
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right: theme + user */}
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-sm font-semibold transition outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <UserAvatar />
                {user.name}
                <ChevronDown
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/bookings">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  My Bookings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/saved">
                  <Heart className="mr-2 h-4 w-4" />
                  Saved Studios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile: hamburger + sheet */}
        <div className="flex items-center justify-end gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 p-0">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center gap-3">
                  <UserAvatar className="h-10 w-10" />
                  <div className="leading-tight">
                    <p className="font-semibold">{user.name}</p>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base",
                      isActive(l.href) ? activeCls : idleCls
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 rounded-xl text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
