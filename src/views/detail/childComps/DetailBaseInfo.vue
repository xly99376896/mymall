<template>
<div v-if="Object.keys(goods).length !== 0" class="bas-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services-1].nme}}</span>
    </div>
    <div class="info-service">
        <span class="info-services-item" v-for="index in goods.services.length-1"
        :key="index"></span>
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.serves[index-1].name}}</span>
    </div>
</div>
</template>

<script>
export default {
 name: 'DetailBaseInfo',
 components: {
 },
 props:{
     goods: {
         type: Object,
         default() {
             return {}
         }
     }
 }
}
</script>

<style scoped>

</style>