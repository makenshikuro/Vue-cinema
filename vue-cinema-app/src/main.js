import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';

//vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:333/api/v1/';
Vue.http.interceptors.push((request,next) =>{
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});

//.vue resource

//vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//.vuex

//blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);
//.blockui

//modulos y tipos
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
//.modulos y tipos

//vee-validate
import VeeValidate, {Validator} from 'vee-validate';
import validatorEs from '@/Validator/es';
import validatorEn from '@/Validator/en';
Validator.localize('es', validatorEs);
Vue.use(VeeValidate);
//.vee-validate

//vue-tables-2
import {ClientTable} from 'vue-tables-2';
Vue.use(ClientTable, {}, false,'bootstrap3','default');
//.vue-tables-2


//almacen global de datos con vuex
export const store = new Vuex.Store({
  state: {
    processing: false,
    language: 'es'

  },
  actions: {
    [globalTypes.actions.changeLanguage]: ({commit}, lang) => {
      switch(lang){
        case 'en': {
          Validator.localize('en', validatorEn);
          break;
        }
        case 'es': {
          Validator.localize('es', validatorEs);
          break;
        }
      }
      commit(globalTypes.mutations.setLanguage,lang);
    }
    //TODO Validator con traducciones

  },
  getters:{
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language,

  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state){
      state.processing = true;
    },
    [globalTypes.mutations.stopProcessing] (state){
      state.processing = true;
    },
  [globalTypes.mutations.setLanguage] (state,lang) {
    state.language = lang;
  }
  },
  modules: {
    authModule
  }
});

//.almacen global de datos con vuex

//vue traducciones
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from '@/translations';
const i18n = new VueI18n({
  locale: store.state.language,
  messages
});
//.vue traducciones

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router
})
