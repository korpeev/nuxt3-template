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
    <app-select
      clearable
      :options="selectOptions"
      v-model="selectedValue"
      multiple
    />
    {{ selectedValue }}
  </div>
</template>

<style lang="scss" scoped>
.mobile {
}
</style>
<script setup lang="ts">
import {
  AppSelect,
  AppFormItem,
  AppButton,
  AppCheckbox,
  AppInput,
  AppRadio,
} from "components/ui";
import { onMounted } from "@vue/runtime-core";
const model = useState("checkbox", () => false);
const radioModel = useState("radio", () => "2");
const message = useState("message", () => "");

const selectOptions = useState("options", () =>
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    label: `text ${index + 1}`,
    value: `value ${index + 1}`,
  }))
);
const selectedValue = useState("select-value", () =>
  selectOptions.value.slice(0, 5)
);

onMounted(() => {
  setTimeout(() => (message.value = "test message"), 500);
});
</script>
