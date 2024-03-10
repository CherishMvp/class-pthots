<template>
  <div class="wf-item-page">
    <image :src="item?.imageUrl.split(',')[0]" mode="widthFix" @click="previewImage(item)" class="item-img" />
    <div class="item-info flex-row" v-if="showFooter">
      <!-- 头像栏 -->
      <image v-if="item.avatar" :src="item?.avatar" mode="aspectFill" class="info-avatar" />
      <div class="flex right">
        <div class="fs-30 color-black mr-20">{{ item?.name }}</div>
        <div>
          <wd-tag style="font-size: 20px;" round type="primary" color="#fdfdfd" bg-color="#114C4E">{{ item?.tag.length ? item?.tag : item?.dormitoryId }}</wd-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    options: {
      styleIsolation: 'shared',
    },
  }
</script>
<script setup>
  import { forward } from '@/utils/router'

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    // 是否显示底部的姓名
    showFooter: {
      type: Boolean,
      default: true,
    },
  })
  function goDetail(params) {
    forward('personDetail', {
      info: params.id,
    })
    console.log('params', params)
  }
  const previewImage = (params) => {
    if (props.showFooter) {
      goDetail(params)
    } else {
      if (!params.imageUrl)
        return uni.showToast({
          title: '没有图片',
          icon: 'error',
          mask: true,
        })
      uni.previewImage({
        urls: [params.imageUrl],
        success: (result) => {
          console.log('预览成功', result)
        },
        fail: (error) => {},
      })
    }
  }
</script>

<style>
  :deep(.wd-tag) {
    line-height: normal !important;
  }
</style>

<style lang="scss" scoped>
  .wf-item-page {
    background: #fff;
    overflow: hidden;
    border-radius: 5px;
  }

  .item-img {
    width: 100%;
  }

  .item-info {
    display: flex;
    align-items: center;
    padding: 5px;
    .right {
      align-items: center;
    }
  }

  .info-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .info-nickname {
    font-size: 12px;
    color: #333;
  }
</style>
