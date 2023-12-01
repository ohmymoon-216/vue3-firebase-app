<template>
  <q-layout view="lHh LpR lFf" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          Moon Family
        </q-toolbar-title>
        <q-btn stretch flat label="Home" to="/" />
        <q-btn
          stretch
          flat
          label="수강하기"
          href="https://naver.com"
          target="_blank"
        />
        <q-btn stretch flat label="온라인 강의" />
        <q-btn stretch flat label="Youtube" />
        <q-separator class="q-my-md q-mr-md" vertical />
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="primary"
          label="로그인 / 회원가입"
          @click="openAuthDialog"
        />
        <q-btn v-if="authStore.isAuthenticated" round flat>
          <q-avatar>
            <img :src="authStore.user.photoURL || generateDefaultPhotoURL(authStore.user.uid)">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item v-if="authStore.user.emailVerified" clickable v-close-popup to="/mypage">
                  <q-item-section>프로필</q-item-section>
                </q-item>
                <q-item v-else clickable v-close-popup @click="verifyEmail">
                  <q-item-section class="text-red">이메일을 인증해주세요.</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="handleLogout">
                  <q-item-section>로그아웃</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AuthDialog from 'src/components/auth/AuthDialog.vue';
import { useAuthStore } from "stores/auth";
import { logout, generateDefaultPhotoURL, sendVerificationEmail } from 'src/service';
import { useQuasar } from "quasar";

const $q= useQuasar();
const route = useRoute();
const authStore = useAuthStore();
// debugger;

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto',
}));

const authDialog = ref(false);
const openAuthDialog = () => {
  authDialog.value = true;
};

const handleLogout = async () => {
  await logout();
}

const verifyEmail = async () => {
  await sendVerificationEmail();
  $q.notify('이메일을 확인해 주세요.');
}
</script>
