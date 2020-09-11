<template>
<div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <scroll class="con" ref="scroll">
        <cart-list @imgLoad="imgLoad"></cart-list>
    </scroll>
    <cart-button-bar></cart-button-bar>
</div>
</template>

<script>
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'

import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'

import {debounce} from '@/common/utils'

import {mapGetters} from 'vuex'

export default {
name: 'Cart',
components: {
    NavBar,
    CartList,
    Scroll,
    CartButtonBar
},
data() {
    return {
        
    }
},
computed: {
    ...mapGetters(['cartLength']),
    activated() {
        this.$ref.scroll.refresh()
    }
},
mounted() {
    //  const refresh = debounce(this.$refs.scroll.refresh,500)
    //  this.itemListener = () => {
    //      refresh()
    //  }
    //  this.$bus.$on('imgLoad', this.itemListener)
},

methods: {
    imgLoad() {
        const refresh = debounce(this.$refs.scroll.refresh,500)
        refresh()
    }
},
}

</script>

<style scoped>
.nav-bar{
    background-color: var(--color-tint);
}
.cart{
    height: 100vh;
}
.con{
    height: calc(100% - 138px);
    overflow: hidden;
}
</style>