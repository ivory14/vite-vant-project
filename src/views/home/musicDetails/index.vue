<template>
  <div class='music_details'>
    <div class="music_card">
      <div class="player" @click="playAndPause">
        <div class="lead-icon " :class="{'lead-active': state}"></div>
        <div class="rotate-block pause start" :class="{active: state}">
          <img :src="musicItem.picurl" alt="">
        </div>
        <div class="pause-icon" v-show="!state"></div>
      </div>
      <div class="title">{{musicItem.name}}</div>
      <div class="author">{{musicItem.artistsname}}</div>
      <div class="audio">
        <audio controls>
          <source :src="musicItem.url" type="audio/ogg">
          <source :src="musicItem.url" type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
    </div>
    <div class="refresh-card">
      <div class="icon" :class="{active: refresh }" @click="randMusicFun"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'; 
import { useRoute, useRouter } from "vue-router";
import { randMusic } from '@/request/api/home'

const { query } = useRoute();

const musicItem = reactive({
  url: '',
  name: '',
  picurl: '',
  artistsname: '',
})
if(query.musicItem){
  const { url, name, picurl, artistsname } = JSON.parse(query.musicItem || {})
  Object.assign(musicItem, {
    url, name, picurl, artistsname
  });
  // Array.from(musicItem, );
  // musicItem.url = musicQ.url;
  // musicItem.name = musicQ.name;
  // musicItem.picurl = musicQ.picurl;
  // musicItem.artistsname = musicQ.artistsname;
}

const state = ref(false);
// 播放或暂停
const playAndPause = () => {
  state.value = !state.value;
  // console.log("state", state.value);
  let audioObj = document.querySelector('audio');
  // console.log("audioObj", audioObj);
  if(audioObj.paused){
    audioObj.play(); // 播放
  }else{
    audioObj.pause(); // 暂停
  }
}
onMounted(() => {
})
// 刷新
const refresh = ref(false);

// 随机网易云音乐
const randMusicFun = async () => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false;
  }, 3010)
  try {
    const { code, data, msg } = await randMusic()
    if (code === 1) {
      const { url, name, picurl, artistsname } = data;
      Object.assign(musicItem, {
        url, 
        name, 
        picurl, 
        artistsname
      });
      // musicItem.url = data.url;
      // musicItem.name = data.name;
      // musicItem.picurl = data.picurl;
      // musicItem.artistsname = data.artistsname;
    } else {
      Toast.fail(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang='scss'>
.music_details {
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-top: 50px;
  background: linear-gradient(180deg,#ff976a,rgba(0, 0, 0, 0));
  .music_card {
    .player {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .lead-icon {
        position: absolute;
        width: 16vw;
        height: 25.73333vw;
        top: -9.5vw;
        right: 33.33333vw;
        transition: 1s;
        transform: rotate(-30deg);
        transform-origin: left top;
        background: url(../../../assets/img/needle.png) no-repeat;
        background-size: contain;
        z-index: 20;
      }
      .lead-active {
        transform: rotate(-7deg)!important;
      }
      .pause {
        animation-play-state: paused !important;
      }
      .active {
        animation-play-state: running !important;
      }
      .start {
        animation: player-rotate 10s linear infinite;
      }
      .rotate-block {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(../../../assets/img/audio-bg.png) no-repeat;
        background-size: contain;
        &::before {
          content: " ";
          // top: 0;
          // left: 0;
          width: 200px;
          height: 200px;
          position: absolute;
          background: url(../../../assets/img/audio-bg-light.png) no-repeat;
          background-size: contain;
        }
        img {
          width: 133px;
          height: 133px;
          object-fit: cover;
          border-radius: 100%;
          background: #f8f8f8;
        }
      }
      .pause-icon {
        width: 42px;
        height: 42px;
        position: absolute;
        background: url(../../../assets/img/pause.png) no-repeat;
        background-size: contain;
      }
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      margin-top: 20px;
      text-align: center;
    }
    .author {
      font-size: 12px;
      color: #818894;
      margin-top: 8px;
      margin-bottom: 40px;
      text-align: center;
    }
    .audio {
      text-align: center;
    }
  }

  .refresh-card {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .icon {
      width: 50px;
      height: 50px;
      background: url(../../../assets/img/refresh.png) no-repeat;
      background-size: contain;
    }
    .active { 
      animation: refresh-rotate 3s ease-out;
    }
  }
}
@keyframes player-rotate {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(360deg)
    }
}
@keyframes refresh-rotate {
    0% {
        transform: rotate(0)
    }
    to {
        transform: rotate(360deg)
    }
}
</style>