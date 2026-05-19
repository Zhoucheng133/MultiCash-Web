<template>
  <TitleBar :is-login="true" />
  <div class="main">
    <div class="panel shadow-lg">
      <div class="title">修改密码</div>
      <div class="sub">修改用户密码 🔑</div>
      <div class="item">
        <div className="label">当前密码</div>
        <v-text-field hide-details density="compact" variant="outlined" type="password" v-model="oldPassword" style="width: 100%;" @keyup.enter="changeHanlder" autocomplete="off" />
      </div>
      <div class="item">
        <div className="label">新密码</div>
        <v-text-field hide-details density="compact" variant="outlined" type="password" v-model="newPassword" style="width: 100%;" @keyup.enter="changeHanlder" autocomplete="off" />
      </div>
      <v-btn style="margin-top: 30px; width: 100%" @click="changeHanlder" color="teal">修改</v-btn>
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
import { ref } from "vue";
import TitleBar from "../components/TitleBar.vue";
import { changePasswordHanlder } from "../utils/components/user";
import { useRouter } from "vue-router";

const router=useRouter();

document.title = "MultiCash | 修改密码";

const oldPassword=ref("");
const newPassword=ref("");

const snackbar=ref(false);
const text=ref("");

const changeHanlder=async()=>{ 
  const response=await changePasswordHanlder(oldPassword.value, newPassword.value);
  if(response===true){
    text.value="修改成功，正在跳转到登录页";
    snackbar.value=true;
    setTimeout(()=>{
      router.push("/login");
    }, 1000);
  }else if(response){
    text.value=response;
    snackbar.value=true;
  }
    
}

</script>

<style scoped>
@import "../styles/pages/password.css";
</style>