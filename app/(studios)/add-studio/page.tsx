import AddStudioForm from "@/components/studios/add-studio-form"

export const metadata = { title: "Create Studio | Studio Space Application" }

export default function AddStudioPage() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <AddStudioForm />
    </main>
  )
}
