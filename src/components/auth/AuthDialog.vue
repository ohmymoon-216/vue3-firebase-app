<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    transition-show="none"
    transition-hide="none"
    @hide="changeViewMode('SignInForm')"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <component
          :is="authViewComponents[viewMode]"
          @changeView="changeViewMode"
          @closeDialog="closeDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
// import SignInForm from 'src/components/auth/SignInForm.vue';
// import SignUpForm from 'src/components/auth/SingUpForm.vue';
// import FindPassword from 'src/components/auth/FindPasswordForm.vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

// const authViewComponents = {
//   SignInForm,
//   SignUpForm,
//   FindPassword,
// };

const authViewComponents = {
  SignInForm: defineAsyncComponent(() =>
    import('src/components/auth/SignInForm.vue'),
  ),
  SignUpForm: defineAsyncComponent(() =>
    import('src/components/auth/SignUpForm.vue'),
  ),
  FindPassword: defineAsyncComponent(() =>
    import('src/components/auth/FindPasswordForm.vue'),
  ),
};

const viewMode = ref('SignInForm');
const changeViewMode = mode => (viewMode.value = mode);

const closeDialog = () => {
  emit('update:modelValue', false);
}
</script>

<style lang="scss" scoped></style>
