import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//Components
//.Components

//types
import authTypes from '@/types/auth';
import globalTypes from '@/types/global';
import Login from '@/components/Auth/Login';


//.types


//global store
import {store} from '@/main';
//.global store


//configurar el router
const router = new Router({
  routes: [
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { Auth: false, title: 'Iniciar sesión'},
  beforeEnter: (to,from,next) =>{
    if(store.state.authModule.logged){
      next({path: '/'});
    }else{
      next();
    }
  }
}
  ]
});
//.configurar el router

//para cada cambio de ruta
router.beforeEach((to,from,next) =>{
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged){
    next({path: '/login'});
  }else{
    if(store.state.authModule.logged){

    }
    next();
  }

});
//.para cada cambio de ruta

export default router;
