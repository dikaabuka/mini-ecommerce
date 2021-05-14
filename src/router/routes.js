import { DOMAIN_ALIAS } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Login.vue'),
    meta: { isAuth: true, title: `${DOMAIN_ALIAS} | Home` }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/pages/Shop.vue'),
    meta: { isAuth: true, title: `${DOMAIN_ALIAS} | Shop` }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { title: `${DOMAIN_ALIAS} | Login` }
  },
  {
    name: 'NotFound',
    path: '*',
    component: () => import('@/pages/NotFound.vue'),
    meta: { title: `${DOMAIN_ALIAS} | 404 Not Found` }
  }
]
