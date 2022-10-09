import { _AsyncData } from 'nuxt3/dist/app/composables/asyncData'

// 指定后端返回的基本数据类型
export interface ResponseConfig {
  code: number,
  status: number,
  data: any,
  msg: string
}
export interface ValueConfig {
  value: any,
  [x: string]: any,
}

const fetch = (url: string, options?: any): Promise<any> => {
  const { $config, $router } = useNuxtApp()
  // const reqUrl = $config.baseURL + url

  return new Promise((resolve, reject) => {
    useFetch(url, { ...options,initialCache: false,cache: "no-cache" }).then(({ data, error }: _AsyncData<any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      const result = value && value.data
      if (!result || value.code !== 1) {
        // 这里处理错误回调
        resolve(ref<any>(result))
        //token过期的话，跳转登录页
        // $router.replace('/' + value.status)
      } else {
        resolve(ref<any>(options.method === 'get' ? result : value))
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}
//对象为空删除空值 
// const delObjectKey = (obj:any) => {
//   if (!obj) { return obj; }
//   Object.keys(obj).forEach((key) => {
//     const val = obj[key];
//     const validVals = [0, false];
//     const isValNone = !val && !validVals.includes(val);
//       if (isValNone) {
//         delete obj[key]
//       }
//   });
//   return obj
// }

const get = (url: string, params?: any): Promise<any> => {
  // delObjectKey(params)
  return fetch(url, { method: 'get', params })
}

const post = (url: string, body?: any): Promise<any> => {
  // delObjectKey(body)
  return fetch(url, { method: 'post', body })
}

const put = (url: string, body?: any): Promise<any> => {
  // delObjectKey(body)

  return fetch(url, { method: 'put', body })
}

const del = (url: string, body?: any): Promise<any> => {
  return fetch(url, { method: 'delete', body })
}

const patch = (url: string, body?: any): Promise<any> => {
  return fetch(url, { method: 'PATCH', body })
}

export { get, post, del, put, patch }; 