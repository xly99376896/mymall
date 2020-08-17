<template>
<div id="detail" name="Detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import DetailSwiper from './childComps/DetailSwiper'
import {getDetail, Goods} from '@/network/detail'

export default {
 name: 'Detail',
 components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo
 },
 data() {
     return {
         topImages: [],
         iid: null,
         goods: {}
     }
 },

data() {
     return {
         
     }
 },
 created() {
     this.iid = this.$route.params.iid

     getDetail(this.iid).then(res => {
         console.log(res);
         const data= res.result
         this.topImages = res.result.itemInfo.topImages

         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
     })
 },
 mounted() {

 },
}
</script>

<style scoped>

</style>