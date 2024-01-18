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
  const link = ref<string>('/pages/index/index')

  function handleClick() {
    isShowCurtain.value = true
  }

  function handleClose() {
    isShowCurtain.value = false
  }
</script>

<template>
  <view>
    <wd-button @click="handleClick">展示幕帘</wd-button>
    <wd-curtain :value="isShowCurtain" :src="img" :to="link" close-position="top-right" :width="280" @close="handleClose" close-on-click-modal></wd-curtain>
  </view>
</template>

<style lang="scss" scoped></style>
