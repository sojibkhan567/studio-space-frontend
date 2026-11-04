import { CirclePlus, Warehouse } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function EmptyState({
  btnTitle,
  href,
}: {
  btnTitle: string
  href: string
}) {
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
        <Link href={href}>
          <CirclePlus className="size-4" /> {btnTitle}
        </Link>
      </Button>
    </div>
  )
}
