<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
name: 'TabBar',
 components: {
 }
}
</script>

<style scoped>
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow:0 -2px 1px rgba(100, 100, 100, .1) ;
  z-index: 10;
}

</style>