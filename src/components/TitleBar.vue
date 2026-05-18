<template>
  <div class="header">
    <div class="head_img" @click="clickHandler">
      <img src="/icon.svg" alt="" width="40px" draggable="false">
      <div class="head_label">MultiCash</div>
    </div>
    <div class="actions" v-if="props.isLogin">
      <v-btn variant="text" size="40">
        <v-icon :icon="dark ? 'far fa-moon' : 'far fa-sun'" size="15"></v-icon>
      </v-btn>
      <v-btn variant="text" size="40">
        <v-icon icon="far fa-user" size="15"></v-icon>
        <v-menu activator="parent">
          <v-list width="200">
            <v-list-subheader>账号设置</v-list-subheader>
            <v-list-item @click="router.push('/password')">
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutHandler">
              <v-list-item-title>注销</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Store from '../utils/store';
import { logoutHandler } from '../utils/components/user';
import { useRouter } from 'vue-router';

const router=useRouter();
const store=Store();
const dark=storeToRefs(store).dark;

function clickHandler() {
  if(props.isLogin){
    router.push('/');
  }
}

const props = defineProps(["isLogin"]);
</script>

<style scoped>
@import "../styles/components/titlebar.css";
</style>