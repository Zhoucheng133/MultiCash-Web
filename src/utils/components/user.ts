import axios from "axios";
import { RequestType, requestWithToken } from "../handler";

export async function registerHandler(username: string, password: string, repassword: string): Promise<string | boolean> {
  if (!username.trim()) {
    return '请输入用户名';
  }else if (!password) {
    return '请输入密码';
  }else if (!repassword) {
    return '请再次输入密码';
  }else if (password !== repassword) {
    return '两次输入的密码不一致';
  }

  const {data: response}=await axios.post('/api/user/register', {username, password});
  if(!response.ok){
    return response.data;
  }

  return true;
}

export async function loginHandler(username: string, password: string): Promise<string | boolean> {
  if (!username.trim()) {
    return '请输入用户名';
  }else if (!password) {
    return '请输入密码';
  }

  const {data: response}=await axios.post('/api/user/login', {username, password});
  if(!response.ok){
    return response.data;
  }

  localStorage.setItem('token', response.data);

  return true;
}

export async function logoutHandler(linkToLogin=true): Promise<void> {
  await axios.post('/api/user/logout');
  localStorage.removeItem('token');
  if(linkToLogin){
    window.location.href="/login";
  }
}

export async function changePasswordHanlder(oldPassword: string, newPassword: string): Promise<string | boolean> {
  if (!oldPassword.trim()) {
    return '请输入当前账户密码';
  }else if (!newPassword) {
    return '请输入新密码';
  }else if(newPassword == oldPassword){
    return '新密码不能与当前密码相同';
  }

  const response =  await requestWithToken("/api/user/changepwd", RequestType.post, {
    password: oldPassword,
    newPassword
  })
  if(!response.ok){
    return response.data;
  }
  await logoutHandler(false);
  return true;
}