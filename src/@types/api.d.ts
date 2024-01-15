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
