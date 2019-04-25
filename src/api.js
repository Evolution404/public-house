// 引用假数据, 对接后删除
import AccountingManagement from './api/accountingManagement'
import ApartmentManagement from './api/apartmentManagement'
import DynamicMonitoring from './api/dynamicMonitoring'
import FileUploadAPI from './api/fileUpload'
import InfoManagement from './api/infoManagement'
import MeetingRoomManagement from './api/meetingRoomManagement'
import PerformanceManagement from './api/performanceManagement'
import StatisticalQuery from './api/statisticalQuery'
import SystemManagement from './api/systemManagement'



const API = {
  ...AccountingManagement,
  ...ApartmentManagement,
  ...DynamicMonitoring,
  ...FileUploadAPI,
  ...InfoManagement,
  ...MeetingRoomManagement,
  ...PerformanceManagement,
  ...StatisticalQuery,
  ...SystemManagement,
}

let wrapper = (promise) => {
   return promise.then(function(){
       return [null, ...arguments]
   }).catch(err => {
       return [err, null]
   })
}
export default API
export {wrapper}
