export default [
    {
        path: '/Index',
        name: 'Index',
        component: () => import('../views/mobile/IndexView.vue'),
        meta: {
            keepAlive: true
        }

    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/mobile/UserView.vue'),
        meta: {
            keepAlive: true
        }

    },
    {
        path: '/poinSuccess',
        name: 'PoinSuccess',
        component: () => import('../views/mobile/PoinSuccessView.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/mobile/RegisterView.vue'),
    }
]
