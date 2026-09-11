import { defineUtility } from "@pandacss/dev";

const cornerShape = defineUtility({
  group: "Border Radius",
  transform(value) {
    return { cornerShape: value };
  },
  values: ["squircle", "bevel"],
});

export const utilities = {
  extend: {
    cornerShape,
  },
};
