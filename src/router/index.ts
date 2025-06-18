import { createRouter, createWebHashHistory } from 'vue-router'
import { getVersion,isMobile } from "@/utils/index"
import pcRouter from "@/router/pcRouter"
import mobileRouter from "@/router/mobileRouter"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: isMobile() ? mobileRouter : pcRouter,
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
