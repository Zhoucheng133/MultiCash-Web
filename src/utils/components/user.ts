import axios from "axios";

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