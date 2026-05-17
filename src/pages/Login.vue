<template>
  <TitleBar :is-login="false" />
  <div class="main">
    <div class="panel shadow-lg">
      <div class="title">登录</div>
      <div class="sub">Hi, 欢迎回来 👋</div>
      <div class="item">
        <div className="label">用户名</div>
        <v-text-field hide-details density="compact" variant="outlined" v-model="username" style="width: 100%;" @keyup.enter="login" />
      </div>
      <div class="item">
        <div className="label">密码</div>
        <v-text-field hide-details density="compact" variant="outlined" type="password" v-model="password" style="width: 100%;" @keyup.enter="login" />
      </div>
      <v-btn style="margin-top: 30px; width: 100%" @click="login" color="blue">登录</v-btn>
    </div>
  </div>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TitleBar from '../components/TitleBar.vue';
import { loginHandler } from '../utils/components/user';
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const password = ref('');
const snackbar = ref(false);
const text = ref('');

const login=async ()=>{
  const response=await loginHandler(username.value, password.value);
  if(response!=true && response){
    snackbar.value=true;
    text.value=response;
  }else if(response==true){
    router.push("/");
  }
}
</script>

<style scoped>
@import "../styles/pages/login.css"
</style>