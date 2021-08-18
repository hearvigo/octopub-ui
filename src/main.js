import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control

import Keycloak from 'keycloak-js'

import '@/authorize'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

initKeycloak(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})

function initKeycloak(callback) {
  const initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_OPTIONS_URL,
    realm: process.env.VUE_APP_KEYCLOAK_OPTIONS_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_OPTIONS_CLIENTID,
    onLoad: process.env.VUE_APP_KEYCLOAK_OPTIONS_ONLOAD
  }

  const keycloak = Keycloak(initOptions)

  keycloak.init({ onLoad: initOptions.onLoad, promiseType: 'native' }).then(async authenticated => {
    if (authenticated) {
      Vue.prototype.$keycloak = keycloak
      await store.dispatch('user/setToken', keycloak.token)

      setTimeout(() => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed' + refreshed)
          } else {
            console.log('Token not refreshed, valid for ' +
              Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
          }
        }).catch(error => {
          console.log('Failed to refresh token', error)
        })
      }, 5000)

      callback()
    }
  }).catch(error => {
    console.log('init keycloak error', error)
  })
}
