import EditStudioForm from "@/components/studios/edit-studio-form"
import { use } from "react"

export const metadata = { title: "Edit Studio | Explore Creative Studios" }

export default function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <EditStudioForm id={id} />
    </main>
  )
}
