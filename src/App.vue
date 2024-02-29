<script setup lang="ts">
  import { onHide, onLaunch, onShow, onLoad } from '@dcloudio/uni-app'
  onLaunch(async() => {
    console.log('App Launch')
    // 获取code
    const newCode = await wx.login()
    const code = newCode.code
    console.log('拿到code',code)
    uni.removeStorage({ key: 'code' })
    uni.setStorageSync('code', code)
  })
  onShow(() => {
    console.log('App Show')
  })

  onHide(() => {
    console.log('App Hide')
  })
</script>

<style></style>
