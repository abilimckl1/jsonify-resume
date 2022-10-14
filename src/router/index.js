import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JsonifyView from '../views/JsonifyView.vue'
import DynamicResume from '../views/DynamicResume.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/jsonify',
    name: 'jsonify',
    component: JsonifyView
  },
  {
    path: '/resume/:id',
    name: 'DynamicResume',
    component: DynamicResume,
    props: true
  },

  //404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
