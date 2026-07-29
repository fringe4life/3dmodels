import { ModelsView } from "@/features/models/components/models-view";

const ResultsPage = ({ searchParams }: PageProps<"/3d-models">) => (
  <ModelsView searchParams={searchParams} />
);

export default ResultsPage;
