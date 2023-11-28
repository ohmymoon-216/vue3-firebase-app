<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card style="width: 600px">
      <q-toolbar>
        <q-toolbar-title class="text-h6">글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
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
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import PostForm from "components/apps/post/PostForm.vue";

const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
};
</script>

<script>
const getInitialForm = () => ({
  title: '',
  content: '',
  tags: [],
  category: '',
});
</script>

<style lang="scss" scoped></style>
