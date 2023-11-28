<script setup>
import PostList from "components/apps/post/PostList.vue";

const posts = Array.from(Array(3), (_, index) => ({
  id: index,
  title: 'Vue3 Firebase 강의 ' + index,
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, officia. Neque, maiores eius culpa quisquam assumenda minus officia! Repellendus suscipit commodi doloremque accusantium distinctio cupiditate nobis exercitationem quae quibusdam corrupti.',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ['html', 'css', 'javascript'],
  uid: 'uid',
  category: '카테고리' + index,
}));
</script>

<template>
  <PostList :items="posts" />
</template>

<style scoped lang="scss">

</style>
