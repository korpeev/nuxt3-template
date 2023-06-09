<template>
  <div class="input" :class="[inputClasses, inputVariantClasses]">
    <slot name="prepend" />
    <input
      class="input__field"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
    />
    <slot name="append" />
  </div>
</template>

<script lang="ts" setup>
import { InputHTMLAttributes } from "@vue/runtime-dom";
import { toRefs } from "#imports";
import { getComponentClasses } from "utils/get-theme-classes";
import type { Colors, Sizes, Variants } from "types/theme";
interface AppInputProps extends InputHTMLAttributes {
  variant?: Exclude<Variants, "text"> | "ghost";
  fullWidth?: boolean;
  size?: Sizes;
  color?: Exclude<Colors, "transparent">;
}
interface AppInputEmit {
  (event: "update:value", payload: any): void;
}

const props = withDefaults(defineProps<AppInputProps>(), {
  variant: "ghost",
  type: "text",
  size: "md",
  color: "primary",
});
const emit = defineEmits<AppInputEmit>();
const { value, size, variant, color } = toRefs(props);

const model = computed({
  get() {
    return value;
  },
  set(newValue) {
    emit("update:value", newValue);
  },
});

const inputClasses = getComponentClasses("input", [
  size.value,
  variant.value,
  color.value,
]);
const inputVariantClasses = getComponentClasses(
  "input",
  [props.color],
  props.variant
);
</script>
<style lang="scss" scoped>
$input-sizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);
$input-variants: (
  primary: $primary,
  secondary: $secondary,
  danger: $danger,
  success: $success,
  ghost: transparent,
);
$input-border: (
  sm: $border-radius-xs,
  md: $border-radius-md,
  xl: $border-radius-xl,
);
$input-filled-variant: $input-variants;
$input-outlined-variant: $input-variants;
.input {
  $parent-selector: &;
  @include flex(row, $gutter-sm, flex-start, center);
  width: 100%;
  padding: 0 to-rem(18);
  @each $size, $value in $input-sizes {
    &__#{$value} {
      padding: 0 to-rem($value);
    }
    &__field {
      padding: to-rem(calc($value / 3)) 0;
    }
  }
  @each $prefix, $value in $input-border {
    border-radius: $value;
  }
  @each $prefix, $value in $input-filled-variant {
    &__filled {
      &--#{$prefix} {
        background-color: $value;
        color: white;
        &:focus-within {
          outline: gray inset 2px;
        }
      }
    }
  }
  @each $prefix, $value in $input-filled-variant {
    &__outlined {
      &--#{$prefix} {
        background-color: transparent;
        border-bottom: 2px solid darken($value, 20%);
        border-radius: 0 !important;
        color: $value;
        &:focus-within {
          border-bottom: 2px solid $value;
        }
      }
    }
  }
  @each $prefix, $value in $input-filled-variant {
    &__ghost {
      &--#{$prefix} {
        background-color: transparent;
        border: 2px solid darken($value, 20%);
        color: #000;
        &:focus-within {
          border-bottom: 2px solid $value;
        }
      }
    }
  }
  &__field {
    border: none;
    background: transparent;
    width: 100%;
    color: inherit;
    &::placeholder {
      color: red;
    }
    &:focus {
      outline: none;
    }
    font-size: 19px;
  }
}
</style>
