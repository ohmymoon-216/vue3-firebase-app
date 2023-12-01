<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input v-model="form.password" type="password" placeholder="비밀번호" outlined dense />
      <DisplayError v-if="error" :code="error?.code" />
      <div>
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width unelevated"
          color="primary"
          :loading="isLoading"
        />
        <div class="flex">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'FindPassword')"
          />
          <q-space />
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          />
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 계정으로 로그인하기"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click = "handleSighInGoogle"
      />
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from "src/service";
import { useQuasar } from "quasar";
import {ref} from "vue";
import DisplayError from "components/DisplayError.vue";
import {getErrorMessage} from "src/utils/firebase/error-message";
import { useAsyncState } from "@vueuse/core";

const $q = useQuasar();
const emit = defineEmits(['changeView', 'closeDialog']);

// const isLoading = ref(false);
// const error = ref(null);
const {isLoading, error, execute} = useAsyncState(signInWithEmail, null, {
  immediate: false,
  throwError: true,
  onSuccess: () => {
    $q.notify('환영합니다.');
    emit('closeDialog');
  },
  onError: (err) => {
    $q.notify({
      type: 'negative',
      message: getErrorMessage(err.code)
    });
  }
});

const form = ref({
  email: '',
  password: ''
});
const handleSighInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('환영합니다.');
  emit('closeDialog');
};

const handleSubmit = () => execute(1000, form.value);

// const handleSubmit = async () => {
//   try {
//     isLoading.value = true;
//     await signInWithEmail(form.value);
//     $q.notify('환영합니다.');
//     emit('closeDialog');
//   }catch (err){
//     error.value = err;
//     $q.notify({
//       type: 'negative',
//       message: getErrorMessage(err.code)
//     })
//   }finally {
//     isLoading.value = false
//   }
//
// }
</script>

<style lang="scss" scoped></style>
