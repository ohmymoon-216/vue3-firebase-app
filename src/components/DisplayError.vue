<script setup>
import { computed } from "vue";
import {getErrorMessage} from "src/utils/firebase/error-message";

const props = defineProps({
  code: {
    type: String
  }
});

const errorMessage = computed(() => getErrorMessage(props.code));
</script>

<template>
  <div class="text-red text-center"> {{errorMessage}} </div>
</template>

<style scoped lang="scss">

</style>
