<template>
  <div class="wrap">
    <div class="hd h-7xl flex flex-row justify-between">
      <div class="left flex flex-row p10">
        <!-- <image style="width: 75rpx; height: 75rpx" src="../../static/logo.png" mode="scaleToFill" /> -->
        <template>
          <div>
            <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
              <image class="avatar" :src="userInfo.profile?.avatar"></image>
            </button>
            <!-- <input type="nickname" class="weui-input" placeholder="请输入昵称" /> -->
          </div>
        </template>
        <div class="u_info flex flex-wrap flex-col ml-14 fw-500">
          <text>{{ userName }}</text>
          <text>ID: {{ userId?.toString().slice(0, 6) }}</text>
        </div>
      </div>

      <div class="profile p10">
        <div fs-20>
          {{ calRemainCount }}
        </div>
      </div>
    </div>
    <div class="main_content">
      <wd-cell-group title="个人信息" :border="true">
        <wd-cell :title="item.title" :label="item.desc" :center="true" :key="item.id" v-for="item in mockList">
          <view class="custom-value" style="height: 32px">
            <wd-button v-if="item.id !== 4" :plain="true" color="#334" size="medium" type="info" @click="handleClick(item)">{{ item.btn }}</wd-button>
            <wd-button v-if="item.id == 4" open-type="contact" :plain="true" color="#334" size="medium" type="info" @contact="handleContact(item)">{{ item.btn }}</wd-button>
          </view>
        </wd-cell>
      </wd-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
  import apiMine from '@/api/apiMine'
  import { forward } from '@/utils/router'
  import uploadFileToOSS from '@/hooks/useUploadOss'

  const { userId, userInfo, token, remainCount, ID, userName, setUserInfo, setProfileInfo, updateRemainCount } = useStore('user')
  const calRemainCount = computed(() => {
    return remainCount.value ? '剩余次数' + remainCount.value + '次' : '剩余次数未知'
  })
  const buttonType = ref('contact')
  const mockList = [
    {
      id: 1,
      title: '签到领次数',
      desc: '每日签到领取次数',
      btn: '点击签到',
    },
    {
      id: 2,
      title: '邀请领次数',
      desc: '邀请好友领取次数',
      btn: '点击邀请',
    },
    {
      id: 3,
      title: '完善信息',
      desc: '完善个人信息',
      btn: '点击完善',
    },
    {
      id: 4,
      title: '联系客服',
      desc: '有任何问题请联系客服',
      btn: '点击进入',
    },
  ]
  const handleFileChange = async (file: any) => {
    console.log('eee==filefile', file)
    if (file) {
      console.log('file', file)
      const res = await uploadFileToOSS(file, userId.value)
      console.log('xxxx', res)
      if (res.url) {
        const userInfo = {
          profile: {
            avatar: res.url,
          },
        }
        await setProfileInfo({ avatar: res.url })
        console.log('更新', userInfo)
        await apiMine.patchUserinfo({ id: ID.value, updateInfo: userInfo })
      }
    }
  }
  const onChooseAvatar = async (e: any) => {
    console.log('e', e)
    const { avatarUrl } = e.detail
    await handleFileChange(avatarUrl)
  }
  const handleSign = async (item: any) => {
    const res = await updateRemainCount(item.id, userId.value)
    console.log('res', res)
    if (res && res.data.is_sign) {
      setUserInfo({ remain_count: ++remainCount.value })
      uni.showToast({
        title: '签到成功',
        icon: 'success',
        mask: true,
      })
    }
  }
  const handleContact = (params: any) => {
    console.log('params: ', params)
  }

  const handleClick = async (item: any) => {
    console.log('item: ', item)
    switch (item.id) {
      case 1:
        handleSign(item)
        break
      case 3:
        forward('editProfile', {
          userinfo: 'xx',
        })
      case 4:
        buttonType.value = 'contact'
      default:
        buttonType.value = ''
        break
    }
  }
  onShow(async () => {
    // getUserInfo()
    console.log('token', token.value)
    console.log('userInfo', userInfo.value.profile?.avatar)
    if (!token.value) {
      let code = ''
      const res = await wx.login()
      code = res.code
      await onGetUserInfo(code)
    }
  })
  // 获取 code 登录凭证
  // onLoad(async () => {
  //   console.log('token', token.value)
  //   if (!token) {
  //     const res = await wx.login()
  //     code = res.code
  //     await onGetUserInfo(code)
  //   }
  // })
  // 先判断有没有存储过的用户信息，后面再决定传参注册
  const userOpenId = ref('')
  const onGetUserInfo = async (code: string) => {
    console.log('拿到code', code)
    const res = await apiMine.postLoginWxMinAPI({ code })
    console.log('返回基本信息', res)
    //这一步要拿到openId，跟手机号码注册的时候，如果没有token返回，说明没有对应的用户信息，则需要触发注册操作
    console.log('res.data.token', res.data?.token)
    if (!res.data?.user_id) {
      userOpenId.value = res.data.user_id
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
      // uni.navigateBack()
      console.log('拿到token相关信息', res)
      loginSuccess(res.data)
    }
  }
  const loginSuccess = async (res: any) => {
    console.log('登陆成功', res)
    await setUserInfo(res)
  }
</script>
<style>
  page {
    background-color: #fff !important;
  }
  :deep(.wd-cell-group__left text){
    font-size: 40rpx;
  }
</style>
<style scoped lang="scss">
  .wrap {
    margin: 20rpx;
    .hd {
      align-items: center;
      background-color: #f5f6f8;
      font-size: 35rpx;
      .left {
        align-items: center;
      }
      .profile {
      }
    }
    .bd {
      .main_content {
        .line {
          align-items: center;
          .desc {
            margin: 10rpx 0;
            color: #1e1e1e;
          }
          .rt_btn {
          }
        }
      }
    }
  }
  .avatar-wrapper {
    padding: 0;
    width: 80px !important;
    border-radius: 8px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .avatar {
    display: block;
    width: 80px;
    height: 80px;
  }
</style>
