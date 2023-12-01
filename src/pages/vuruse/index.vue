<script setup>
import axios from "axios";
import { useAsyncState } from '@vueuse/core';

const {state} = useAsyncState(
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.data),
);
</script>

<template>
  <q-page>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />
    <p>state: {{state}}</p>
  </q-page>
</template>

<style scoped lang="scss">

</style>
