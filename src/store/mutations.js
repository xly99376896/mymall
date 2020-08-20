export default {
    AddCounter(state, payload) {
        payload.counter++
      },
      AddToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
      },
      CheckClick(state, payload) {
        payload.checked = !payload.checked
      }
}