declare namespace User {
  interface Profile {
    nickName: string
    hoby: string
    roomId: string
    gender: number
    address?: string
    avatar: string
    email?: string | null
  }

  interface UserInfo {
    id?: number
    profile: Partial<Profile>
    member_level: string
    remain_count: number
    token: string
    user_id: number | string
    username: string
  }
}
