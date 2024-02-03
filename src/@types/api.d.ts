declare namespace Http {
  type Response<T> = Promise<{
    data?: T
  }>
}

declare namespace GetTest {
  interface params {
    a: number
  }
  interface data {
    name: string
    age: number
  }
}

declare namespace PostTest {
  interface params {
    a: number
  }
  interface data {
    val: string
  }
}

declare namespace GetPhotosByClassId {
  interface params {
    id: number
  }
  interface data {}
}

declare namespace CreateRoom {
  interface params {
    desc: string
    dormitoryId: number
    swiper_list: string
    title: string
  }
  interface data {}
}

declare namespace UpdateRoom {
  interface params {
    desc: string
    /**
     * 修改的寝室ID
     */
    dormitoryId: number
    /**
     * 轮播图链接，用回车隔开
     */
    swiper_list: string
    title: string
  }
  interface data {}
}
declare namespace DeleteRoom {
  interface params {
    id: number
  }
  interface data {}
}

declare namespace CreateMember {
  interface params {
    dormitoryId: number
    imageUrl: string
    name: string
  }
  interface data {}
}
declare namespace UpdateMember {
  interface params {
    id: number
    dormitoryId: number
    imageUrl: string
    name: string
  }
  interface data {}
}

declare namespace RoomID {
  interface params {
    id: number
    dormitoryId: number
    title: string
    desc: string
  }
}
declare namespace signIn {
  interface params {
    user_id: string | number
  }
}
/**
 * ResData
 */
declare namespace getUserInfo {
  interface data {
    member_level: string
    remain_count: number
    token: string
    user_id: number
    user_name: string
  }
}
interface OssData {
  accessId: string // OSS 的 AccessKeyId
  policy: string // OSS 的上传策略
  signature: string // 对上传策略签名后的字符串
  callback: string // OSS 上传回调地址
  dir: string // 存储文件的目录名
  host: string // OSS 的上传域名
}