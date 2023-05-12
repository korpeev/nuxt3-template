<template>
  <div class="container">
    <app-button color="secondary" variant="filled">my button</app-button>
    <div style="margin: 24px 0">
      <app-input color="primary" variant="ghost">
        <template #append> test </template>
      </app-input>
    </div>
    <app-checkbox v-model:value="model">Test 1</app-checkbox>
    <app-radio v-model="radioModel" group-name="1" value="1" />
    <app-radio v-model="radioModel" group-name="1" value="2" />
    <app-radio v-model="radioModel" group-name="2" value="3" />
    <app-form-item :message="message">
      <template #message="{ props }">
        <div :class="props.class">123</div>
      </template>
    </app-form-item>
    <client-only>
      <app-select
        v-model="multipleSelectValue"
        clearable
        :options="selectOptions"
        multiple
      />
      <app-select
        v-model="singleSelectValue"
        :options="selectOptions"
        clearable
      />
      <app-button @click="isOpen = true">open modal</app-button>
      <app-modal-container v-model:is-open="isOpen">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid
        aperiam asperiores aspernatur assumenda consequatur culpa debitis error
        est ex explicabo illo illum impedit inventore ipsum laboriosam nam natus
        nesciunt nobis nulla numquam odio officia, pariatur praesentium quae
        quaerat quis quisquam ratione recusandae repellat suscipit totam
        voluptate voluptatem! Ab aliquam, at cum dicta dolor eligendi enim ex
        ipsum iure maiores minus nam neque numquam obcaecati odit porro possimus
        quas, quod sint voluptatem? Ab consectetur debitis delectus dolorem
        dolores, eos harum iusto, laboriosam laudantium odio optio perspiciatis
        porro sunt vero voluptatibus. Ad aspernatur itaque odit porro, quia
        quibusdam sed ut voluptates.
      </app-modal-container>
    </client-only>
    <div style="margin-top: 20px">
      <ul>
        <li v-for="user of users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import { User } from "services/user";
import {
  AppSelect,
  AppFormItem,
  AppButton,
  AppCheckbox,
  AppInput,
  AppRadio,
} from "components/ui";
import AppModalContainer from "components/ui/app-modal/app-modal.vue";
import { onMounted, useAsyncData, useState } from "#imports";
const { $userService } = useNuxtApp();
const model = useState("checkbox", () => false);
const radioModel = useState("radio", () => "2");
const message = useState("message", () => "");
const { data: users } = useAsyncData<User[]>(() => $userService.getUsers(), {
  server: true,
  default() {
    return [];
  },
});
const selectOptions = useState("options", () =>
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    label: `text ${index + 1}`,
    value: `value ${index + 1}`,
  }))
);
const multipleSelectValue = useState("select-value", () =>
  selectOptions.value.slice(0, 2)
);
const singleSelectValue = useState(
  "single-value-state",
  () => selectOptions.value[0]
);
const isOpen = useState(() => false);
onMounted(async () => {
  setTimeout(() => (message.value = "test message"), 500);
});
</script>
<style lang="scss" scoped>
.mobile {
}
</style>
