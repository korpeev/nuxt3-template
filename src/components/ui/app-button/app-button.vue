<template>
  <button :class="buttonClasses" class="button">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { ButtonHTMLAttributes } from "@vue/runtime-dom";
import type { Colors, Variants, Sizes } from "types/theme";
import { getButtonClasses } from "./utils";

interface AppButtonProps extends ButtonHTMLAttributes {
  color?: Colors;
  variant?: Variants;
  size?: Sizes;
}
const props = withDefaults(defineProps<AppButtonProps>(), {
  color: "primary",
  variant: "filled",
  size: "md",
});
const { size, color, variant } = toRefs(props);

const buttonClasses = getButtonClasses({
  color: color.value,
  size: size.value,
  variant: variant.value,
});
</script>
<style lang="scss" scoped>
$button-sizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);
.button {
  cursor: pointer;
  border: none;
  border-radius: $border-radius-md;
  &--primary {
    background: $primary;
    &:active {
      background: rgba($primary, 80%);
    }
    &--outlined {
      background: transparent;
      border: 1px solid $primary;
    }
  }
  &--secondary {
    background: $secondary;
    &:active {
      background: rgba($secondary, 80%);
    }
    &--outlined {
      color: $secondary;
      background: transparent;
      border: 2px solid $secondary;
      &:active {
        color: white;
      }
    }
    &--text {
      border: none;
      background: transparent;
      color: $secondary;
      &:active {
        color: rgba($secondary, 50%);
        background: transparent;
      }
    }
  }
  @each $size, $value in $button-sizes {
    &--#{$size} {
      padding: to-rem($value);
    }
  }
}
</style>
