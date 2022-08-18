import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '远大课后平台-家长端',
      showTab: true,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@V/home/index.vue'),
    meta: {
      title: '首页',
      showTab: true,
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@V/search/index.vue'),
    meta: {
      title: '搜索',
      showTab: true,
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('@V/friends/index.vue'),
    meta: {
      title: '朋友',
      showTab: true,
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@V/setting/index.vue'),
    meta: {
      title: '设置',
      showTab: true,
    }
  },
]




const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
});
// 改变页面标题
router.beforeResolve((to, from, next) => {
  document.title = `${to.meta.title}`;
  next()
});
export default router;