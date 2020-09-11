<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <tab-control ref="tabControl1" 
                     :titles="['流行','新款','精选']" 
                     @tabclick="tabclick" class="tab-control"
                     v-show="isTabFixed"></tab-control>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load='true'
    @pullingup="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends" class="recommend-view"></recommend-view>
        <feature-view></feature-view>
        <tab-control ref="tabControl2" 
                     :titles="['流行','新款','精选']" 
                     @tabclick="tabclick"></tab-control>
        <goods-list :goods="showGoods" @itemImageLoad="itemImageLoad"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView"

import NavBar from '@/components/common/navbar/NavBar';
import TabControl from "@/components/content/tabCnotrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from '@/components/common/scroll/Scroll'
// import BackTop from '@/components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {debounce} from '@/common/utils'
import {backTopMixin} from '@/common/mixin'
//import {itemListenerMixin} from '@/common/mixin'

export default {
name: 'Home',
components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    //BackTop
},
//mixins: [itemListenerMixin],
mixins: [backTopMixin],
data() {
    return {
        banners: [],
        recommends: [],
        goods: {
            'pop':{page:0, list: []},
            'new':{page:0, list: []},
            'sell':{page:0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0 ,
        isTabFixed: false,
        saveY: 0,
        itemListener: null
        
    }
},
computed: {
    showGoods() {
        return this.goods[this.currentType].list
    },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)

        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        console.log(this.saveY);
        //this.$bus.$off('itemImageLoad',this.itemListener)
    },
},
created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

},
mounted() {
    //图片加载完的事件监听
    //   const refresh = debounce(this.$refs.scroll.refresh,500)
    //   this.itemListener = () => {
    //       refresh()
    //   }
    //   this.$bus.$on('homeItemImageLoad', this.itemListener)

      
},
methods: {

    //事件监听相关
    tabclick(index) {
        switch (index) {
            case 0:
                this.currentType= 'pop'
                break
            case 1:
                this.currentType= 'new'
                break
            case 2:
                this.currentType= 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
    },
    // backClick() {
    //     this.$refs.scroll.scrollTo(0, 0)
    //   },
    contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1200

        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop


    },
    loadMore() {
        this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    itemImageLoad() {
        const refresh = debounce(this.$refs.scroll.refresh,500)
        refresh()
    },

    //网络请求相关
    getHomeMultidata(){
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
    })
    }
    
},
}
</script>

<style scoped>
.home-nav{
    background-color: var(--color-tint);
    color: black;
    font-size: 20px;

    /* 使用浏览器原生滚动时 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
}
.tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
    margin-top: -1px;
}
#home{
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
}
.recommend-view{
    background-color: #fff;
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>