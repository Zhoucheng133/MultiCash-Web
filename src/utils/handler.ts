import axios from 'axios'
import type { RequestResponse } from './types'
import type { NavigationGuardReturn, RouteLocationNormalizedGeneric } from 'vue-router'

export async function routerHandler(to: RouteLocationNormalizedGeneric): Promise<NavigationGuardReturn> {
  const userCheckedPaths = new Set(['/login', '/register'])

  if(!userCheckedPaths.has(to.path)){
    return true
  }

  try {
    const response = await axios.get<RequestResponse>('/api/user/nouser')
    const noUser = response.data.ok && response.data.data

    if(noUser && to.path !== '/register'){
      return '/register'
    }

    if(!noUser && to.path === '/register'){
      return '/login'
    }

    return true
  } catch (error) {
    if(to.path !== '/login'){
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
