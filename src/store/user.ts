import apiMine from '@/api/apiMine'

export default defineStore('id', {
  state: () => ({
    userInfo: {
      id: null,
      profile: {
        avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        nickName:'',
      },
      user_id: undefined,
      user_name: '',
      remain_count: 10,
      member_level: '普通用户',
      token: '',
    } as unknown as User.UserInfo,
  }),
  getters: {
    logged: (state) => {
      const { token, user_id } = state.userInfo
      return !!(token && user_id)
    },
    token: (state) => {
      return state.userInfo.token
    },
    userId: (state) => {
      return state.userInfo.user_id
    },
    ID: (state) => {
      return state.userInfo.id
    },
    userName: (state) => {
      return state.userInfo.username
    },
    remainCount: (state) => {
      return state.userInfo.remain_count
    },
    memberLevel: (state) => {
      console.log('state.userInfo.member_level.trim()', state.userInfo.member_level.trim())
      return state.userInfo.member_level.trim()
    },
  },
  /**
   * 特殊情况
   * const x = useStore('user')
   * x.setUserInfo('bbb')则
   * 如果使用的地方不是使用这种解构赋值的，则此处赋值要加.value
   * 如果使用的地方是解构赋值，则不需要使用.value
   * 可能这就是auto-to-ref
   **/
  actions: {
    async setUserInfo(updateInfo: Partial<User.UserInfo>) {
      console.log('updateInfo', updateInfo)
      this.userInfo = Object.assign(this.userInfo, updateInfo)
      console.log('this.userInfo', this.userInfo)
    },
    async setProfileInfo(updateInfo: Partial<User.Profile>) {
      console.log('updateProfile', updateInfo)
      this.userInfo.profile = Object.assign(this.userInfo.profile, updateInfo)
      console.log('this.userInfo', this.userInfo.profile)
    },
    async updateRemainCount(type: number, user_id: string | number) {
      switch (type) {
        case 1:
          // api操作，更新内容
          const res = await apiMine.signIn({ user_id })
          console.log('签到返回', res)
          return res
        // this.userInfo.remain_count++
        default:
          break
      }
    },
  },
  persist: {
    // 开启持久化
    enabled: true,
    H5Storage: window?.localStorage,
    strategies: [
      {
        key: 'userinfo',
        storage: window?.sessionStorage,
      },
    ],
  },
})
