import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Connexion/Login.vue'
import SignUp from '../components/Connexion/SignUp.vue'

const isAuthenticated = (req, res, next) => {
  if(localStorage.getItem('user') === null) {
    next({name: 'Login'})
  } else {
    localStorage.getItem('user')
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
    component: () => import('../components/Profile/Profile.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: () => import('../components/Update/UpdateProfile.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/UpdatePost/:id',
    name: 'UpdatePost',
    component: () => import('../components/Update/UpdatePost.vue'),
    beforeEnter: isAuthenticated
  },
  {
  path: '/Post/:id',
  name: 'Post',
  component: () => import('../components/Posts/Post.vue'),
  beforeEnter: isAuthenticated
  },
  {
    path: '/UsersList',
    name: 'UsersList',
    component: () => import('../components/Moderator/UsersList.vue'),
    beforeEnter: isAuthenticated
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router