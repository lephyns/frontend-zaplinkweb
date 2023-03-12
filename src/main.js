import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use((config) => { //Aqui estamos interceptando todas as requisições do axios e estamos adicionando o token de autorização dentro do headers
  const userToken = localStorage.getItem('user_token') //No arquivo Login.vue adicionamos o token do usuário dentro de localStorage e aqui estamos obtendo o token através do getItem
  
  if(userToken) {
    config.headers.Authorization = userToken //Adicionado o token de autorização dentro do headers
  }  
  return config //Retorna a nova configuração que faz a interceptação das chamadas na API e adiciona automaticamente o token dentro do autorization  
}, (error) => Promise.reject(error)) //Se o .use apresentar error será devolvido uma promessa

Vue.use(Buefy)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')





