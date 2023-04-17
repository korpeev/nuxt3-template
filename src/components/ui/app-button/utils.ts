export type ButtonVariants = "filled" | "outlined" | "text";
export type ButtonSizes = "sm" | "md" | "xl";
export type ButtonColors = "primary" | "secondary";

type ButtonOptions = {
  size: ButtonSizes;
  variant: ButtonVariants;
  color: ButtonColors;
};
const getButtonColorClasses = (
  color: ButtonColors
): { [Key: string]: string } => ({
  [color]: `button--${color}`,
});

const getButtonVariantClasses = (
  variant: ButtonVariants
): Record<ButtonVariants, string> => ({
  outlined: `button--${variant}--outlined`,
  text: `button--${variant}--text`,
  filled: `button--${variant}`,
});

const getButtonSizesClasses = (
  size: ButtonSizes
): { [Key: string]: string } => ({
  [size]: `button--${size}`,
});

export const getButtonClasses = ({ color, variant, size }: ButtonOptions) => {
  const sizes = getButtonSizesClasses(size);
  const variants = getButtonVariantClasses(variant);
  const colors = getButtonColorClasses(color);
  return { ...colors, ...variants, ...sizes };
};
