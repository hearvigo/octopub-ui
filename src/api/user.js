import httpclient from '@/utils/httpclient'
import Vue from 'vue'

export function login(data) {
  return httpclient({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return httpclient({
    url: '/api/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return httpclient({
    url: '/api/v1/user/logout',
    method: 'post'
  })
}

export function getKeycloakInfo(token) {
  return new Promise((resolve, reject) => {
    if (!Vue.prototype.$keycloak) {
      reject('keycloak not init')
    }

    if (!Vue.prototype.$keycloak.authenticated) {
      reject('keycloak not authenticated')
    }

    const roles = Vue.prototype.$keycloak.realmAccess.roles
    const name = Vue.prototype.$keycloak.idTokenParsed.preferred_username
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'

    const data = {
      roles,
      name,
      avatar
    }
    resolve(data)
  })
}

export function keycloakLogout() {
  return Vue.prototype.$keycloak.logout()
}
