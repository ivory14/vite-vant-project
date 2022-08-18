<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <van-tabbar route v-if="$route.meta.showTab">
      <van-tabbar-item v-for="item in vanTabbarV" :key="item.index" :name="item.home" :icon="item.icon" :to="item.to">
        {{item.lable}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
  const keepAliveRoutes = []
  const vanTabbarV = ref([
    {index: 1, name: 'home', icon: 'home-o', lable: '首页', to: '/home'},
    {index: 2, name: 'search', icon: 'search', lable: '搜索', to: '/search'},
    {index: 3, name: 'friends', icon: 'friends-o', lable: '朋友', to: '/friends'},
    {index: 4, name: 'setting', icon: 'setting-o', lable: '设置', to: '/setting'}
  ])

</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>
