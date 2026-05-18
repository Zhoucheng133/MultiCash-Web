import axios, { type AxiosRequestConfig } from 'axios'
import type { RequestResponse } from './types'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

export async function routerHandler(to: RouteLocationNormalizedGeneric): Promise<string | boolean> {
  try {
    const response = await axios.get<RequestResponse>('/api/user/nouser');
    const noUser = response.data.ok && response.data.data;

    if (noUser) {
      if (to.path !== '/register') {
        return '/register';
      }
      return true;
    }

    if (to.path === '/register') {
      return '/login';
    }

    const token = localStorage.getItem('token')
    if (!token) {
      if (to.path !== '/login') return '/login';
      return true;
    }

    const check = await requestWithToken('/api/auth/check', RequestType.get);
    if (!check.ok) {
      localStorage.removeItem('token');
      if (to.path !== '/login') return '/login';
      return true;
    }

    if (to.path === '/login') {
      return '/';
    }
    return true

  } catch (error) {
    console.error('路由守卫异常:', error)
    if (to.path !== '/login') {
      return '/login'
    }
    return true
  }
}

export enum RequestType {
  get = 'get',
  post = 'post',
  delete = 'delete'
}

export async function requestWithToken(url: string, type: RequestType, body?: any): Promise<RequestResponse> {
  const config: AxiosRequestConfig = {
    headers: {
      token: localStorage.getItem('token') || ''
    }
  };
  try {
    let responseData: RequestResponse;
    switch (type) {
      case RequestType.get:
        responseData = (await axios.get<RequestResponse>(url, config)).data;
        break;
      case RequestType.post:
        responseData = (await axios.post<RequestResponse>(url, body ?? {}, config)).data;
        break;
      case RequestType.delete:
        responseData = (await axios.delete<RequestResponse>(url, config)).data;
        break;
      default:
        throw new Error(`Unsupported request type: ${type}`);
    }

    if (responseData?.data === '令牌已过期') {
      
      const isRefreshed = await handleTokenRefresh();
      
      if (isRefreshed) {
        return await requestWithToken(url, type, body);
      } else {
        throw new Error('会话已过期，请重新登录');
      }
    }

    return responseData;

  } catch (error: any) {
    if (error.response?.data?.message === '令牌已过期') {
      const isRefreshed = await handleTokenRefresh();
      if (isRefreshed) {
        return await requestWithToken(url, type, body);
      }
    }
    throw error;
  }
}

async function handleTokenRefresh(): Promise<boolean> {
  try {
    const res = await axios.get<RequestResponse>('/api/auth/refresh');

    if (res.data.ok && res.data.data) {
      localStorage.setItem('token', res.data.data);
      return true;
    }
    return false;
  } catch (err) {
    localStorage.clear(); 
    return false;
  }
}