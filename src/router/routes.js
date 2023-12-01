const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      {
        path: '/posts/:id',
        component: () => import('pages/detail.vue'),
        meta: { width: '800px' },
      },
      {
        path: '/post/edit/:id',
        component: () => import('pages/edit.vue'),
        meta: { width: '800px' },
      },
      {
        path: '/mypage',
        component: () => import('pages/mypage.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/mypages/profile.vue'),
          },
          {
            path: 'profile',
            component: () => import('pages/mypages/profile.vue'),
          },
          {
            path: 'bookmark',
            component: () => import('pages/mypages/bookmark.vue'),
          },
          {
            path: 'password',
            component: () => import('pages/mypages/password.vue'),
          },
        ]
      },
      {
        path: 'vueuse',
        component: () => import('pages/vuruse/index.vue'),
      },
      {
        path: '/home',
        component: () => import('pages/home.vue'),
        meta: { width: '600px' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
