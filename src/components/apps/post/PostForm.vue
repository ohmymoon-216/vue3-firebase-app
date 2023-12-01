<script setup>
import {computed, ref, toRef} from "vue";
import { getCategories } from 'src/service/category.js';
import TiptabEditor from "pages/components/tiptab/TiptabEditor.vue";
import { validateRequired } from "src/utils/validate-rules";
import { useQuasar } from 'quasar';
import { useTag} from "src/composables/useTag";

const $q = useQuasar();

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
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit'
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


const handleSubmit = () => {
  if(!contentModel.value){
    $q.notify('내용을 작성하세요.');
    return;
  }
  emit('submit');
}

const { addTag, removeTag } = useTag({
  tags: toRef(props, 'tags'),
  updateTags: (tags) => emit('update:tags', tags),
  maxLengthMessage: '태그는 10개 이상 등록할 수 없습니다.'
});



</script>

<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input outlined placeholder="제목" v-model="titleModel" :rules="[validateRequired]" hide-bottom-space />
      <q-select v-model="categoryModel" outlined :options="categories" emit-value map-options :rules="[validateRequired]" hide-bottom-space>
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptabEditor v-model="contentModel"  />
      <q-input
        outlined
        placeholder="태그를 입력해주세요~! (입력 후 Enter)"
        prefix="#"
        @keypress.enter.prevent="addTag"
      />
      <q-chip v-for="(tag, idx) in tags" :key="idx" color="teal" outline dense removable @remove="removeTag(idx)"
      >{{ tag }}</q-chip
      >
    </q-card-section>
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소" v-close-popup />
        <q-btn type="submit" flat label="저장" color="primary" :loading="loading" />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<style scoped lang="scss">

</style>
