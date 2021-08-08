import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Connexion/Login.vue'
import SignUp from '../components/Connexion/SignUp.vue'
import Header from '../components/Header.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp',
    name: SignUp,
    component: () => import('../components/Connexion/SignUp.vue')
  },
  {
    path: '/Header',
    name: 'Header',
    component: Header
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: () => import('../components/Update/UpdateProfile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router