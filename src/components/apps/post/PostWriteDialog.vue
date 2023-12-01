<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide" transition-show="none" transition-hide="none">
    <q-card style="min-width: 660px">
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
        :loading="isLoading"
        @submit="execute(1000, { ...form,uid: authStore.uid})"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import PostForm from "components/apps/post/PostForm.vue";
import { createPost } from "src/service/post";
import { useAsyncState } from "@vueuse/core";
import {useAuthStore} from "stores/auth";
import { useRouter} from "vue-router";

const emit = defineEmits(['complete']);

const authStore = useAuthStore();
const router = useRouter();
const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
};

const {isLoading, execute} = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: (postId) => {
    console.log('postId', postId);
    // router.push(`/posts/${postId}`)
    emit('complete');
  }
});

// const handleSubmit = () =>
//   execute(1000, {
//     ...form.value,
//     uid: authStore.uid
//   });

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
