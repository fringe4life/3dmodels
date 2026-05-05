import Link from "next/link";
import { buttonRecipe } from "@/components/button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODEL_LIST_ITEMS } from "@/features/models/constants";

const ModelNotFound = () => (
  <UnsuccessfulState
    action={
      <Link className={buttonRecipe({ variant: "primary" })} href="/3d-models">
        Browse All Models
      </Link>
    }
    heading="404 - Model Not Found"
    listItems={MODEL_LIST_ITEMS}
    subheading="The 3D model you're looking for doesn't exist or may have been removed from our collection."
  />
);

export default ModelNotFound;
