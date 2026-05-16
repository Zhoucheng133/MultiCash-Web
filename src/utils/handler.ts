import axios from 'axios'
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

    const check = await requestWithToken('/api/auth/check', ReuqestType.get);
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

enum ReuqestType{
  get,
  post,
  delete
}

export async function requestWithToken(url: string, type: ReuqestType, body?: any): Promise<RequestResponse> {
  switch (type) {
    case ReuqestType.get:
      return (await axios.get<RequestResponse>(
        url,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )).data
  
    case ReuqestType.post:
      return (await axios.post<RequestResponse>(
        url,
        body ?? {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )).data

    case ReuqestType.delete:
      return (await axios.delete<RequestResponse>(
        url,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )).data
  }
}
