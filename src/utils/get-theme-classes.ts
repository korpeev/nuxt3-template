import type { Colors, ComponentNames, Sizes, Variants } from "types/theme";
export type Modification = Colors | Sizes | Variants;

const getComponentClassByModifications = (
  componentName: ComponentNames,
  modification: Modification
) => ({
  [modification]: `${componentName}--${modification}`,
});

export const getComponentClasses = (
  componentName: ComponentNames,
  modifications: Modification[]
) => {
  return modifications.reduce(
    (acc, modification) =>
      `${acc} ${
        getComponentClassByModifications(componentName, modification)[
          modification
        ]
      }`,
    ""
  );
};
