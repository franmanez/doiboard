<template>
  <div>
    <ChildComponent v-model:model-value="inputValue" />
    <p>Valor en el padre: {{ inputValue }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent,
  },
  setup() {
    const inputValue = ref('');

    return {
      inputValue,
    };
  },
};
</script>