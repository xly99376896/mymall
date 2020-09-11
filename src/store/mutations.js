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
      },
      NoSelecr(state, payload) {
        state.cartList.forEach(item => item.checked = false)
      },
      SelecrAll(state, payload) {
        state.cartList.forEach(item => item.checked = true)
      }
}