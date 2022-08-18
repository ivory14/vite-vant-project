<template>
  <div class="home">
    <van-tabs v-model:active="active" @change="changeTabName">
      <van-tab v-for="item in tabList" :title="item.title" :name="item.name">
        <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model:loading="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">

            <template v-if="item.id < 3">
              <van-image width="10rem" height="10rem" fit="scale-down" v-for="item in list" :key="item" :src="item">
              </van-image>
            </template>
            <template v-if="item.id == 3">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </template>
            <template v-if="item.id == 4">
              <div class="music" v-for="item in musiclist" :key="item.name" @click="gotoMusicDetails(item)">
                <div class="left">
                  <van-image
                    width="100%"
                    height="100%"
                    fit="cover"
                    :src="item.picurl"
                  />
                </div>
                <div class="right">
                  <h3>{{item.name}}</h3>
                  <p>{{item.artistsname}}</p>
                </div>
              </div>
            </template>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { lofterImg, randQinghua, randTaobImg, randMusic } from '@/request/api/home'
import { Toast } from 'vant';
import { useRoute, useRouter } from "vue-router";

const { push } = useRouter();
const active = ref(1);
const tabList = ref([
  {id: 1, title: '壁纸', name: 1},
  {id: 2, title: '图片', name: 2},
  {id: 3, title: '情话', name: 3},
  {id: 4, title: '音乐', name: 4},
])
const list = ref([]);
const musiclist = ref([])
const loading = ref(false);
const finished = ref(false);
const finishedText = ref('没有更多了')
const refreshing = ref(false);

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
  switch (active.value) {
    case 1:
      lofterImgFun();
      break;
    case 2:
      randTaobImgFun();
      break;
    case 3:
      randQinghuaFun();
      break;
    case 4:
      randMusicFun();
      break;
  //   default:
  //     console.log("没有 active.value", active.value);
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
const lofterImgFun = async () => {
  try {
    const { code, data } = await lofterImg()
    if (code === 1) {
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
const randTaobImgFun = async () => {
  // sort  胖次猫|七了个三
  try {
    const { code, imgurl, msg } = await randTaobImg();
    if (code === 1) {
      list.value.push(imgurl);
      // data.forEach((item) => {
      //   list.value.push(item);
      // })
      loading.value = false;
    } else {
      list.value = [];
      // loading.value = true;
      finished.value = true;
      Toast.fail(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
// 随机输出土味情话
const randQinghuaFun = async () => {
  try {
    const { code, content, msg } = await randQinghua()
    if (code === 1) {
      list.value.push(content);
      // 加载还在继续
      loading.value = false;
    } else {
      // list.value = [];
      finished.value = true;
      Toast.fail(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
// 随机网易云音乐
const randMusicFun = async () => {
  try {
    const { code, data, msg } = await randMusic()
    if (code === 1) {
      musiclist.value.push(data);
      // 加载还在继续
      loading.value = false;
    } else {
      // list.value = [];
      finished.value = true;
      Toast.fail(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
// 去到音乐详情
const gotoMusicDetails = (item) => {
  console.log("item", item);
  push({
    path: '/musicDetails',
    query: {
      musicItem: JSON.stringify(item),
      // url: item.url,
      // name: item.name,
      // picurl: item.picurl,
      // artistsname: item.artistsname,
    }
  })
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

.music {
  display: flex;
  padding-left: 15px;
  margin-bottom: 15px;
  .left {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 10px;
  }
  .right {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>