import React, {Component} from 'react'
import {Table} from 'antd'

// 需要传入data, columns, onSelectedChange参数
// 如果不传入onSelectedChange那么就不会有复选框出现
//   当选择发生变化时会给onSelectedChange函数传入list,包括所有被选中项在data中的位置

class MyTable extends Component{
  render(){
    // 为data添加key键,这个键就是其在数组中的位置, 这样在调用的时候data不需要有key键
    let data = this.props.data.map((d, key)=>({...d, key}))
    // 设置对齐方式为居中
    let columns = this.props.columns.map((d, key)=>({...d, align: 'center'}))
    let pagination = {
      total: this.props.data.length,
      showTotal: (total, range) => `共${total}条  显示${range[0]} ~ ${range[1]}条`,
      pageSize: 10,
      defaultCurrent: 1,
    }
    let rowSelection
    if(this.props.onSelectedChange){
      rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.props.onSelectedChange(selectedRowKeys)
        }
      }
    }else{
      rowSelection = null
    }
    let locale = {
      emptyText: '暂无数据'
    }
    return (
      <Table {...this.props} 
        dataSource={data}
        columns={columns}
        pagination={pagination}
        locale={locale}
        rowSelection={rowSelection}/>
    )
  }
}

// 生成table的工具
const TableUtil = {
  mapColumnC2E: c=>{
    switch(c){
      case '序号':
        return 'id'
      case '部门':
        return 'dept'
      case '位置':
        return 'location'
      case '使用性质':
        return 'usingNature'
      case '使用者':
        return 'user'
      case '填报时间':
        return 'fillInTime'
      case '状态':
        return 'status'
      case '审批时间':
        return 'auditTime'
      case '面积':
        return 'area'
      case '建立时间':
        return 'setUpTime'
      case '维护人':
        return 'maintenancePeople'
      case '备注':
        return 'remark'
      case '可容纳人数':
        return 'peopleNum'
      case '实际人数':
        return 'realPeopleNum'
      case '公寓':
        return 'apartment'
      case '楼层':
        return 'floor'
      case '房间':
        return 'room'
      case '部门名称':
        return 'deptName'
      case '定额面积':
        return 'fixedArea'
      case '实际面积':
        return 'realArea'
      case '超额面积':
        return 'excessArea'
      case '单位名称':
        return 'companyName'
      case '本科生':
        return 'undergraduates'
      case '硕士':
        return 'masterDegree'
      case '博士':
        return 'doctor'
      case '博士后':
        return 'postdoctoral'
      case '名称':
        return 'name'
      case '建筑面积':
        return 'buildingArea'
      case '建筑年代':
        return 'buildingTime'
      case '使用面积':
        return 'useArea'
      case '姓名':
        return 'name'
      case '职务':
        return 'duty'
      case '单位':
        return 'monad'
      case '指导研究生数量':
        return 'guideNum'
      case '登录账号':
        return 'loginAccount'
      case '所属部门':
        return 'dept'
      case '角色':
        return 'role'
      default:
        return ''
    }
  },
  render: c=>{
    switch(c){
      case '状态':
        return (text) =>{
          switch(text){
            case 1:
              return <span style={{color:'#008000'}}>已审核</span>
            case 2:
              return <span style={{color:'#ff0000'}}>已驳回</span>
            case 0:
            default:
              return <span style={{color:'#333'}}>未上报</span>
          }
        }
      default:
        return text=>text
    }
  },
  // 输入中文列表, 生成table的列
  mapColumns: columnsList=>{
    return columnsList.map(c=>{
      return {title: c,
        dataIndex:TableUtil.mapColumnC2E(c),
        render:TableUtil.render(c)}
    })
  }
}

export {TableUtil}
export default MyTable
