<script setup>
import BaseCard from "components/base/BaseCard.vue";
import PostForm from "components/apps/post/PostForm.vue";
import { ref } from 'vue';
import {useRoute} from "vue-router";
import {useQuasar} from "quasar";
import {getPost, updatePost} from "src/service/post";
import { useAsyncState } from "@vueuse/core";

const route = useRoute();
const $q = useQuasar();
useAsyncState(() => getPost(route.params.id), {}, {
  onSuccess: (post) => {
    form.value.title = post.title;
    form.value.category = post.category;
    form.value.content = post.content;
    form.value.tags = post.tags;
  }
});

const { isLoading, execute:executeUpdatePost } = useAsyncState(updatePost, null, {
  immediate: false,
  throwError: true,
  onSuccess: () => {
    $q.notify('수정완료!');
  }
});
const form = ref(getInitialForm());

const handleSubmit = async () => {
  if(confirm('수정하시겠어요?') === false) {
    return;
  }
  await executeUpdatePost(1000, route.params.id, form.value);
}

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
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn type="submit" flat label="저장" color="primary" :loading="isLoading" />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>

</template>

<style scoped lang="scss">

</style>
