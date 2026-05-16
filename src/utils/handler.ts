import axios from 'axios'
import type { RequestResponse } from './types'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

export async function routerHandler(to: RouteLocationNormalizedGeneric): Promise<string> {

  if(to.path === '/login' || to.path === '/register'){
    return to.path
  }

  try {
    let response = await axios.get<RequestResponse>('/api/user/nouser')
    if(response.data.data === true){
      return '/register'
    }

    const validToken = await requestWithToken('/api/user/nouser', ReuqestType.get)

    if(validToken.data){
      return '/'
    }else{
      return '/login'
    }

  } catch (error) {
    return "/login"
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