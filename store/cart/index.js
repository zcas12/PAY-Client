export const state = () => ({
  cartList:[

  ]
})
export const mutations = {
  setCartList(state, data) {
    state.cartList.push(data);
  },
}
export const actions = {

}
export const getters = {
  cartList: (state) => state.cartList,
}
