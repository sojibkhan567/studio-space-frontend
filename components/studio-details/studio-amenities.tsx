import { CircleCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StudioAmenities({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Equipment &amp; Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {amenities.map((a) => (
            <li key={a} className="flex items-start gap-2.5 text-sm">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
