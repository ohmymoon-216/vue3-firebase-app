<script setup>
import BaseCard from "components/base/BaseCard.vue";
</script>

<template>
  <q-page padding>
    <div class="row">
      <BaseCard class="col-4">
        <q-list bordered separator>
          <q-item clickable v-ripple to="/mypage/profile">
            <q-item-section avatar>
              <q-icon name="sym_o_account_circle" />
            </q-item-section>
            <q-item-section>프로필</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/mypage/password">
            <q-item-section avatar>
              <q-icon name="sym_o_lock" />
            </q-item-section>
            <q-item-section>비밀번호 변경</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/mypage/bookmark">
            <q-item-section avatar>
              <q-icon name="sym_o_bookmark" />
            </q-item-section>
            <q-item-section>북마크</q-item-section>
          </q-item>
        </q-list>
      </BaseCard>
      <div class="col-8">
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">

</style>
