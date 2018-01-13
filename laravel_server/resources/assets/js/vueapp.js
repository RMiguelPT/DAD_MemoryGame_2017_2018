/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

//import shuffle from 'shuffle-array';

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueSocketio, 'http://192.168.10.10:8080');

const dash = Vue.component('user', require('./components/dashboard.vue'));
const singleplayer_game = Vue.component('singleplayer', require('./components/singleplayer.vue'));
const multiplayer_game = Vue.component('multiplayer', require('./components/multiplayer.vue'));
const login = Vue.component('login', require('./components/login.vue'));
const index = Vue.component('index', require('./components/index.vue'));


const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/login', component: login }, 
  { path: '/dash',component: dash},
  { path: '/singleplayer',component: singleplayer_game},
  { path: '/multiplayer',component: multiplayer_game}
];

const router = new VueRouter({
  routes: routes,

});

const store = new Vuex.Store({
  state: {
    user: {
      id: '',
      nickname: '',
      admin: '',
      refresh: '',
      headers: {
        Accept: 'application/json',
        Authorization: ''
      }
    }
  },
getters: {

  getNickname (state){

    return state.user.nickname;
  }

}

});

const app = new Vue({
  router,
  store,
  data: {
    player1: undefined,
    player2: undefined,
    player3: undefined,
    player4: undefined
  }
}).$mount('#app');