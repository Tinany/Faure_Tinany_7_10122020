import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Connexion/Login.vue'
import SignUp from '../components/Connexion/SignUp.vue'
import store from '../store/index.js'

const isAuthenticated = (req, res, next) => {
  if(!store.getters.authenticated) {
    next({name: 'Login'})
  }
    next()
}

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
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: () => import('../components/Update/UpdateProfile.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/UpdatePost',
    name: 'UpdatePost',
    component: () => import('../components/Update/UpdatePost.vue'),
    beforeEnter: isAuthenticated
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router