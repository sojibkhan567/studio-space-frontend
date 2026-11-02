import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "cn"
import { useTheme } from "@wrksz/themes/client"

export function ThemeToggle({ className }: { className?: string }) {
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
      <Moon className="h-4.5 w-4.5 dark:hidden" />
      <Sun className="hidden h-4.5 w-4.5 dark:block" />
    </Button>
  )
}
