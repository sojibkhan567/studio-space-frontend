import { Camera } from "lucide-react"
import Link from "next/link"
import React from "react"
import { ThemeToggle } from "./theme-toggle"
import { DropdownMenuAvatar } from "./Avater"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-white/80 backdrop-blur transition-all duration-200 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link
            className="group flex min-w-0 shrink-0 items-center gap-2.5"
            href={"/"}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-base font-bold text-white shadow-sm transition-colors group-hover:bg-green-700">
              <Camera />
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-md font-bold text-gray-900 dark:text-white">
                Studio{" "}
                <span className="text-primary dark:text-yellow-400">Space</span>
              </div>
              <div className="text-[10px] font-medium tracking-wide text-gray-400">
                CREATIVE MARKETPLACE
              </div>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            <Link
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
              href={"/dashboard"}
            >
              Employees
            </Link>
            <Link
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
              href={"/dashboard"}
            >
              Attendance
            </Link>
            <Link
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
              href={"/dashboard"}
            >
              Payroll
            </Link>
            <Link
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white"
              href={"/dashboard"}
            >
              Reports
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenuAvatar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
