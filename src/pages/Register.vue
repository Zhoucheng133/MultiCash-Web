<template>
  <TitleBar :is-login="false" />
  <div class="main">
    <div class="panel shadow-lg">
      <div class="title">注册</div>
      <div class="sub">Hi, 从这里开始吧 👋</div>
      <div class="item">
        <div className="label">用户名</div>
        <v-text-field hide-details density="compact" variant="outlined" v-model="username" style="width: 100%;" @keyup.enter="register" autocomplete="off" />
      </div>
      <div class="item">
        <div className="label">密码</div>
        <v-text-field hide-details density="compact" variant="outlined" type="password" v-model="password" style="width: 100%;" @keyup.enter="register" autocomplete="off" />
      </div>
      <div class="item">
        <div className="label">重复密码</div>
        <v-text-field hide-details density="compact" variant="outlined" type="password" v-model="rePassword" style="width: 100%;" @keyup.enter="register" autocomplete="off" />
      </div>
      <v-btn style="margin-top: 30px; width: 100%" @click="register" color="teal">注册</v-btn>
    </div>
  </div>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TitleBar from '../components/TitleBar.vue';
import { registerHandler } from '../utils/components/user';
import { useRouter } from 'vue-router';
const router=useRouter();

const username=ref("");
const password=ref("");
const rePassword=ref("");

const snackbar=ref(false);
const text=ref("");

const register=async()=>{ 
  const response=await registerHandler(username.value, password.value, rePassword.value);
  if(response!=true && response){
    snackbar.value=true;
    text.value=response;
  }else if(response==true){
    router.push("/login");
  }
}
</script>

<style scoped>
@import "../styles/pages/register.css";
</style>