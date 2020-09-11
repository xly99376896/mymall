<template>
<div class="button-bar">
    <div class="check-content bottom-item">
        <check-button :isChecked="isSelectAll" class="check-button"
                      @click.native="checkClick"></check-button>
        <span>全选</span>
    </div>
    <div class="bottom-price bottom-item">
        <span>合计{{totalPrice}}</span>
    </div>
    <div class="caculate">
        <span>结算({{checkLength}})</span>
    </div>
</div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
 name: 'CartButtonBar',
 components: {
     CheckButton
 },
 computed: {
     totalPrice() {
         return "￥" + this.$store.state.cartList.filter(item => {
             return item.checked
         }).reduce((preValue, item) => {
             return preValue + item.price * item.counter
         }, 0).toFixed(2)
     },
     checkLength() {
         return this.$store.state.cartList.filter(item => {
             return item.checked
         }).length
     },
     isSelectAll() {
         if (this.$store.state.cartList.length === 0) return false
         return this.$store.state.cartList.every(item => item.checked)
     }
 },
 methods: {
     checkClick() {
         //console.log("000");
         if (this.isSelectAll) {
            this.$store.commit('NoSelecr')
         } else {
            this.$store.commit('SelecrAll')
         }
     }
 },
}
</script>

<style scoped>
.button-bar{
    height: 40px;
    position: fixed;
    bottom: 54px;
    right: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    font-size: 14px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 7px;
}
.check-button{
    width: 22px;
    height: 22px;
    margin-right: 5px;
    border: 1px solid #999;
    line-height: 25px;
}
.bottom-price{
    margin-left: 55px;
    line-height: 40px;
}
.caculate{
    position: absolute;
    right: 0px;
    font-size: 17px;
    background-color: rgb(247, 66, 53);
    width: 75px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #fff;
    line-height: 40px;
}
</style>