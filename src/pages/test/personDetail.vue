<script lang="ts" setup>
  import apiMine from '@/api/apiMine'
  import { useInit } from '@/hooks/useInit'
  import { genderMap } from '@/utils/shared'

  const defaultAvatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')
  const getUserDetail = async (id: string) => {
    console.log('pageQuery', id)
    const res = await (await apiMine.getOneClassmateInfo({ id })).data
    if (res) {
      userInfo.profile = res
    }
    console.log('resss', res)
    imgList.value = res.imageUrl.split(',').map((item: any) => {
      return { imageUrl: item }
    })
    console.log('imgList.value', imgList.value)
  }

  onShow(() => {
    init()
  })
  const imgList = ref([])
  const previewImage = (urls: any) => {
    // 如果urls是字符串，则将其使用逗号隔开生成一个数组
    if (typeof urls === 'string') {
      urls = urls.split(',')
    }
    console.log('finale preview images', urls)
    if (!urls.filter((item: any) => item != '').length)
      return uni.showToast({
        title: '没有图片',
        icon: 'error',
        mask: true,
      })
    uni.previewImage({
      urls,
      success: (result) => {
        console.log('预览成功', result)
      },
      fail: (error) => {},
    })
  }

  const { userId, ID } = useStore('user')

  const showEmail = () => {
    console.log('sb')
    const mainContent = userInfo.profile.email || '未知'
    return uni.showModal({
      title: '联系方式',
      content: mainContent,
      showCancel: true,
      success: ({ confirm, cancel }) => {
        if (confirm)
          uni.setClipboardData({
            data: mainContent,
            success: function () {
              console.log('复制成功')
            },
          })
      },
    })
  }

  const userInfo = reactive<Record<string, any>>({
    profile: {},
    roomInfo: {},
  })

  const init = async () => {
    const { pageName, pagePath, pageQuery } = useInit()
    console.log('pageName,pagePath, pageQuery', pageName, pagePath, pageQuery)
    //
    if (pageQuery?.info) {
      getUserDetail(pageQuery?.info)
    }
  }

  const isShowCurtain = ref<boolean>(false)
  function generatePosts(numPosts: number) {
    const posts: any[] = []
    for (let i = 1; i <= numPosts; i++) {
      const width = Math.floor(Math.random() * 800) + 400 // Generate random width between 200 and 1000
      const height = Math.floor(Math.random() * 800) + 500 // Generate random height between 200 and 1000
      posts.push({
        id: i,
        imageUrl: `https://via.placeholder.com/${width}x${height}`,
        likes: Math.floor(Math.random() * 100), // Generate random likes
        comments: Math.floor(Math.random() * 10), // Generate random comments
      })
    }
    return posts
  }
  const num = ref(5)
  const state = ref<any>('loading')
  function onScrollToLower() {
    console.log('自定义 onScrollToLower')
    console.log('被子组件调用了刷新图片方法', num.value)
    if (num.value === 9) {
      state.value = 'error'
    } else if (num.value < 8) {
      num.value++
    } else if (num.value === 8) {
      state.value = 'finished'
    }
  }
  defineExpose({
    handleScrollToLower: onScrollToLower(),
  })
  const itemTap = (params: any) => {
    console.log('item', params)
  }
  const mockPosts = computed(() => {
    const res = generatePosts(num.value)
    console.log('return', res)
    return res
  })
</script>

<template>
  <div class="h-screen">
    <!-- 使用自定义下拉组件需要外层嵌套一个高度 -->
    <pullList :on-scroll-to-lower="onScrollToLower">
      <template #list>
        <div class="profile-header">
          <image v-if="userInfo?.profile.avatar" @click="previewImage(userInfo?.profile.avatar)" class="profile-avatar" :src="userInfo?.profile.avatar" alt="avatar" />
          <image v-else class="profile-avatar" :src="defaultAvatar" alt="avatar" />

          <div class="flex flex-row justify-center" style="align-items: center" @click="showEmail">
            <h2 class="profile-username p15">{{ userInfo.profile.name }}</h2>
            <text class="fs-20 mt-40">{{ genderMap(userInfo.profile.gender) }}</text>
          </div>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-count">{{ userInfo.profile.followers }}</div>
            <div class="profile-stat-label">粉丝</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-count">{{ 100 }}</div>
            <div class="profile-stat-label">关注</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-count">{{ userInfo.profile.address || '地球' }}</div>
            <div class="profile-stat-label">住址</div>
          </div>
        </div>
        <WaterfallsFlow style="mt-20" :show-footer="false" :wfList="imgList" @itemTap="itemTap" />
        <div class="pb60"></div>
      </template>
    </pullList>
    <wd-loadmore :state="state" @reload="onScrollToLower" />
  </div>
</template>

<style lang="scss" scoped>
  .profile {
    margin: 30px auto;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
  }

  .profile-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .profile-username {
    font-size: 24px;
    margin-top: 20px;
  }

  .profile-stats {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .profile-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }

  .profile-stat-count {
    font-size: 20px;
    font-weight: bold;
    color: var(--theme-color);
  }

  .profile-stat-label {
    font-size: 16px;
    color: #999;
  }
  .profile-feed {
    margin: 30rpx auto;
    height: 100%;
  }
</style>
