<template>
  <div class="container">
    <app-button color="transparent" variant="text">my button</app-button>
    <app-input color="primary">
      <template #append> test </template>
    </app-input>
  </div>
</template>

<style lang="scss" scoped>
.mobile {
}
</style>
<script setup lang="ts">
import AppButton from "components/ui/app-button/app-button.vue";
import AppInput from "components/ui/app-input/app-input.vue";
</script>
