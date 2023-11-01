export const state = () => ({
  cartList:[],
  orderList:[]
})
export const mutations = {
  /*장바구니 제품 추가*/
  setCartList(state, data) {
    state.cartList = [...state.cartList, data];
  },
  /*동일 제품은 수량 추가*/
  addCart(state, data){
    state.cartList = state.cartList.map(cart =>{
      if(data.id === cart.id){
        cart.quantity += data.quantity
      }
      return cart
    })
  },
  /*장바구니 삭제*/
  deleteCart(state, data){
    state.cartList = state.cartList.filter(cart =>{
      return data.id !== cart.id
    })
  },
  /*주문목록 추가*/
  setOrderList(state, data) {
    state.orderList = data;
  },
}
export const actions = {

}
export const getters = {
  cartList: (state) => state.cartList,
  orderList: (state) => state.orderList,
}
