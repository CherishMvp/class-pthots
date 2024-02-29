import apiMine from '@/api/apiMine'
export function useLogin() {
  let code = ''
  onShow(() => {
    console.log('Page Show')
    // 进行页面显示时的逻辑处理
  })

  onHide(() => {
    console.log('Page Hide')
    // 进行页面隐藏时的逻辑处理
  })

  const { userId, token, setUserInfo } = useStore('user')

  const onGetUserInfo = async () =>
  {
    const code = uni.getStorageSync('code')
    console.log('拿到code自己拿到的code', code)
    const res = await apiMine.postLoginWxMinAPI({ code })
    console.log('返回基本信息', res)
    if (!res.data?.user_id) {
      uni.showToast({
        title: '用户暂未注册，点击登录',
        icon: 'loading',
        mask: true,
      })
    } else {
      uni.showToast({
        title: '登陆成功',
        icon: 'success',
        mask: true,
      })
      setUserInfo(res.data)
    }
  }

  return {
    onGetUserInfo,
  }
}
