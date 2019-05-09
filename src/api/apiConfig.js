import axios from "axios"
import {message} from 'antd'
let host = 'http://140.249.19.181:8910'
if(localStorage.getItem('host'))
  host = localStorage.getItem('host')
const domainName = host+'/api/gongyongfang'
axios.defaults.withCredentials = true

const http = axios.create({
    baseURL: domainName,
    timeout: 10000,
})
http.defaults.withCredentials = true
http.interceptors.request.use(config=>{
  let token = localStorage.getItem("x-auth-token")
  if(token){
    config.headers['X-gongyongfangguanliApp-params'] = token
  }
  // 去除get请求中参数的空值
  if(config.method==='get'){
    for(let key in config.params){
      if(!config.params[key]&&config.params[key]!==0)
        delete config.params[key]
    }
  }

  return config
},err=>{
  message.destroy()
  return Promise.reject(err)
})

http.interceptors.response.use(rs=>{
  return rs
  },
  err=>{
    message.destroy()
    if(err&&err.response&&err.response.data&&err.response.data.title){
      message.error(err.response.data.title)
    }
    return Promise.reject(err)
  }
)

let wrapper = (promise) => {
   return promise.then(function(){
       return [null, ...arguments]
   }).catch(err => {
       return [err, null]
   })
}

export default http
export {host, wrapper}
