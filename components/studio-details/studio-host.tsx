import { Card, CardContent } from "@/components/ui/card"

export function StudioHost({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <Card className="rounded-2xl py-0 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="grid size-12 place-items-center rounded-full bg-primary/10 font-bold text-primary">
          {initials}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Hosted by</p>
          <p className="font-semibold">{name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
