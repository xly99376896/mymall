<template>
<div class="goods-item"  @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">收藏:{{goodsItem.cfav}}</span>
    </div>
</div>
</template>

<script>
export default {
name: 'GoodsListItem',
props: {
    goodsItem: {
        type: Object,
        default(){
            return {}
        }
    }
},
computed: {
    showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
    }
},
methods: {
    imageLoad() {
        // if (this.$route.path.indexOf('/home') !== -1) {
        //     this.$bus.$emit('homeItemImageLoad')
        // } else if(this.$route.path.indexOf('/detail') !== -1) {
        //     this.$bus.$emit('detailItemImageLoad')
        // }
        this.$emit('itemImageLoad')
        
    },
    itemClick() {
        // this.$router.push('/detail/' + this.goodsItem.iid)
        this.$router.push({
            path: '/detail/',
            query: {
                iid: this.goodsItem.iid
            }
        })
    }
},
}
</script>

<style scoped>
.goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goods-item img {
    width: 100%;
    border-radius: 5px;
}
.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price {
    font-weight: bold;
    margin-right: 20px;
}
.goods-info .collect {
    position: relative;
}
</style>