import { createRouter, createWebHashHistory } from 'vue-router'
import { isMobileDevice } from "@/utils/index"
import pcRouter from "@/router/pcRouter"
import mobileRouter from "@/router/mobileRouter"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: isMobileDevice() ? mobileRouter : pcRouter,
  scrollBehavior() {
    // to, from, savedPosition
    createWebHashHistory
    return { top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
