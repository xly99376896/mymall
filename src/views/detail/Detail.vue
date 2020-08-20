<template>
<div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav" 
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '@/network/detail'
import {debounce} from '@/common/utils'
import {backTopMixin} from '@/common/mixin'
//import {itemListenerMixin} from '@/common/mixin'

export default {
 name: 'Detail',
 components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     DetailGoodsInfo,
     Scroll,
     DetailParamInfo,
     DetailCommentInfo,
     GoodsList,
     DetailBottomBar,
 },
// mixins: [itemListenerMixin],
mixins: [backTopMixin],
 data() {
     return {
         topImages: [],
         iid: null,
         goods: {},
         shop: {},
         detailInfo: {},
         paramInfo: {},
         commentInfo: {},
         recommends: [],
         itemListener: null,
         themeTopY: [],
         currnetIndex: 0,
     }
 },
 methods: {
     imgLoad() {
         this.$refs.scroll.refresh()

         this.themeTopY = []
         this.themeTopY.push(0)
         this.themeTopY.push(-this.$refs.params.$el.offsetTop + 44)
         this.themeTopY.push(-this.$refs.comment.$el.offsetTop + 44)
         this.themeTopY.push(-this.$refs.recommend.$el.offsetTop + 44)
         this.themeTopY.push(Number.MAX_VALUE)
         //console.log(this.themeTopY);
     },
     titleClick(index) {
         //console.log(index);
         this.$refs.scroll.scrollTo(0,this.themeTopY[index],200)
     },
     contentScroll(position) {
         const positionY =  position.y

         let length = this.themeTopY.length
         for(let i=0; i< length-1; i++) {
             //console.log(i);
            //  if(positionY < this.themeTopY[i] && positionY > this.themeTopY[i+1]) {
            //      console.log(i);
            //  }
            if (this.currnetIndex !== i && positionY <= this.themeTopY[i]) {
                this.currnetIndex = i
                this.$refs.nav.currentIndex = this.currnetIndex
            } 
            // && positionY > this.themeTopY[i+1])
            // if(this.currnetIndex !== i && (i<length -1 
            // && positionY <= this.themeTopY[i] 
            // && positionY > this.themeTopY[i+1]) 
            // || (i === (length -1) && positionY <= this.themeTopY[i])) {
            //     this.currnetIndex = i
            //     console.log(this.currnetIndex);
            //     this.$refs.nav.currentIndex = this.currnetIndex
            // }
         }
         this.listenShowBackTop(position)
     },
     addToCart() {
         //获取购物车展示的信息
         const product = {}
         product.image = this.topImages[0]
         product.title = this.goods.title
         product.desc = this.goods.desc
         product.price = this.goods.realPrice
         product.iid = this.iid

         //将商品添加购物车
        this.$store.dispatch('addCart', product).then(res => {
            //console.log(res);
            this.$toast.show(res, 1200)
        })

     }
 },
 created() {
     this.iid = this.$route.params.iid

     getDetail(this.iid).then(res => {
         console.log(res);
         const data= res.result
         this.topImages = data.itemInfo.topImages
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
         this.shop = new Shop(data.shopInfo)
         this.detailInfo = data.detailInfo
         this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
         if (data.rate.cRate !== 0) {
             this.commentInfo = data.rate.list[0]
         }
     }),
     getRecommend().then(res => {
         this.recommends = res.data.list
         //console.log(this.recommends);
     })
 },
 mounted() {
     const refresh = debounce(this.$refs.scroll.refresh,500)
     this.itemListener = () => {
         refresh()
     }
     this.$bus.$on('detailItemImageLoad', this.itemListener)
 },
 updated() {
    //  this.themeTopY = []
    //  this.themeTopY.push(0)
    //  this.themeTopY.push(this.$refs.params.$el.offsetTop)
    //  this.themeTopY.push(this.$refs.comment.$el.offsetTop)
    //  this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    //  console.log(this.themeTopY);
 },
 destroyed() {
     //this.$bus.$off('itemImageLoad',this.itemListener)
 },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    height: calc(100% - 93px);
    overflow: hidden;
}
</style>