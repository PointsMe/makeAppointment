export default [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/IndexView.vue'),
      meta: {
        keepAlive:true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/poinSuccess',
      name: 'PoinSuccess',
      component: () => import('../views/PoinSuccessView.vue'),
    },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue'),
      }
]
    