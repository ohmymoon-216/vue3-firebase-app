<template>
  <router-view />
</template>

<script setup>
import {onErrorCaptured} from 'vue';

onErrorCaptured((err) => {
  console.log('### onErrorCatptured   ###');
  console.log('err: ', err);
});
</script>
