import ResultsContent from "@/features/models/components/models-view";

const ResultsPage = ({ searchParams }: PageProps<"/3d-models">) => (
  <ResultsContent searchParams={searchParams} />
);

export default ResultsPage;
