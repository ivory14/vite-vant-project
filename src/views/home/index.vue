<template>
  <div class="home">
    <van-tabs v-model:active="active" @change="changeTabName">
      <van-tab v-for="index in 6" :title="'标签 ' + index">
        <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="finishedText"
            @load="onLoad">
            
            <van-image 
              width="10rem"
              height="10rem"
              fit="scale-down"
              v-for="item in list" :key="item" :src="item">
            </van-image>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { opUomgUrl } from '@/request/api'
import { Toast } from 'vant';
// console.log("opUomgUrl", opUomgUrl);
const active = ref(0);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const finishedText = ref('没有更多了')
const refreshing = ref(false);
const count = ref(0);

const changeTabName = (name) => {
  console.log("name", name);
  active.value = name;
  list.value = []
  onRefresh();
}
// 下拉刷新
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
// 加载
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  if(active.value === 0){
    lofterImg();
  }else {
    randTaobImg();
  }
  
  // setTimeout(() => {
  //   if (refreshing.value) {
  //     list.value = [];
  //     refreshing.value = false;
  //   }

  //   for (let i = 0; i < 10; i++) {
  //     list.value.push(list.value.length + 1);
  //   }
  //   loading.value = false;
    
  //   if (list.value.length >= 40) {
  //     finished.value = true;
  //     setTimeout(() => {
  //       finishedText.value = '';
  //     }, 2000)
  //   }
  // }, 1000);
};
// 将LOFTER（乐乎）的首页壁纸解析出来
const lofterImg = async () => {
  try {
    const { code, data } = await opUomgUrl({
      method: 'get',
      url: 'image.lofter?format=json',
    })
    if(code === 1) {
      data.forEach((item) => {
        list.value.push(item);
      })
      loading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
// 随机输出淘宝买家秀图片
const randTaobImg = async () => {
  // sort  胖次猫|七了个三
  try {
    const { code, imgurl, msg } = await opUomgUrl({
      method: 'get',
      url: 'rand.img3?sort=七了个三&format=json',
    })
    if(code === 1) {
      list.value.push(imgurl);
      // data.forEach((item) => {
      //   list.value.push(item);
      // })
      loading.value = false;
    }else{
      list.value = [];
      // loading.value = true;
      finished.value = true;
      Toast.fail(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 2px;
}
.van-pull-refresh {
  min-height: calc(100vh - 100px);
}
.van-list {
  margin-bottom: 50px;
}

</style>