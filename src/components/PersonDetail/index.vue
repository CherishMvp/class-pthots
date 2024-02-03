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
  const img = ref<string>('https://miniprogram.fancyzh.top/foods/dumplings-8.jpg')

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
  const posts = ref([
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x400',
      likes: 10,
      comments: 2,
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x400',
      likes: 20,
      comments: 5,
    },
  ])
</script>

<template>
  <view>
    <div class="profile">
      <!-- 头像和用户名 -->
      <div class="profile-header">
        <img class="profile-avatar" :src="avatarUrl" alt="avatar" />
        <h2 class="profile-username">{{ username }}</h2>
      </div>

      <!-- 粉丝数和关注数 -->
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

      <!-- 动态列表 -->
      <div class="profile-feed">
        <div v-for="post in posts" :key="post.id" class="profile-post">
          <img :src="post.imageUrl" alt="post image" />
          <div class="profile-post-overlay">
            <div class="profile-post-likes">{{ post.likes }} likes</div>
            <div class="profile-post-comments">{{ post.comments }} comments</div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<style lang="scss" scoped>
  /* 全局样式 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 主题色 */
  :root {
    --theme-color: #ff6663;
  }

  /* 头部导航栏 */
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-logo {
    font-size: 24px;
    font-weight: bold;
    color: var(--theme-color);
  }

  .header-nav {
    display: flex;
  }

  .header-nav-item {
    margin: 0 10px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  .header-nav-item:hover {
    color: var(--theme-color);
  }

  /* 个人主页 */
  .profile {
    max-width: 800px;
    margin: 30px auto;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 50px;
  }

  .profile-post {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }

  .profile-post img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-post-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .profile-post-likes,
  .profile-post-comments {
    font-size: 14px;
  }
</style>
