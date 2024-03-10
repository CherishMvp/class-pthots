<template>
  <div>
    <wd-form ref="formUser" :model="modelUser">
      <wd-cell-group title="基础信息" :border="true">
        <template v-for="(item, index) in UserLabelList" :key="item.id">
          <wd-input
            :label="item.label"
            :prop="item.key"
            label-width="100px"
            clearable
            v-if="!excludeList.includes(item.key)"
            v-model="modelUser[item.key]"
            :placeholder="'请输入' + item.label"
            :rules="[{ required: true, message: '请填写' + item.label }]"
          />
          <wd-select-picker
            :required="true"
            type="radio"
            v-if="item.key == 'room_id'"
            :key="item.id"
            :label="item.label"
            :prop="item.key"
            label-width="100px"
            clearable
            v-model="(modelUser.room_id as any)"
            :columns="shareCodeList"
            :display-format="displayFormat"
          ></wd-select-picker>
        </template>
      </wd-cell-group>
    </wd-form>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleUserInfoSubmit" :block="true">提交修改</wd-button>
    </view>
    <wd-toast />
  </div>
</template>

<script lang="ts" setup>
  import apiMine from '@/api/apiMine'
  import { useToast } from 'wot-design-uni/components/wd-toast'

  const { success: showSuccess, error: showError } = useToast()

  type USERINFO = {
    user_name: string
    gender: number
    address: string
    share_code: string //分享码
    room_name: string //分享码
    imageUrl: string //个人展示图片，字符串返回就行。后端拼接返回比较好，即baseIMGURL+imageUrl
    hoby: string //tag形式
    room_id: string | number //组织ID
    dormitory_id: string | number //宿舍ID
    role_id?: string | number //角色ID
  }

  const excludeList = ref(['room_id', 'imageUrl', 'gender', 'address'])

  const displayFormat = (items: any, columns: any[] = []) => {
    let showValue = ''
    console.log('columns', columns)

    if (!Array.isArray(items)) {
      items = [items]
    }

    if (!Array.isArray(columns)) {
      console.error('Columns is not an array')
      return showValue
    }

    items.forEach((item: any) => {
      columns.forEach((column: any, index: any) => {
        if (column.value === item) {
          showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
        }
      })
    })

    console.log('showValue', showValue)
    return showValue
  }

  const modelUser = reactive<Partial<USERINFO>>({
    user_name: '',
    share_code: '', //自己创建的组织ID
    room_name: '',
    imageUrl: '',
    hoby: '',
    gender: 3, //1男2女3未知
    address: '',
    room_id: '', //加入他人的组织ID
    dormitory_id: '',
    role_id: '',
  })
  const UserLabelList = [
    {
      id: 1,
      label: '用户名',
      key: 'user_name',
      value: '',
    },
    {
      id: 3,
      label: '分享码',
      key: 'share_code',
      value: '',
    },
    {
      id: 31,
      label: '组织名称',
      key: 'room_name',
      value: '',
    },
    // {
    //   id: 4,
    //   label: '个人展示图片',
    //   key: 'imageUrl',
    //   value: '',
    // },
    {
      id: 5,
      label: '兴趣爱好',
      key: 'hoby',
      value: '',
    },
    {
      id: 6,
      label: '组织ID',
      key: 'room_id',
      value: '',
    },
    // {
    //   id: 7,
    //   label: '宿舍ID',
    //   key: 'dormitory_id',
    //   value: '',
    // },
    // {
    //   id: 8,
    //   label: '角色ID',
    //   key: 'role_id',
    //   value: '',
    // },
  ]
  const formUser = ref()

  const {setProfileInfo}=useStore('user');
  const { userId, ID } = useStore('user')
  function handleUserInfoSubmit() {
    console.log('formUser.value', formUser.value)
    formUser.value
      .validate()
      .then(async ({ valid, errors }) => {
        console.log('valid, errors', valid, errors)
        if (valid) {
          const userInfo= {
            profile: {
              nickName: modelUser.user_name,
              gender: modelUser.gender,
              avatar: modelUser.imageUrl,
              address: modelUser.address,
              roomId: modelUser.room_id,
              hoby: modelUser.hoby,
            },
            roomInfo: {
              shareCode: modelUser.share_code,
              name: modelUser.room_name,
            },
          }
          console.log('userInfo', userInfo)
          const res = await apiMine.patchUserinfo({ id: ID.value, updateInfo: userInfo })
          console.log('res', res)
          if (res.data) {
            showSuccess({ msg: '修改成功', duration: 2500 })
            await setProfileInfo(userInfo.profile)
            await getProfileDetail()
          }
        } else {
          const errList: any[] = []
          errors.forEach((item: any) => {
            errList.push(item.message)
          })
          console.log('errList', errList)
          showError({
            msg: '校验不通过',
          })
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
      .finally(() => {
        console.log(formUser.value.validate())
      })
    console.log('sb')
  }
  const currentUserId = ref()
  const shareCodeList = ref([])
  const getProfileDetail = async () => {
    try {
      const [profileRes, shareCodeListRes] = await Promise.all([apiMine.getUserProfile({ userId: userId.value }), apiMine.getShareCodeRoomInfo()])

      console.log('profileRes', profileRes)
      shareCodeList.value = shareCodeListRes.data
      if (profileRes?.data) {
        const { profile, roomInfo } = profileRes.data
        currentUserId.value = profileRes.data.id
        modelUser.user_name = profile.nickName
        modelUser.hoby = profile.hoby
        modelUser.imageUrl = profile.avatar
        modelUser.share_code = roomInfo.shareCode //自己创建的房间
        modelUser.room_name = roomInfo.name
        modelUser.room_id = profile.roomId //加入的组织ID
      }
    } catch (error) {
      console.error('An error occurred:', error)
      // showError('请求出错')
      // 处理错误情况
    }
  }

  onMounted(async () => {
    await getProfileDetail()
  })
</script>

<style scoped lang="scss">
  .footer {
    padding: 12px;
  }
</style>
