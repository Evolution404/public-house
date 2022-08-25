// import Home from './component/home'
import Login from './component/common/login'

// 信息管理
import BasicInfoManagement from './component/infoManagement/basicInfoManagement'
import PHList from './component/infoManagement/PHList'
import PHAdd from './component/infoManagement/PHAdd'
import PHAddBrief from './component/infoManagement/PHAddBrief'
import PHChange from './component/infoManagement/PHChange'
import PHChangeBrief from './component/infoManagement/PHChangeBrief'
import PHTransform from './component/infoManagement/PHTransform'
import PHTransformAudit from './component/infoManagement/PHTransformAudit'
import PHImport from './component/infoManagement/PHImport'
import PHImportDetail from './component/infoManagement/PHImportDetail'
import PHAuditDetail from './component/infoManagement/PHAuditDetail'
import PHAudit from './component/infoManagement/PHAudit'
import PHDetailInfo from './component/infoManagement/PHDetailInfo'
import MyPH from './component/infoManagement/myPH'

// 公用房查询
import ConditionQuery from './component/statisticalQuery/conditionQuery'
import BuildingQuery from './component/statisticalQuery/buildingQuery'

// 核算管理
import OverallAccount from './component/accountingManagement/overallAccount'
import DepartmentAccount from './component/accountingManagement/departmentAccount'
import PersonalAccount from './component/accountingManagement/personalAccount'

// 绩效管理
import DataImport from './component/performanceManagement/dataImport'
import CheckWorkload from './component/performanceManagement/checkWorkload'
import TeachingUnitPerformance from './component/performanceManagement/teachingUnitPerformance'
import ScientificPerformance from './component/performanceManagement/scientificPerformance'
import BusinessPerformance from './component/performanceManagement/businessPerformance'
import LabPerformance from './component/performanceManagement/labPerformance'
import ClassroomPerformance from './component/performanceManagement/classroomPerformance'

// 动态监测
import RealtimeMonitor from './component/dynamicMonitoring/realtimeMonitor'
import MonitorStatistics from './component/dynamicMonitoring/monitorStatistics'

// 会议室管理
import MeetingRoomReservation from './component/meetingRoomManagement/meetingRoomReservation'
import ReservationAudit from './component/meetingRoomManagement/reservationAudit'
import MyReservation from './component/meetingRoomManagement/myReservation'
import UseStatistical from './component/meetingRoomManagement/useStatistical'
import UseStatisticalDetail from './component/meetingRoomManagement/useStatisticalDetail'

// 公寓管理
import ARealtimeMonitor from './component/apartmentManagement/aRealtimeMonitor'
import AMonitorStatistics from './component/apartmentManagement/aMonitorStatistics'

// 系统管理
import DeptManagement from './component/systemManagement/deptManagement'
import ParmManagement from './component/systemManagement/parmManagement'
import BuildingManagement from './component/systemManagement/buildingManagement'
import TheUserManagement from './component/systemManagement/theUserManagement'
import UserManagement from './component/systemManagement/userManagement'
import AreaSubsidiesImport from './component/systemManagement/areaSubsidiesImport'


const routerMap = {
  Login: {
    path:'/login',
    name:'登录页面',
    component: Login
  },
  BasicInfoManagement: {
    path:'/basicInfoManagement',
    name:'基础信息管理',
    component: BasicInfoManagement
  },
  PHList: {
    path:'/PHList',
    name:'公用房列表',
    component: PHList
  },
  PHAdd: {
    path:'/PHAdd',
    name:'公用房新增',
    component: PHAdd
  },
  PHAddBrief: {
    path:'/PHAddBrief',
    name:'公用房新增',
    component: PHAddBrief
  },
  PHChange: {
    path:'/PHChange/:id',
    name:'公用房变更',
    component: PHChange
  },
  PHChangeBrief: {
    path:'/PHChangeBrief/:id',
    name:'公用房变更',
    component: PHChangeBrief
  },
  PHTransform: {
    path:'/PHTransform',
    name:'公用房改造',
    component: PHTransform
  },
  PHTransformAudit: {
    path:'/PHTransformAudit',
    name:'公用房改造审核',
    component: PHTransformAudit
  },
  PHImport: {
    path:'/PHImport',
    name:'公用房导入',
    component: PHImport
  },
  PHImportDetail: {
    path:'/PHImportDetail',
    name:'公用房导入',
    component: PHImportDetail
  },
  PHAuditDetail: {
    path:'/PHAuditDetail/:id',
    name:'公用房审批',
    component: PHAuditDetail
  },
  PHAudit: {
    path:'/PHAudit',
    name:'公用房变更审核',
    component: PHAudit
  },
  PHDetailInfo: {
    path:'/PHDetailInfo/:id',
    name:'公用房详细信息',
    component: PHDetailInfo
  },
  MyPH: {
    path:'/MyPH/:id',
    name:'我的公用房',
    component: MyPH
  },
  ConditionQuery: {
    path:'/ConditionQuery',
    name:'条件查询',
    component: ConditionQuery
  },
  BuildingQuery: {
    path:'/BuildingQuery',
    name:'楼宇查询',
    component: BuildingQuery
  },
  OverallAccount: {
    path:'/OverallAccount',
    name:'总体核算',
    component: OverallAccount
  },
  DepartmentAccount: {
    path:'/DepartmentAccount/:id',
    name:'部门核算',
    component: DepartmentAccount
  },
  PersonalAccount: {
    path:'/PersonalAccount',
    name:'个人核算',
    component: PersonalAccount
  },
  DataImport: {
    path:'/DataImport',
    name:'数据导入',
    component: DataImport
  },
  CheckWorkload: {
    path:'/CheckWorkload',
    name:'工作量查看',
    component: CheckWorkload
  },
  TeachingUnitPerformance: {
    path:'/TeachingUnitPerformance',
    name:'教学部门绩效',
    component: TeachingUnitPerformance
  },
  ScientificPerformance: {
    path:'/ScientificPerformance',
    name:'科研部门绩效',
    component: ScientificPerformance
  },
  BusinessPerformance: {
    path:'/BusinessPerformance',
    name:'商业用房绩效',
    component: BusinessPerformance
  },
  LabPerformance: {
    path:'/LabPerformance',
    name:'实验室绩效',
    component: LabPerformance
  },
  ClassroomPerformance: {
    path:'/ClassroomPerformance',
    name:'教室绩效',
    component: ClassroomPerformance
  },
  RealtimeMonitor: {
    path:'/RealtimeMonitor',
    name:'实时监测',
    component: RealtimeMonitor
  },
  MonitorStatistics: {
    path:'/MonitorStatistics',
    name:'监测统计',
    component: MonitorStatistics
  },
  MeetingRoomReservation: {
    path:'/MeetingRoomReservation',
    name:'会议室预约',
    component: MeetingRoomReservation
  },
  ReservationAudit: {
    path:'/ReservationAudit',
    name:'预约审批',
    component: ReservationAudit
  },
  MyReservation: {
    path:'/MyReservation',
    name:'我的预约',
    component: MyReservation
  },
  UseStatistical: {
    path:'/UseStatistical',
    name:'使用统计',
    component: UseStatistical
  },
  UseStatisticalDetail: {
    path:'/UseStatisticalDetail/:id',
    name:'使用统计详细',
    component: UseStatisticalDetail
  },
  ARealtimeMonitor: {
    path:'/ARealtimeMonitor',
    name:'实时监测',
    component: ARealtimeMonitor
  },
  AMonitorStatistics: {
    path:'/AMonitorStatistics',
    name:'监测统计',
    component: AMonitorStatistics
  },
  DeptManagement: {
    path:'/DeptManagement',
    name:'部门管理',
    component: DeptManagement
  },
  ParmManagement: {
    path:'/ParmManagement',
    name:'参数管理',
    component: ParmManagement
  },
  BuildingManagement: {
    path:'/BuildingManagement',
    name:'楼宇管理',
    component: BuildingManagement
  },
  TheUserManagement: {
    path:'/TheUserManagement',
    name:'人员信息管理',
    component: TheUserManagement
  },
  UserManagement: {
    path:'/UserManagement',
    name:'用户管理',
    component: UserManagement
  },
  AreaSubsidiesImport: {
    path:'/AreaSubsidiesImport',
    name:'补贴面积',
    component: AreaSubsidiesImport
  },
}

export default routerMap
