// 引用假数据, 对接后删除
import './mock'
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

export default API
