<template>
  <div id="app" style="width:100%;height:100%;">
    <!-- <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px"> -->
    <!--<router-view></router-view>-->
    <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"> -->
    <keep-alive>  
      <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
    <div v-bind:class="{'stopmusic':play, 'music':!play}" v-on:click='onPlay'>
        <a id="mc_play" class="on">
            <audio id="music_play_filter" loop="loop" ref="audioplayer">
                <source src="https://img.guoanfamily.com/poster/posterBj.mp3" type="audio/mpeg">
            </audio>
        </a>
    </div>
  </div>
</template>

<script>
import { ViewBox } from "vux";
export default {
  components: {
    ViewBox
  },
  data() {
    return {
      direction: "forward",
      tostack: [],
      hlenght: 0,
      play: false
    };
  },
  methods: {
    onPlay() {
      this.play = !this.play;
      if (this.play) {
        this.$refs.audioplayer.play();
      } else {
        this.$refs.audioplayer.pause();
      }
    }
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      //初始化时放入当前地址,多数为'/'
      if (this.tostack.length == 0) {
        this.tostack.push(from.path);
      }
      if (
        this.tostack.length > 1 &&
        this.tostack[this.tostack.length - 2] == to.path
      ) {
        this.tostack.pop();
        this.direction = "backward";
      } else {
        this.tostack.push(to.path);
        this.direction = "forward";
      }
      next();
    });
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/tap.less";
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  // -webkit-overflow-scrolling: touch;
  background: #000000;
}

.router-view {
  width: 100%; //top: 46px;
}
.music {
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  border-radius: 50%;
  right: 1rem;
  top: 0.5rem;
  background: url(./assets/mcbg.png) no-repeat;
  background-size: 100%;
  background-position: left bottom;
  z-index: 10;
 
}
@keyframes reverseRotataZ {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-360deg);
  }
}
@keyframes rotataZ {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
.stopmusic {
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  border-radius: 50%;
  right: 1rem;
  top: 0.5rem;
  background: url(./assets/mcbg.png) no-repeat;
  background-size: 100%;
  background-position: left top;
  z-index: 8;
   animation: rotataZ 1.2s linear infinite;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%; //top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.menu-title {
  color: #888;
}
</style>
