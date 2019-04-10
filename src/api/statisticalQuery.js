import axios from './apiConfig'
import {MapB2F} from './nameMapConfig'
//import {MapB2F, MapF2B} from './nameMapConfig'

const buildingQuery = {
  buildingSearch(buildingName){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-louyu/get', {
        params: {
          louyumingcheng: buildingName,
        }
      })
      .then(rs=>{
        let data = MapB2F(rs.data)
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  }

}

const conditionQuery = {
  // 条件查询

  conditionSearch(values){
    // search组件传的一系列参数

    return new Promise((resolve, reject)=>{
      axios.get('/tb-shiyongzhe/get/all', {
        params: {
        }
      })
      .then(rs=>{
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  }
}

export default {
  ...buildingQuery,
  ...conditionQuery,
}
