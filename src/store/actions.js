export default {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = null
        for(let item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item
          }
        }
        if(oldProduct) {
          context.commit('AddCounter', oldProduct)
          resolve('当前商品数量+1')
          //console.log("000");
        } else {
          payload.counter = 1
          context.commit('AddToCart', payload)
          resolve('添加新的商品')
          //console.log("111");
        }
      })
    }
}