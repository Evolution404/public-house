import axios from './apiConfig'

const FileUploadAPI = {
  // 上传图纸
  // formData中包括index代表公用房的序号
  ULDrawings(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 导入公用房信息
  ULPH(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 上传教学单位工作量
  ULTeachingUnitWorkLoad(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 上传科研单位工作量
  ULScientificUnitWorkLoad(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 上传规范分
  ULSpecificationPoints(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 上传商业用房数据
  ULBusiness(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 上传教室承担课程信息
  ULClassroom(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 导入部门信息
  ULDept(formData){
    formData.append('module', 'buchubumen')
    return new Promise((resolve, reject)=>{
      axios({
        processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
        contentType: false,  // 告诉axios不要去设置Content-Type请求头
        url:'/tb-buchu-bumen/import-excel',
        method: 'post',
        data: formData,
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  // 导入楼宇信息
  ULBuildings(formData){
    formData.append('module', 'louyu')
    return new Promise((resolve, reject)=>{
      axios({
        url:'/tb-louyu/import-excel',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  ULPersonnel(formData){
    formData.append('module', 'shiyongzhe')
    return new Promise((resolve, reject)=>{
      axios({
        url:'/tb-shiyongzhe/import-excel',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
}

export default FileUploadAPI
