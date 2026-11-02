import { getStudios } from "@/lib/studios"
import { StudioExplorer } from "@/components/studios/studio-explorer"

export const metadata = { title: "Explore Creative Studios" }

export default async function StudiosPage() {
  const studios = await getStudios()
  return <StudioExplorer studios={studios} />
}
