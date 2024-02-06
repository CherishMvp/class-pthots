<script lang="ts" setup>
  import { useInit } from '@/hooks/useInit'
  onLoad(() => {
    const { pageName, pagePath, pageQuery } = useInit()
    console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery')
  })
  onShow(() => {
    handleClick()
  })
  const isShowCurtain = ref<boolean>(false)
  function handleClick() {
    isShowCurtain.value = true
  }

  function handleClose() {
    isShowCurtain.value = false
  }
  const avatarUrl = ref('https://via.placeholder.com/150x150')
  const username = ref('myusername')
  const followers = ref(100)
  const following = ref(50)
  /**
   * dormitoryId: 251
      id: 2
      imageUrl: "https://miniprogram.fancyzh.top/foods/product_type/%E6%B0%B4%E6%9E%9C/%E8%A5%BF%E7%93%9C.jpg"
      name: "gouyuan"
      tag: "傻逼"
   **/
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
    console.log('被子组件调用了刷新图片方法',num.value)
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
          <image class="profile-avatar" :src="avatarUrl" alt="avatar" />
          <h2 class="profile-username">{{ username }}</h2>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-count">{{ followers }}</div>
            <div class="profile-stat-label">粉丝</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-count">{{ following }}</div>
            <div class="profile-stat-label">关注</div>
          </div>
        </div>
        <WaterfallsFlow style="mt-20" :show-footer="false" :wfList="mockPosts" @itemTap="itemTap" />
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
    margin-top: 30px;
  }

  .profile-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }

  .profile-stat-count {
    font-size: 24px;
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
