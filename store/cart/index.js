export const state = () => ({
  cartList:[
  ]
})
export const mutations = {
  setCartList(state, data) {
    state.cartList = [...state.cartList, data];
  },
  addCart(state, data){
    state.cartList = state.cartList.map(cart =>{
      if(data.id === cart.id){
        cart.quantity += data.quantity
      }
      return cart
    })
  },
  deleteCart(state, data){
    state.cartList = state.cartList.filter(cart =>{
      return data.id !== cart.id
    })
  }
}
export const actions = {

}
export const getters = {
  cartList: (state) => state.cartList,
}
