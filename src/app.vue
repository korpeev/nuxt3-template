<template>
  <div class="container">
    <app-button color="transparent" variant="text">my button</app-button>
    <app-input color="primary">
      <template #append> test </template>
    </app-input>
    <app-checkbox v-model:value="model">Test 1</app-checkbox>
    <app-radio group-name="1" v-model="radioModel" value="1" />
    <app-radio group-name="1" v-model="radioModel" value="2" />
    <app-radio group-name="2" v-model="radioModel" value="3" />
    <app-form-item :message="message">
      <template #message="{ props }">
        <div :class="props.class">123</div>
      </template>
    </app-form-item>
  </div>
</template>

<style lang="scss" scoped>
.mobile {
}
</style>
<script setup lang="ts">
import AppButton from "components/ui/app-button/app-button.vue";
import AppInput from "components/ui/app-input/app-input.vue";
import AppCheckbox from "components/ui/app-checkbox/app-checkbox.vue";
import AppRadio from "components/ui/app-radio/app-radio.vue";
import { onMounted } from "@vue/runtime-core";
import AppFormItem from "components/ui/app-form-item.vue";
const model = useState("checkbox", () => false);
const radioModel = useState("radio", () => "2");
const message = useState("message", () => "");
onMounted(() => {
  setTimeout(() => (message.value = "test message"), 500);
});
</script>
