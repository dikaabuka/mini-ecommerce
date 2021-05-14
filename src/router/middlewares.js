import $store from '@/store'
import { AuthService } from '@/services/auth.service'

/**
 * Current user state initialization
 * @WARN Must be always first in middleware chain
 */
export async function initCurrentUserStateMiddleware (to, from, next) {
  const currentUserId = $store.state.userModule.currentUser
  if (AuthService.hasRefreshToken() && !currentUserId) {
    try {
      await AuthService.debounceRefreshTokens()
      await $store.dispatch('user/getCurrent')
      next()
    } catch (e) {
    }
  } else {
    next()
  }
}

/**
 * Check access permission to auth routes
 */
export function checkAccessMiddleware (to, from, next) {
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')) ?? { email: '' }

  const isAuthRoute = to.matched.some(item => item.meta.isAuth)

  if (isAuthRoute && currentUserId.email !== '') return next()
  if (isAuthRoute) return next({ name: 'Login' })
  next()
}

export function setPageTitleMiddleware (to, from, next) {
  const pageTitle = to.matched.find(item => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}
