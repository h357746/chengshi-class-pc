<template>
<!-- 轮播图 -->
  <div class="recommendPage">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        class="swiper-slide"
        v-for="(banner, index) in banners"
        :key="index">
        <img src="@/static/images/banner@2x.png" class="swiper-lazy" />
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SwiperL',

  title: 'Pagination / Dynamic bullets',

  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      banners: [
        '@/static/images/banner.png',
        '@/static/images/banner.png',
        '@/static/images/banner.png',
        '@/static/images/banner.png'
      ],
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.recommendPage .swiper-container {
  position: relative;
  width: 100%;
  background: pink;
}

.swiper img {
  width: 100%;
  height: 100%;
}

.recommendPage .swiper-container .swiper-slide {
  width: 100%;
  background: yellowgreen;
  color: #000;
  font-size: 1rem;
  text-align: center;
  --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 1.875rem; /* 设置按钮大小 */
}

.swiper-button-prev:after {
  color: rgba(255, 255, 255, 0.39);
  font-size: 1rem;
}

.swiper-button-next:after {
  color: rgba(255, 255, 255, 0.39);
  font-size: 1rem;
}

/*自定义样式*/
.swiper-button-prev {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.31);
}

.swiper-button-next {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.31);
}

.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
