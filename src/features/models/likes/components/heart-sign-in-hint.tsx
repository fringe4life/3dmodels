import { sanitiseName } from "@/utils/sanitise-name";
import {
  heartAnchorStyle,
  heartSignInHintClassName,
} from "./heart-button-recipe";

interface HeartSignInHintProps {
  slug: string;
}

const HEART_SIGN_IN_HINT = "Sign in to like this model";

const HeartSignInHint = ({ slug }: HeartSignInHintProps) => (
  <div
    className={heartSignInHintClassName}
    id={`model-heart-hint-${sanitiseName(slug)}`}
    popover="hint"
    role="tooltip"
    style={heartAnchorStyle(slug)}
  >
    {HEART_SIGN_IN_HINT}
  </div>
);

export { HeartSignInHint };
