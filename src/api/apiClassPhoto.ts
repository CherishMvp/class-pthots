import http from '@/utils/request'

const apiClassPhoto = {
  getAllPhotos: () => http.get<any>('/class/findAllClassPhotos', false),
  getPhotosByRoomId: (params: GetPhotosByClassId.params) => http.get<GetPhotosByClassId.data>(`/class/findOne/${params.id}`, false),
  // 获取所有寝室ID
  getAllRoomIds: () => http.get<any>('/class/findAllRomIDs', false),
  // 创建寝室信息
  createRoom: (params: CreateRoom.params) => http.post<CreateRoom.data>('/class/createRoom', params),
  // 更新寝室信息/class/updateRoom
  updateRoom: (params: UpdateRoom.params) => http.put<UpdateRoom.data>('/class/updateRoom', params),
  // 删除寝室/class/deleteRoom/{id}
  deleteRoom: (params: DeleteRoom.params) => http.delete<DeleteRoom.data>(`/class/deleteRoom/${params.id}`, false),
  // =====成员接口=====
  // 创建同学信息/class/createMember
  createMember: (params: CreateMember.params) => http.post<CreateMember.data>('/class/createMember', params),
  // 更新成员信息/class/updateMember/{id}
  updateMember: (params: UpdateMember.params) => http.put<UpdateMember.data>(`/class/updateMember/${params.id}`, params),
  // 删除成员/class/deleteMember/{id}
  deleteMember: (params: { id: number }) => http.delete<any>(`/class/deleteMember/${params.id}`, ''),
}

export default apiClassPhoto
