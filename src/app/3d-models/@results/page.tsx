import Stream from "@/components/streamable";
import ModelsGridSkeleton from "@/features/models/components/models-grid-skeleton";
import ResultsContent from "@/features/models/components/results-content";

const ResultsPage = ({ searchParams }: PageProps<"/3d-models">) => (
  <Stream
    fallback={<ModelsGridSkeleton />}
    value={ResultsContent({ searchParams })}
  >
    {(content) => content}
  </Stream>
);

export default ResultsPage;
