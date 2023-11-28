<template>
  <q-page padding>
    <PostDetails />
    <q-separator class="q-my-xl" />
    <PostComments />
  </q-page>
</template>

<script setup>
import PostDetails from 'src/pages/components/PostDetails.vue';
import PostComments from 'src/pages/components/PostComments.vue';
</script>

<style lang="scss" scoped></style>
