import type { Sizes, Variants, Colors } from "types/theme";

type ButtonOptions = {
  size: Sizes;
  variant: Variants;
  color: Colors;
};
const getButtonColorClasses = (color: Colors): { [Key: string]: string } => ({
  [color]: `button--${color}`,
});

const getButtonVariantClasses = (
  variant: Variants
): Record<Variants, string> => ({
  outlined: `button--${variant}--outlined`,
  text: `button--${variant}--text`,
  filled: `button--${variant}`,
});

const getButtonSizesClasses = (size: Sizes): { [Key: string]: string } => ({
  [size]: `button--${size}`,
});

export const getButtonClasses = ({ color, variant, size }: ButtonOptions) => {
  const sizes = getButtonSizesClasses(size);
  const variants = getButtonVariantClasses(variant);
  const colors = getButtonColorClasses(color);
  return { ...colors, ...variants, ...sizes };
};
