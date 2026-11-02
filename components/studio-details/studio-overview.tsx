import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StudioOverview({ description }: { description: string }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Workspace Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
