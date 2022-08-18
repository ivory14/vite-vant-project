import { Dialog } from 'vant';

const state = () => ({
  count: '',
})
const getters = {
  count: (state) => state.count,
}
const mutations = {
  setCount(state, count) {
    state.count = count;
  }
}
const actions = {
  // 可以放一些统一的请求
}

export default { state, getters, mutations, actions };