<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
});
const selectedOption = props.value;
</script>
<template>
  <div class="select-wrap">
    <select
      class="form-select"
      v-model="selectedOption"
    >
      <option v-for="option in options" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
