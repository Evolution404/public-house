import axios from './apiConfig'

let uploadHelper = (data, url)=>{
  return new Promise((resolve, reject)=>{
    axios({
      url,
      method: 'post',
      data,
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
}

const FileUploadAPI = {
  // 导入公用房基本信息
  ULPH(formData){
    formData.append('module', 'gongyongfang-jibenxinxi')
    return uploadHelper(formData, '/tb-gongyongfang-jibenxinxi/import-excel')
  },
  // 导入公用房信息
  ULPHDetail(formData){
    formData.append('module', 'gongyongfang')
    return uploadHelper(formData, '/tb-gongyongfang/import-excel')
  },
  // 上传图纸
  // formData中包括index代表公用房的序号
  ULDrawings(formData){
    formData.append('module', 'jibenxinxi-tupian')
    return uploadHelper(formData, '/tb-gongyongfang-jibenxinxi-tupian/upload-img')
  },
  // 上传教学单位工作量
  ULTeachingUnitWorkLoad(formData){
    return uploadHelper(formData, '')
  },
  // 上传科研单位工作量
  ULScientificUnitWorkLoad(formData){
    return uploadHelper(formData, '')
  },
  // 上传规范分
  ULSpecificationPoints(formData){
    return uploadHelper(formData, '')
  },
  // 上传商业用房数据
  ULBusiness(formData){
    return uploadHelper(formData, '')
  },
  // 上传教室承担课程信息
  ULClassroom(formData){
    return uploadHelper(formData, '')
  },
  // 导入学院部门信息
  ULXYDept(formData){
    formData.append('module', 'xueyuanbumen')
    return uploadHelper(formData, '/tb-xueyuan-bumen/import-excel')
  },
  // 导入部处部门信息
  ULBCDept(formData){
    formData.append('module', 'buchubumen')
    return uploadHelper(formData, '/tb-buchu-bumen/import-excel')
  },
  // 导入楼宇信息
  ULBuildings(formData){
    formData.append('module', 'louyu')
    return uploadHelper(formData, '/tb-louyu/import-excel')
  },
  // 上传平面图
  ULFloorPlan(formData){
    formData.append('module', 'louyu-tupian')
    return uploadHelper(formData, '/tb-louyu-tupian/upload-img')
  },
  ULPersonnel(formData){
    formData.append('module', 'shiyongzhe')
    return uploadHelper(formData, '/tb-shiyongzhe/import-excel')
  },
}

export default FileUploadAPI
export {uploadHelper}
