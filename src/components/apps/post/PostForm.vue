<script setup>
import {computed, ref} from "vue";
import { getCategories } from 'src/service/category.js';

const props = defineProps({
  title:{
    type: String
  },
  category:{
    type: String
  },
  content:{
    type: String
  },
  tags:{
    type: Array,
    default: () => []
  },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
]);

const titleModel = computed({
  get: () => props.title,
  set: (val) => emit('update:title', val)
});

const categoryModel = computed({
  get: () => props.category,
  set: (val) => emit('update:category', val)
});

const contentModel = computed({
  get: () => props.content,
  set: (val) => emit('update:content', val)
});

const categories = getCategories();

const tag = ref('');

const removeTag = () => {
  console.log('removeTag');
};

</script>

<template>
  <q-form>
    <q-card-section class="q-gutter-y-sm">
      <q-input outlined placeholder="제목" v-model="titleModel" />
      <q-select v-model="categoryModel" outlined :options="categories" emit-value map-options>
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <q-input
        type="textarea"
        v-model="contentModel"
        outlined
        placeholder="내용을 작성해주세요~!"
      />
      <q-input
        outlined
        placeholder="태그를 입력해주세요~! (입력 후 Enter)"
        prefix="#"
        v-model="tag"
      />
      <q-chip color="teal" outline dense removable @remove="removeTag"
      >vuejs</q-chip
      >
    </q-card-section>
    <q-card-actions align="right">
      <slot name="actions">

      </slot>
    </q-card-actions>
  </q-form>
</template>

<style scoped lang="scss">

</style>
