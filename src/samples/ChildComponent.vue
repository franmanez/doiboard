<template>
  <div>
    <input type="text" v-model="inputValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>