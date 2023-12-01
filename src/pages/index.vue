<template>
  <q-page padding>
    <div class="row q-gitter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />
      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
      </section>
      <PostRightBar v-model:tags="params.tags" class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
  </q-page>
  <PostWriteDialog
    v-model="postDialog"
    @complete="completeRegistrationPost"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from 'src/pages/components/PostHeader.vue';
import PostLeftBar from 'src/pages/components/PostLeftBar.vue';
import PostRightBar from 'src/pages/components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';
import { getPosts } from 'src/service/post';
import { useAsyncState} from "@vueuse/core";

const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt'
})

const {state: posts, execute } =  useAsyncState(
  getPosts,
  [], {
  throwError: true,
  immediate: false
});

const completeRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
}

watch(params, () => {
  execute(0, params.value);
},{
  deep: true,
  immediate: true
});

// const posts = Array.from(Array(20), (_, index) => ({
//   id: index,
//   title: 'Vue3 Firebase 강의 ' + index,
//   content:
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, officia. Neque, maiores eius culpa quisquam assumenda minus officia! Repellendus suscipit commodi doloremque accusantium distinctio cupiditate nobis exercitationem quae quibusdam corrupti.',
//   readCount: 1,
//   commentCount: 2,
//   likeCount: 3,
//   bookmarkCount: 4,
//   tags: ['html', 'css', 'javascript'],
//   uid: 'uid',
//   category: '카테고리' + index,
// }));

const postDialog = ref(false);

const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
