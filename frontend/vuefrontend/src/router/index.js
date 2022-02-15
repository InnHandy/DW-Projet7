import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";


Vue.use(VueRouter)

const routes = [
  {

    name: 'login',
    path: '/login', 
    component: Login,
  },
  { 
    name: 'signup',
    path: '/signup', 
    component: Signup, 
    props:true 
  },
  {
    
  }
]

const router = new VueRouter({
  routes
})

export default router
