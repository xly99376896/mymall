<template>
<swiper class="swiper-box">
    <swiper-item class="swiper-item"
                    v-for="item in topImages" :key="item">
        <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
</swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index"

export default {
name: 'DetailSwiper',
 components: {
     Swiper,
     SwiperItem
 },
 props: {
     topImages: {
         type: Array,
         default() {
             return []
         }
     }
 },
 methods: {
     imgLoad() {
         console.log("加载完");
     }
 },
 created() {
     console.log(this.topImages);
 },
}
</script>

<style scoped>
.detail-swiper{

}
.swiper-item{
    height: 330px;
    overflow: hidden;
} 
</style>