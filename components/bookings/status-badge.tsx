import { CircleCheck, CircleX, Clock, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BookingStatus } from "@/app/types/bookings"

const STATUS = {
  pending: {
    label: "Pending Host Approval",
    icon: Clock,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  confirmed: {
    label: "Confirmed",
    icon: CircleCheck,
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    className: "border-rose-200 bg-rose-50 text-rose-600",
  },
  completed: {
    label: "Completed",
    icon: Flag,
    className: "border-border bg-muted text-muted-foreground",
  },
} satisfies Record<
  BookingStatus,
  { label: string; icon: typeof Clock; className: string }
>

export function StatusBadge({ status }: { status: BookingStatus }) {
  const { label, icon: Icon, className } = STATUS[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        className
      )}
    >
      <Icon className="size-3" />
      {label}
    </span>
  )
}
