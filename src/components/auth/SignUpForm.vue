<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input v-model="form.nickname" placeholder="닉네임" outlined dense hide-bottom-space :rules="[validateRequired]" />
      <q-input v-model="form.email" placeholder="이메일" outlined dense hide-bottom-space :rules="[validateRequired, validateEmail]" />
      <q-input v-model="form.password" type="password" placeholder="비밀번호(문자, 숫자조합 8자 이상)" outlined dense hide-bottom-space :rules="[validateRequired, validatePassword]" />
      <q-input v-model="passwordConfirm" type="password" placeholder="비밀번호 확인" outlined dense hide-bottom-space :rules="[validateRequired, val => validatePasswordConfirm(form.password, val)]" />
      <q-btn type="submit" label="가입하기" class="full-width unelevated" color="primary" />
      <q-separator />
      <q-btn
        label="로그인하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useQuasar } from "quasar";
import { sighUpWithEmail } from 'src/service'
import { validateRequired, validateEmail, validatePassword, validatePasswordConfirm } from "src/utils/validate-rules";
import { useAsyncState } from "@vueuse/core";
import {getErrorMessage} from "src/utils/firebase/error-message";

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const {isLoading, execute} = useAsyncState(sighUpWithEmail, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('가입을 환영합니다.');
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
  nickname: '',
  email: '',
  password: ''
});

const passwordConfirm = ref('');

const handleSubmit = () => execute(1000, form.value);

// const handleSubmit = async () => {
//   await sighUpWithEmail(form.value);
//   $q.notify('가입을 환영합니다.');
//   emit('closeDialog');
// }
</script>

<style lang="scss" scoped></style>
