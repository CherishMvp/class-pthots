<script setup lang="ts">
  import apiClassPhoto from '@/api/apiClassPhoto'
  import { useTitle } from '@/hooks/useTitle'
  import { forward } from '@/utils/router'
  import { useToast } from 'wot-design-uni'

  const { title, changeTitle } = useTitle()
  const tipInfo=ref('')
  const toast = useToast()
  const tabList = ref<RoomID.params[]>([])
  function goTest() {
    forward('test', {
      a: 1,
    })
  }

  // const swiperList = ref([
  //   'https://unpkg.com/wot-design-uni-assets/meng.jpg',
  //   'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
  //   'https://unpkg.com/wot-design-uni-assets/panda.jpg',
  //   'https://img.yzcdn.cn/vant/cat.jpeg',
  //   'https://unpkg.com/wot-design-uni-assets/meng.jpg',
  // ])
  const swiperList = ref<any>([])
  const tabs = ref(['这', '是', '一', '个', '例子'])
  // 使用name匹配
  const current_tab = ref('首页')
  const list = ref<any>([])
  const requiredData: any = [
    {
      image: 'https://cdn.pixabay.com/photo/2015/10/21/03/44/beach-998788_960_720.jpg',
      avatar: 'https://cdn.pixabay.com/user/2015/10/12/02-06-28-605_250x250.jpg',
      nickName: 'rFonz',
      tag: '老师1',
    },
    {
      image: 'https://unpkg.com/wot-design-uni-assets/meng.jpg',
      avatar: 'https://cdn.pixabay.com/user/2015/10/12/02-06-28-605_250x250.jpg',
      nickName: 'rrasd',
      tag: '老师1',
    },
    {
      image: 'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
      avatar: 'https://cdn.pixabay.com/user/2015/10/12/02-06-28-605_250x250.jpg',
      nickName: 'ads',
      tag: '老师1',
    },
    // 省略其他数据项...
  ]

  const getCurrentRoomPhotos = async (id: number) => {
    const res = (await apiClassPhoto.getPhotosByRoomId({ id })).data as Array<any>
    console.log('getCurrentRoomPhotos', res)
    list.value = res[0]?.members
    tipInfo.value=res[0]?.desc
    console.log('list.value', list.value)
    swiperList.value = res[0]?.swiper_list
    console.log('swiperList.value', swiperList.value)
    // const data = toRaw(swiperList.value).split('\\n')
    // console.log('swiperList.value', data)
    // 使用回车键 ("\n") 分隔 URL
  }
  const getAllRoomIDs = async () => {
    const res = (await apiClassPhoto.getAllRoomIds()).data
    console.log('getAllRoomIDs', res)
    if (res?.length) {
      tabList.value = res
    } else toast.error('获取寝室列表失败')
  }
  const init = async () => {
    await getAllRoomIDs()
    await getCurrentRoomPhotos(1)
    console.log('init执行完了')
  }

  onMounted(async () => {
    // 模拟请求数据
    // setTimeout(() => {
    //   list.value = requiredData
    // }, 500)
    console.log('开始执行')
    await init()
    console.log('执行完了')
  })

  onReachBottom(() => {
    // 模拟触底刷新
    setTimeout(() => {
      requiredData.forEach((item) => {
        list.value.push(item)
      })
    }, 500)
  })

  onPullDownRefresh(() => {
    // 模拟下拉刷新
    setTimeout(() => {
      list.value = requiredData.reverse()
      uni.stopPullDownRefresh()
    }, 500)
  })

  const itemTap = (item) => {
    console.log(item)
  }
  function handleTabChange1(event: any) {
    console.log('event', event)
  }
  async function handleTabChange(e: { index: any; name: string }) {
    console.log(e)
    current_tab.value = e.name
    const id = tabList.value.find((i: any) => i.title == e.name)?.id as number
    console.log('id', id)
    await getCurrentRoomPhotos(id)
  }
</script>

<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view @click="changeTitle">changeTitle</view>
    <view @click="goTest">测试页</view>
    <div class="fs-120 font-400 color-amber">re</div>
    <wd-button type="primary">xx</wd-button> -->
  </view>
  <wd-tabs v-model="current_tab" animated :sticky="true" swipeable @change="handleTabChange($event)">
    <block v-for="item in tabList" :key="item.id">
      <wd-tab custom-class="custom-class-tabs-content" :name="item.title" :title="item.title">
        <!-- <view class="content">{{ item.desc }}</view> -->
        <view class="card-swiper">
          <wd-swiper
            autoplay
            :current="4"
            custom-indicator-class="custom-indicator-class"
            custom-image-class="custom-image"
            custom-next-image-class="custom-image-prev"
            custom-prev-image-class="custom-image-prev"
            :indicator="{ type: 'dots' }"
            :list="swiperList"
            previousMargin="24px"
            nextMargin="24px"
          ></wd-swiper>
        </view>
        <div class="m20">
          <wd-notice-bar prefix="notification-filled" :text="tipInfo" color="#34D19D" background-color="#f0f9eb" />
        </div>
        <div class="main_content">
          <WaterfallsFlow :wfList="list" @itemTap="itemTap" />
        </div>
      </wd-tab>
    </block>
  </wd-tabs>
  <wd-toast />
</template>

<script lang="ts">
  export default {
    options: {
      styleIsolation: 'shared',
    },
  }
</script>

<style>
  page {
    background-color: #f5f5f6 !important;
  }
  /* 组件样式 */
  :deep(.wd-tabs) {
    background: #f5f5f6 !important;
  }
</style>

<style scoped lang="scss">
  .card-swiper {
    --wot-swiper-radius: 0;
    --wot-swiper-item-padding: 0 24rpx;
    --wot-swiper-nav-dot-color: #e7e7e7;
    --wot-swiper-nav-dot-active-color: #4d80f0;
    padding-bottom: 24rpx;
    :deep(.custom-indicator-class) {
      bottom: -16px;
    }
    :deep(.custom-image) {
      border-radius: 12rpx;
    }
    :deep(.custom-image-prev) {
      height: 168px !important;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
    margin-left: auto;
    margin-right: auto;
    margin-top: 200rpx;
    margin-bottom: 50rpx;
    width: 200rpx;
    height: 200rpx;
  }
  .text-area {
    display: flex;
    justify-content: center;
  }
  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
