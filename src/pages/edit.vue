<script setup>
import BaseCard from "components/base/BaseCard.vue";
import PostForm from "components/apps/post/PostForm.vue";
import { ref } from 'vue';

const form = ref(getInitialForm());

</script>

<script>
const getInitialForm = () => ({
  title: '',
  content: '',
  tags: [],
  category: '',
});
</script>

<template>
  <q-page padding>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title class="text-h6">글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn type="submit" flat label="저장" color="primary" />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>

</template>

<style scoped lang="scss">

</style>
