<template>
  <div class="header">
    <div class="head_img" @click="clickHandler">
      <img src="/icon.svg" alt="" width="40px" draggable="false">
      <div class="head_label">MultiCash</div>
    </div>
    <div class="actions">
      <v-btn variant="text" size="40">
        <i :class="['fa', darkMode==DarkMode.auto ? 'fa-circle-half-stroke' : darkMode==DarkMode.dark ? 'fa-moon' : 'fa-sun']" style="font-size: 15px;"></i>
        <v-menu activator="parent">
          <v-list width="200">
            <v-list-subheader>显示</v-list-subheader>
            <v-list-item @click="changeThemeHandler(DarkMode.auto)">
              <template v-slot:prepend>
                <i class="fa fa-circle-half-stroke mr-2"></i>
              </template>
              <v-list-item-title>自动</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeThemeHandler(DarkMode.light)">
              <template v-slot:prepend>
                <i class="fa fa-sun mr-2"></i>
              </template>
              <v-list-item-title>浅色</v-list-item-title>
            </v-list-item>
            <v-list-item @click="changeThemeHandler(DarkMode.dark)">
              <template v-slot:prepend>
                <i class="fa fa-moon mr-2"></i>
              </template>
              <v-list-item-title>深色</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn variant="text" size="40" v-if="props.isLogin">
        <i class="far fa-user" style="font-size: 15px;"></i>
        <v-menu activator="parent">
          <v-list width="200">
            <v-list-subheader>账号设置</v-list-subheader>
            <v-list-item @click="router.push('/password')">
              <v-list-item-title>修改密码</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutHandler()">
              <v-list-item-title>注销</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { logoutHandler } from '../utils/components/user';
import { useRouter } from 'vue-router';
import Store from '../utils/store';
import { storeToRefs } from 'pinia';
import { DarkMode } from '../utils/store';
import { useTheme } from 'vuetify';
import { watch } from 'vue';

const theme=useTheme();

const store=Store();

const { darkMode }=storeToRefs(store);

const changeThemeHandler=(mode: DarkMode) => {
  const isDark = mode === DarkMode.dark || (mode === DarkMode.auto && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  theme.change(mode===DarkMode.auto ? 'system' : mode==DarkMode.dark ? 'dark' : 'light');
  if(mode!=DarkMode.auto){
    localStorage.setItem('darkMode', mode==DarkMode.dark ? 'dark' : 'light');
  }else{
    localStorage.removeItem('darkMode');
  }
};

function themeSync(newTheme: any){
  const isDark = theme.themes.value[newTheme]?.dark  || newTheme.includes('dark')
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  let themeMeta = document.querySelector("meta[name='theme-color']") as HTMLMetaElement | null;

  if (!themeMeta) {
    themeMeta = document.createElement('meta');
    themeMeta.name = 'theme-color';
    document.head.appendChild(themeMeta);
  }

  themeMeta.content = isDark ? "#101723" : "#ffffff";
}

watch(()=>theme.global.name.value,
  (newTheme)=>{
    themeSync(newTheme);
  }
)

themeSync(theme.global.name.value);

const router=useRouter();

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