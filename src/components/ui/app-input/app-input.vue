<template>
  <div class="input" :class="inputClasses">
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
type InputColor<T extends Colors> = T extends "transparent" ? never : T;
interface AppInputProps extends InputHTMLAttributes {
  variant?: Variants;
  fullWidth?: boolean;
  size?: Sizes;
  color?: InputColor<Colors>;
}
interface AppInputEmit {
  (event: "update:value", payload: any): void;
}

const props = withDefaults(defineProps<AppInputProps>(), {
  variant: "filled",
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
console.log(inputClasses);
</script>
<style lang="scss" scoped>
$input-sizes: (
  sm: $gutter-sm,
  md: $gutter-md,
  xl: $gutter-xl,
);

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
      padding: to-rem(calc($value / 2)) 0;
    }
  }
  &--primary {
    color: $primary;
    background: currentColor;
  }
  &--secondary {
    color: $secondary;
  }
  &--transparent {
    color: transparent;
    background: currentColor;
  }
  &--outlined {
    border-bottom: 2px solid gray;
    &:focus-within {
      border-bottom: 2px solid currentColor;
    }
  }
  &--filled {
    border: 2px solid currentColor;
    &:focus-within {
      border-color: red;
    }
  }

  &--md {
    border-radius: $border-radius-md;
  }
  &__field {
    border: none;
    background: transparent;
    width: 100%;
    &:focus {
      outline: none;
    }
    font-size: 19px;
  }
}
</style>
