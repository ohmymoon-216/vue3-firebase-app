<script setup>
import axios from "axios";
import { useAsyncState } from '@vueuse/core';

const {} = useAsyncState(
  axios.get('https://jsonplaceholder.typicode.com/todos/1'),
);
</script>

<template>
  <q-page>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />

  </q-page>
</template>

<style scoped lang="scss">

</style>
