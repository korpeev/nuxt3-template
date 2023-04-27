<template>
  <div
    class="form-item"
    :class="{ 'form__item--vertical': direction === 'vertical' }"
  >
    <slot name="label">
      <div :style="{ width: `${labelWidth}` }" class="form-item__label">
        {{ label }}
      </div>
    </slot>
    <slot />
    <transition name="fadeIn">
      <slot
        v-if="hasMessage"
        name="message"
        :props="{ class: formItemMessageClasses }"
      >
        <div class="form-item__message" :class="formItemMessageClasses">
          {{ message }}
        </div>
      </slot>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { getComponentClasses } from "#imports";

interface Props {
  message?: string;
  messageType: "danger" | "success";
  direction?: "horizontal" | "vertical";
  labelWidth: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  messageType: "danger",
  direction: "vertical",
  labelWidth: "auto",
});
const hasMessage = computed(() => props.message && props.message.length > 0);
const formItemMessageClasses = getComponentClasses(
  "form-item",
  [props.messageType],
  "message"
);
</script>
<style lang="scss" scoped>
$messageTypes: (
  danger: $danger,
  success: $success,
);
.form-item {
  font-family: sans-serif;
  @include flex(row, 10);
  &--vertical {
    @include flex(column, 10);
  }
  &__message {
    @each $prefix, $color in $messageTypes {
      &--#{$prefix} {
        color: $color;
      }
    }
  }
}
</style>
