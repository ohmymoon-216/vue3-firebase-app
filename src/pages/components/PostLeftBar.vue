<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple :active="true">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          :active="true"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/service/category.js';

const categories = getCategories();
</script>

<style lang="scss" scoped></style>
