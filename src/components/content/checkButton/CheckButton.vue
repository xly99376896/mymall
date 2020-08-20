<template>
<div class="check-button" :class="{check: isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
export default {
 name: 'CheckButton',
 components: {
 },
 props: {
     isChecked: {
         type: Boolean,
         default: false
     }
 }
}
</script>

<style scoped>
.check-button{
    border: 1px solid #aaa;
    border-radius: 50%;
}
.check{
    background-color: rgb(207, 42, 42);
    border-color: rgb(207, 42, 42);
}
</style>