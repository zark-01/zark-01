import { hash } from 'ohash';
const fetch = (url: string, options?: any): Promise<any> => {
  const { $baseURL, $router } = useNuxtApp()
  const reqUrl = 'https://baidu.com/api' + url
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, {
      ...options, headers: { Authorization: `Bearer ${useCookie('token').value}` },
      initialCache: false,
      cache: "no-cache",
      key: hash(['api-fetch', url, options.params]),
    }).then(({ data, error }: any) => {
      // console.log('请求接口：' + JSON.stringify(url));
      // console.log('请求参数：' + JSON.stringify(options));
      // console.log('响应参数：' + JSON.stringify(data));
      if (error.value) {
        reject(error)
        return
      }
      resolve(data.value)
    }).catch((err: any) => {
      reject(err)
	  return
    })
  })
}

//对象为空删除空值 
const delObjectKey = (obj:any) => {
  if (!obj) { return obj; }
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    const validVals = [0, false];
    const isValNone = !val && !validVals.includes(val);
      if (isValNone) {
        delete obj[key]
      }
  });

  return obj
}
const get = (url: string, params?: any): Promise<any> => {
  delObjectKey(params)
  return fetch(url, { method: 'get', params })
}

const post = (url: string, body?: any): Promise<any> => {
  delObjectKey(body)
  return fetch(url, { method: 'post', body })
}

const put = (url: string, body?: any): Promise<any> => {
  delObjectKey(body)
  return fetch(url, { method: 'put', body })
}

const del = (url: string, body?: any): Promise<any> => {
  return fetch(url, { method: 'delete', body })
}

const patch = (url: string, body?: any): Promise<any> => {
  return fetch(url, { method: 'PATCH', body })
}

export { get, post, del, put, patch }; 