import NotFound from "@/components/not-found/not-found";
import { MODEL_LINKS, MODEL_LIST_ITEMS } from "@/features/models/constants";

const ModelNotFound = () => (
  <NotFound
    heading="404 - Model Not Found"
    links={MODEL_LINKS}
    listItems={MODEL_LIST_ITEMS}
    subheading="The 3D model you're looking for doesn't exist or may have been removed from our collection."
  />
);

export default ModelNotFound;
