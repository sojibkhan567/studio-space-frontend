"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  CalendarCheck,
  Camera,
  ChevronDown,
  CirclePlus,
  Heart,
  LogOut,
  Menu,
  Table,
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
import { Skeleton } from "@/components/ui/skeleton"
import { authClient, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-section" },
]

const activeCls = "bg-primary/10 font-semibold text-primary"
const idleCls =
  "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"

type NavUser = { name: string; email?: string; image?: string | null }

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

function UserAvatar({
  user,
  className,
}: {
  user: NavUser
  className?: string
}) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={user.image ?? undefined} alt="" />
      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
        {user.name?.[0]?.toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { data: session, isPending } = useSession()
  const user = session?.user as NavUser | undefined

  const isActive = (href: string) => {
    if (href.includes("#")) return false
    return href === "/" ? pathname === "/" : pathname.startsWith(href)
  }

  //logout user
  const handleLogout = async () => {
    setOpen(false)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  const authButtons = (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        className="rounded-full border border-gray-600 px-4 py-5"
      >
        <Link href="/login">Log in</Link>
      </Button>
      <Button asChild className="rounded-full px-4 py-5">
        <Link href="/signup">Sign up</Link>
      </Button>
    </div>
  )

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
          {isPending ? (
            <Skeleton className="h-10 w-28 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-sm font-semibold transition outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <UserAvatar user={user} />
                  <span className="max-w-30 truncate">{user.name}</span>
                  <ChevronDown
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="space-y-1 px-2 py-2">
                  <p className="text-xs text-gray-400">Sign in as</p>
                  <h2 className="text-sm font-bold">{user.name}</h2>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/add-studio">
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add New Studio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-listing">
                    <Table className="mr-2 h-4 w-4" />
                    My Studio Listing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            authButtons
          )}
        </div>

        {/* Mobile: hamburger + sheet */}
        <div className="flex items-center justify-end gap-2 lg:hidden">
          <ThemeToggle />
          {isPending ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="">
                  <UserAvatar user={user} className="h-10 w-10" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link href="/add-studio">
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add New Studio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-listing">
                    <Table className="mr-2 h-4 w-4" />
                    My Studio Listing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
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
                {user ? (
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} className="h-10 w-10" />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate font-semibold">{user.name}</p>
                      <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="font-semibold">Welcome to Studio Space</p>
                )}
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
                {user ? (
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2 rounded-xl text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild className="w-full rounded-xl">
                      <Link href="/signup" onClick={() => setOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      <Link href="/login" onClick={() => setOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
