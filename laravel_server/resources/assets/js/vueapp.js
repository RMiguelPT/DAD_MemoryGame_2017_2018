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
// Vue.use(VueSocketio, 'http://192.168.10.1:8080');

const user = Vue.component('user', require('./components/user.vue'));
const singleplayer_game = Vue.component('singleplayer', require('./components/singleplayer.vue'));
const multiplayer_game = Vue.component('multiplayer', require('./components/multiplayer.vue'));

const routes = [{
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    component: user
  },
  {
    path: '/singleplayer',
    component: singleplayer_game
  },
  {
    path: '/multiplayer',
    component: multiplayer_game
  }
];

const router = new VueRouter({
  routes: routes,
  history: true,
  mode: 'history'
});

const store = new Vuex.Store({
  state: {
    user: {
      id: sessionStorage.getItem("id"),
      nickname: sessionStorage.getItem("nickname"),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem("token")
      }
    }
  }
});

const app = new Vue({
  router,
  data: {
    player1: undefined,
    player2: undefined,
    player3: undefined,
    player4: undefined
  }
}).$mount('#app');