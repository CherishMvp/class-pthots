import http from '@/utils/request'

/**
 * @typedef {Object} OssData
 * @property {string} accessId - OSS 的 AccessKeyId
 * @property {string} policy - OSS 的上传策略
 * @property {string} signature - 对上传策略签名后的字符串
 * @property {string} callback - OSS 上传回调地址
 * @property {string} dir - 存储文件的目录名
 * @property {string} host - OSS 的上传域名
 */

const generateFileName = (openId: string | number) => {
  const timestamp = Date.now()
  const filename = `${openId}_${timestamp}`
  return filename
}

/**
 * 获取 OSS 数据
 * @returns {Promise<OssData>}
 */
const getOssData = async (): Promise<OssData> => {
  const res = (await (await http.get('/oss/signature', {})).data) as any
  return res
}
/**
 * Uploads a file to OSS and returns the file name and URL.
 *
 * @param {string} file - the file to be uploaded
 * @param {string} openId - the user's openId
 * @return {Promise<{ fileName: string; url: string }>} an object containing the file name and URL
 */
const miniProgramUploadFileToOSS = async (file: string, openId: string | number): Promise<{ fileName: string; url: string }> => {
  const ossData = await getOssData()
  return new Promise((resolve, reject) => {
    const host = ossData.host
    const signature = ossData.signature
    const ossAccessKeyId = ossData.accessId
    const policy = ossData.policy
    const key = generateFileName(openId)

    const filePath = file // 待上传文件的文件路径。
    const callback = ossData.callback

    wx.uploadFile({
      url: host,
      filePath: filePath,
      name: 'file', // 必须填file。
      formData: {
        key,
        policy,
        OSSAccessKeyId: ossAccessKeyId,
        signature,
        callback,
      },
      success: (res) => {
        const result = JSON.parse(res.data)
        console.log('resres', res)
        console.log('result', result)
        if (res.statusCode === 200) {
          if (result.code == 0) resolve({ fileName: result.data.file.filename, url: host + '/' + key })
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export default miniProgramUploadFileToOSS
