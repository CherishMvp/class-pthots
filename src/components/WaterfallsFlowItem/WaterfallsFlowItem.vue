<template>
  <div class="wf-item-page">
    <image :src="item?.imageUrl" mode="widthFix" class="item-img" />
    <div class="item-info flex-row">
      <image :src="item?.imageUrl" mode="aspectFill" class="info-avatar" />
      <div class="flex right">
        <div class="fs-30 color-black mr-20">{{ item?.name }}</div>
        <div>
          <wd-tag round type="primary" color="#aeb0ff" bg-color="#f0f2ff">{{ item?.dormitoryId }}</wd-tag>
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
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  })
</script>

<style>
  :deep(.wd-tag__text) {
   /* line-height: 1;*/
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
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .info-nickname {
    font-size: 12px;
    color: #333;
  }
</style>
