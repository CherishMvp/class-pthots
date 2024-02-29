import http from '@/utils/request'

const apiMine = {
  getUserInfo: () => http.post<getUserInfo.data>('/getUserInfo', {}),
  signIn: (params: signIn.params) => http.post<any>('/signIn', params),
  postLoginWxMinAPI: (params: { code: string }) => http.post<any>('/class/user/login', params),
  getUserProfile: (params: { userId: string | number }) => http.get<any>('/class/user/detail', params),
  // patch userinfo
  patchUserinfo: (params: { id: number | undefined; updateInfo: any }) => http.post<any>(`/class/user/profile/${params.id}`, params.updateInfo),
  // get all sharecode room info
  getShareCodeRoomInfo: () => http.get<any>('/class/user/findAllShareRooms', {}),
  //  get one classmate info
  getOneClassmateInfo: (params: { id: string | undefined }) => http.get<any>(`/class/findOneClassMate/${params.id}`, {}),
}

export default apiMine
