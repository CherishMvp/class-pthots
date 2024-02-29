import { isDevelopment, isH5 } from './platform'
import { forward } from './router'
import { getCommonParams } from '@/config/commonParams'
import env from '@/config/env'
import { hideLoading, showLoading } from '@/config/serviceLoading'
import { useLogin } from '@/hooks/useLogin'

function reject(err: { errno: number; errmsg: string }) {
  const { errmsg = '', errno = -1 } = err
  switch (errno) {
    case 10000:
      // 特殊异常处理
      // forward('login')
      reLogin(errmsg)
      break

    default:
      uni.showToast({
        title: errmsg,
        duration: 2000,
        icon: 'loading',
      })
      break
  }
}
// 微信小程序登陆逻辑，先获取code
const reLogin = async (params: any) => {
  const { onGetUserInfo } = useLogin()
  await onGetUserInfo()
}

// h5环境开启代理
const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl
const { token } = useStore('user')

function baseRequest(method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined, url: string, data: { isLoading: any }) {
  return new Promise((resolve) => {
    showLoading(data.isLoading)
    delete data.isLoading
    let responseData: unknown
    uni.request({
      url: apiBaseUrl + url,
      method,
      timeout: 20000,
      header: {
        // 'content-type': method === 'GET' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded',
        'content-type': 'application/json; charset=utf-8', //統一使用application/json
        Authorization: 'Bearer ' + token.value,
      },
      data,
      success: (res: any) => {
        console.log('res.data', res.data)
        if (res.statusCode >= 200 && res.statusCode < 400) {
          if (res.data.code === 0) {
            responseData = res.data
          } else {
            reject(res.data)
          }
        } else if (res.data.code == 401) {
          reject({
            errno: 10000,
            errmsg: res.data.message || '登陆状态过期',
          })
        } else {
          reject({
            errno: -1,
            errmsg: res.data.message || '抢购火爆，稍候片刻！',
          })
        }
      },
      fail: () => {
        reject({
          errno: -1,
          errmsg: '网络不给力，请检查你的网络设置~',
        })
      },
      complete: (data) => {
        console.log(data, 'data')
        resolve(responseData)
        hideLoading()
      },
    })
  })
}

const http = {
  get: <T>(api: string, params: any) =>
    baseRequest('GET', api, {
      ...getCommonParams(),
      ...params,
    }) as Http.Response<T>,
  post: <T>(api: string, params: any) =>
    baseRequest('POST', api, {
      ...getCommonParams(),
      ...params,
    }) as Http.Response<T>,

  put: <T>(api: string, params: any) =>
    baseRequest('PUT', api, {
      ...getCommonParams(),
      ...params,
    }) as Http.Response<T>,

  delete: <T>(api: string, params: any) =>
    baseRequest('DELETE', api, {
      ...getCommonParams(),
      ...params,
    }) as Http.Response<T>,
}

export default http
