import axios from "axios"
let host = 'http://140.249.19.181:8910'
if(localStorage.getItem('host'))
  host = localStorage.getItem('host')
const domainName = host+'/api/gongyongfang'
axios.defaults.withCredentials = true

const http = axios.create({
    baseURL: domainName,
    timeout: 5000,
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
  return Promise.reject(err)
})
let wrapper = (promise) => {
   return promise.then(function(){
       return [null, ...arguments]
   }).catch(err => {
       return [err, null]
   })
}

export default http
export {host, wrapper}
