<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn icon="arrow_back" flat round dense color="grey" size="16px" @click="$router.back()" />
      <q-space />
      <q-btn icon="favorite" flat round dense color="red" size="16px" />
      <q-btn icon="bookmark" flat round dense color="blue" size="16px" />
    </div>
    <div class="flex items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="q-ml-md">
        <div>문정훈</div>
        <div class="text-grey-6">{{ date.formatDate(post.createdAt, 'YYYY. MM. DD HH:mm:ss')}}</div>
      </div>
      <q-space />
      <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup :to="`/post/edit/${$route.params.id}`">
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleDeletePost">
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="q-mt-md text-h5 text-weight-bold">{{ post.title }}</div>
    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}&nbsp;</span>
      {{ post.category }}
    </div>
    <div class="row items-conter q-gutter-x-md q-mt-md justify-end">
      <PostIcon name="sym_o_visibility" :label="post.readCount" tooltip="조회수" />
      <PostIcon name="sym_o_sms" :label="post.commentCount" tooltip="댓글수" />
      <PostIcon name="sym_o_favorite" :label="post.likeCount" tooltip="좋아요" />
      <PostIcon name="sym_o_bookmark" :label="post.bookmarkCount" tooltip="북마크" />
    </div>
    <q-separator class="q-my-lg" />
    <TiptapViewer v-if="post.content" :content="post.content"/>
  </BaseCard>
</template>

<script setup>
import {date} from "quasar";
import { useAsyncState } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import {useQuasar} from "quasar";
import {getPost} from "src/service/post";
import PostIcon from 'src/components/apps/post/PostIcon.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import TiptapViewer from "pages/components/tiptab/TiptapViewer.vue";
import { deletePost } from "src/service/post";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const {state: post, error} = useAsyncState(() => getPost(route.params.id), {}, {
  immediate: true
});

const {execute: executeDeletePost} = useAsyncState(deletePost, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('삭제 완료!');
    router.push('/');
  }
})

const handleDeletePost = async () => {
  if(confirm('삭제하시겠어요')===false){
    return;
  };
  await executeDeletePost(0, route.params.id);
}
</script>

<style lang="scss" scoped></style>
