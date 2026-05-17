<template>
  <main class="auth-page register-page">
    <section class="auth-panel">
      <div class="auth-copy">
        <v-chip class="auth-chip" color="teal" variant="tonal" size="small">
          初始账户
        </v-chip>
        <h1>创建账户</h1>
        <p>设置一个用户名和密码，开始使用 MultiCash 记录你的资金流动。</p>
      </div>

      <div class="auth-card shadow-lg">
        <v-card-item class="auth-card-header">
          <v-avatar class="auth-avatar" color="teal" size="48">
            <v-icon icon="mdi-account-plus-outline" size="26" />
          </v-avatar>
          <v-card-title>注册</v-card-title>
          <v-card-subtitle>确认两次输入的密码一致</v-card-subtitle>
        </v-card-item>

        <v-alert type="error" color="red" class="ml-4 mr-4" v-if="errorMsg.length!=0">{{ errorMsg }}</v-alert>

        <v-form v-model="valid" class="auth-form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model.trim="username"
            :rules="usernameRules"
            autocomplete="username"
            color="teal"
            label="用户名"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
          />

          <v-text-field
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            color="teal"
            label="密码"
            prepend-inner-icon="mdi-key-outline"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
          />

          <v-text-field
            v-model="confirmPassword"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :rules="confirmPasswordRules"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            color="teal"
            label="再次输入密码"
            prepend-inner-icon="mdi-shield-check-outline"
            variant="outlined"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
          />

          <v-btn
            block
            class="auth-submit"
            color="teal"
            :disabled="!canSubmit"
            rounded="lg"
            size="large"
            type="submit"
            variant="flat"
          >
            注册
          </v-btn>
        </v-form>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import type { RequestResponse } from '../utils/types'
import { useRouter } from "vue-router"

const router=useRouter();
const valid = ref(false)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMsg = ref('');

const usernameRules = [
  (value: string) => !!value || '请输入用户名',
  (value: string) => value.length >= 3 || '用户名至少 3 个字符',
]

const passwordRules = [
  (value: string) => !!value || '请输入密码',
]

const confirmPasswordRules = [
  (value: string) => !!value || '请再次输入密码',
  (value: string) => value === password.value || '两次输入的密码不一致',
]

const canSubmit = computed(
  () =>
    valid.value &&
    username.value.length > 0 &&
    password.value.length > 0 &&
    confirmPassword.value.length > 0 &&
    password.value === confirmPassword.value,
)

async function handleSubmit() {
  if (!canSubmit.value) return;

  const {data: response}=await axios.post<RequestResponse>('/api/user/register', {
    username: username.value,
    password: password.value,
  });
  if(response.ok) {
    router.replace("/login");
  }else{
    errorMsg.value = response.data;
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background:
    radial-gradient(circle at top right, rgba(0, 150, 136, 0.16), transparent 34rem),
    linear-gradient(135deg, #f7fbfb 0%, #eef6f5 50%, #f9fbff 100%);
}

.auth-panel {
  width: min(100%, 980px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  align-items: center;
  gap: 56px;
}

.auth-copy {
  color: #162a2b;
}

.auth-chip {
  margin-bottom: 22px;
  font-weight: 700;
}

.auth-copy h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0;
}

.auth-copy p {
  max-width: 440px;
  margin: 18px 0 0;
  color: #5c6f74;
  font-size: 17px;
  line-height: 1.7;
}

.auth-card {
  width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(18px);
}

.auth-card-header {
  padding: 34px 34px 10px;
  text-align: center;
}

.auth-avatar {
  margin: 0 auto 18px;
}

.auth-card :deep(.v-card-title) {
  font-size: 24px;
  font-weight: 750;
  line-height: 1.25;
}

.auth-card :deep(.v-card-subtitle) {
  margin-top: 8px;
  color: #6b7b80;
  opacity: 1;
}

.auth-form {
  display: grid;
  gap: 18px;
  padding: 26px 34px 34px;
}

.auth-submit {
  margin-top: 4px;
  font-weight: 700;
}

@media (max-width: 780px) {
  .auth-page {
    align-items: start;
    padding: 24px 18px;
  }

  .auth-panel {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .auth-copy {
    text-align: center;
  }

  .auth-copy h1 {
    font-size: 34px;
  }

  .auth-copy p {
    max-width: 100%;
    font-size: 15px;
  }

  .auth-card-header {
    padding: 28px 22px 8px;
  }

  .auth-form {
    padding: 22px;
  }
}
</style>
