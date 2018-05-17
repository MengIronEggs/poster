<template>
  <div style="width:100%;height:100%;">
      <swiper :options="swiperOption" style="height:100%;">
        <swiper-slide class="slide">
            <img class="ImgText" src="../assets/index_text.png" alt =""/>
            <img class="imgPos" src="https://img.guoanfamily.com/poster/poster_index.jpg" alt="" />
            <img class="ImgLogo" src="../assets/index_logo.png" alt =""/>
        </swiper-slide>
        <swiper-slide :key="index" v-for="(item,index) in swiperListArr" class="slide" style="position:relative;">
            <div class = 'text'>
              <div>刘鑫总教你解读：</div>
              <div>EOD模式如何引领城乡一体化发展</div>
            </div>
            <img class = "imgPos" :src="item.Bgimg" alt="" />
            <div class="textarea">
              <div style="width:100%;height:100%;position:relative;">
                <div class="smallDiv">
                  <span></span>{{item.Programname}}<span></span>
                </div>
              <div>
              </div>
                <pre style="width:100%;height:100%;overflow-y:visible;word-break:break-all;white-space: pre-wrap;display:block;text-indent:-99px;">
                  {{item.Programdisc}}
                </pre>
                
              </div>
            </div>
        </swiper-slide>
        <swiper-slide class="slide" style="width:100%;height:100%;">
            <img ref="" class="imgPos" src="https://img.guoanfamily.com/poster/poster_last.jpg" alt="" />
            <img ref="" class="last_Text" src="../assets/last_text.png" alt="" />
            <img ref="" class="last_erweima" src="../assets/erweima.png" alt="" />
            <img ref="" class="last_logo" src="../assets/last_logo.png" alt="" />
        </swiper-slide>
      </swiper>
      <div class="arrow" id="arrowSlide"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textareaVal: "",
      itemPhoto: "",
      swiperListArr: [],
      maxOrderNumber: 0,
      swiperOption: {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        mousewheel: true,
	      watchSlidesProgress: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".arrow",
          prevEl: ".swiper-button-prev"
        },
        direction: 'vertical',
        mousewheel: true,
        watchSlidesProgress: true,
        on:{
          init: function() {
            this.myIndex = 0;//activeIndex在滑动到一半时会切换，改用滑动完再切换的myIndex
          },
          progress: function() {
          for (var i = 0; i < this.slides.length; i++) {
            var slide=this.slides.eq(i);
            var progress = this.slides[i].progress;
            var translate, boxShadow;
            translate = progress * this.height * 0.8;
            var scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            if (i == this.myIndex) {
              slide.transform('translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
              slide.css({'z-index':0,'boxShadow':'0px 0px 10px rgba(0,0,0,.5)'});
            }
          }
        },
        transitionEnd: function() {
          this.myIndex = this.activeIndex;
          for (var i = 0; i < this.slides.length; i++) {
          var slide=this.slides.eq(i);
          slide.transform('');
          slide.css('z-index',1);
          }
          this.mousewheel.enable();
        },
        setTransition: function(speed) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide=this.slides.eq(i);
            slide.transition(speed + 'ms');
          }
          this.mousewheel.disable();
        }
        }


      },
      
      swiperOption2: null,
      name: "",
      role: "",
      Membertitle: "",
      Memberlike: "",
      xuanyu: "",
      company: "",
      arr: []
    };
  },
  methods: {   
    // 数据加载接口
    photoOnLoad() {
      this.$vux.loading.show({
       text: '内容加载中'
      })
      let geturl = "https://mt.guoanfamily.com/ebook/ebookquerybyvo?volumn=2";
      this.$http.get(geturl).then(
        response => {
          this.loadImg(response.body.Data)
          this.swiperListArr = response.body.Data;
        },
        response => {
          this.showalert('网络超时');
        }
      );
    },
    async loadImg(data){
      //await this.waitload(data);
      await new Promise((resolve, reject)=>{
        //  console.log(data)
         let imgcount=0;
         data.map((item,index)=>{
          // item.Bgimg
          let img = new Image();
          // console.log(img);
          img.src = item.Bgimg;
          img.onload = ()=>{            
            item.Bgimg = img.src;
            imgcount++;
            // console.log(imgcount,data.length)
            if(imgcount==data.length){
              //this.$vux.loading.hide();
              resolve();
            }
          }
        })
        
       })
       this.$vux.loading.hide();
    },
    // 提示窗口
    showalert(msg) {
      // 显示
      this.$vux.alert.show({
        title: "提示信息",
        content: msg
      });
    },
  },
  
  mounted() {
    this.photoOnLoad();
  }
};
</script>

<style lang="less" scoped>
.ImgText{
  position: absolute;
    width: 70%;
    top: 35px;
    right: 20px
}
.ImgLogo{
  position: absolute;
    left: 35%;
    bottom: 85px;
    width: 30%;
}
.last_Text{
    position: absolute;
    left: 17%;
    top: 25%;
    width: 66%;
}
.last_erweima{
 position: absolute;
    left: 40%;
    top: 58%;
    width: 20%;
}
.last_logo{
    position: absolute;
    left: 20%;
    bottom: 85px;
    width: 54%;
}
.smallDiv {
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  color: #fff;
  height: 40px;
  background: #d7000f;
  position: absolute;
  right: -10px;
  top: -50px;
  z-index: 5;
  padding-left:10px;
  padding-right:10px;
  font-size:16px;
}
.imgDiv {
  width: 250px;
  height: 350px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  position: relative;
}
.arrow {
  position: fixed;
  left: 0;
  // top: 0;
  bottom: 20px;
  right: 0;
  margin: auto;
  background: url("../assets/arrow.png") no-repeat center;
  background-size: 100%;
  width: 40px;
  height: 40px;
  z-index: 8;
  animation: scals 0.5s infinite linear alternate;
}
.imgPos{
    height:100%;
    margin:0 auto;
}
@keyframes scals {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(5px);
  }
}
.slide {
  // margin-bottom: 0 !important;
  width: 100%;
  height: 100%;
  overflow:hidden;
  .topbj {
    width: 100%;
    vertical-align: middle;
  }
  .text{
    position:absolute;
    z-index:20;
    margin:10px 0 0 20px;
    div{
      line-height:16px;
    }
    div:nth-child(1){
      font-size:14px;
      color:#ffffff;
    }
    div:nth-child(2){
      font-size:16px;
      color:#ffffff;
      font-weight:600;
    }
  }
  .textarea {
    width: 82%;
    position: absolute;
    right: 0;
    bottom: 120px;
    opacity: 0.8;
    background: #000;
    color: #ffffff;
    padding: 20px 10px 0px 10px;
    font-size: 12px;
    border-radius: 3px;
  }
  .inputArea {
    width: 100%;
    height: 100%;
    border: none;
    padding: 10px;
    font-size: 16px;
  }
  .nameList {
    padding-left:15px;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 80px;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#000000), to(rgba(0, 0, 255, 0)));
    .smallslide {
      height: 80px !important;
      width: 65px !important;
      margin-right: 15px !important;
      text-align: center;
      .swiper-wrapper {
        transform: none;
      }
      .thumbnail {
        display: inline-block;
      }
      img {
        // width: 100%;
        width: 100%;
      }
    }
    
  }
}
/* 遮罩层 */

.market {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  z-index: 10;
}

.bigPhoto {
  // background:red;
  width: 76%;
  bottom: 15%;
  z-index: 11;
  position: absolute;
  top: 10%;
  left: 13%;
  text-align: center;
  .xuanyu {
    width: 100%;
    height: 100px;
    div {
      font-size: 30px;
      color: #fff;
      text-align: center;
      font-weight: 500;
    }
    span {
      color: #fff;
      float: right;
      font-size: 20px;
    }
  }
}
.nameInfo {
  width: 60%;
  // height: 90px;
  // background: url("../assets/aletName.png") no-repeat center;
  // background-size: 100%;
  background: #d7000f;
  position: absolute;
  bottom: 0px;
  right: -35px;
  font-style: italic;
  text-align: left;
}
.nameInfoComP {
  bottom: 0;
  background: none;
  font-size: 12px;
  padding-left: 10px;
  color: #fff;
  width: 50%;
  text-align: left;
  margin-top: 10px;
  float: right;
  color:#fff;
}
.close {
  width: 30px;
  height: 30px;
  background: url("../assets/close.png") no-repeat center;
  background-size: 100%;
  position: absolute;
  right: -20px;
  top: -5px;
  z-index: 11;
}

.pop-image {
  width: 250px;
  height: 350px;
  margin: 0 auto;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
