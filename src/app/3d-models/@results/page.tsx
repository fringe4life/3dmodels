import Stream from "@/components/streamable";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { ResultsContent } from "@/features/models/components/results-content";

export default function ResultsPage({ searchParams }: PageProps<"/3d-models">) {
  return (
    <Stream
      fallback={<ModelsGridSkeleton />}
      value={ResultsContent({ searchParams })}
    >
      {(content) => content}
    </Stream>
  );
}
