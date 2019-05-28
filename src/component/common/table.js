import React, {Component} from 'react'
import {mapNameF2B} from '../../api/nameMapConfig'
import {Table} from 'antd'

// 需要传入data, columns, onSelectedChange参数
// 如果不传入onSelectedChange那么就不会有复选框出现
//   当选择发生变化时会给onSelectedChange函数传入list,包括所有被选中项在data中的位置

const pageSize = 10

class MyTable extends Component{
  state = {
   selected: [],
 }
 render(){
   let propOnChange = this.props.onChange||((p)=>{})
   let onChange = (p, f, s)=>{
     this.setState({selected:[]})
     if(this.props.onSelectedChange)
        this.props.onSelectedChange([])
      propOnChange(p, s)
    }
    // 为data添加key键,这个键就是其在数组中的位置, 这样在调用的时候data不需要有key键
    let data = []
    let total=0
    if(Array.isArray(this.props.data)){
      data = this.props.data.map((d, key)=>({...d, key:d.id||key}))
    }
    else {
      data = this.props.data.tableList.map((d, key)=>({...d, key:d.id||key}))
      total = parseInt(this.props.data.total)
    }
    // 设置对齐方式为居中
    let columns = this.props.columns.map((d, key)=>({...d, align: 'center'}))
    let pagination = {
      total,
      showTotal: (total, range) => `共${total}条  显示${range[0]} ~ ${range[1]}条`,
      pageSize,
      defaultCurrent: 1,
    }
    if(this.props.current)
      pagination.current = this.props.current
    let rowSelection
    if(this.props.onSelectedChange){
      rowSelection = {
        selectedRowKeys: this.state.selected,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({selected: selectedRowKeys})
          this.props.onSelectedChange(selectedRows)
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
        pagination={!this.props.noPaginnation&&pagination}
        locale={locale}
        onChange={onChange}
        bordered={true}
        rowSelection={rowSelection}/>
    )
  }
}

// 生成table的工具
const TableUtil = {
  mapColor(text){
    switch(text){
      case '未上报':
        return <span style={{color:'#333'}}>未上报</span>
      case '已审批':
        return <span style={{color:'#008000'}}>已审核</span>
      case '已驳回':
        return <span style={{color:'#ff0000'}}>已驳回</span>
      case '已上报':
        return <span style={{color:'#faad14'}}>已上报</span>
      case '已批准':
        return <span style={{color:'#008000'}}>已批准</span>
      case '已作废':
        return <span style={{color:'#faad14'}}>已作废</span>
      default:
        return <span style={{color:'#333'}}>{text}</span>
    }

  },
  mapColumnC2E: c=>{
    switch(c){
      case '序号':
        return 'id'
      case '工号':
        return 'workNum'
      case '年份':
        return 'year'
      case '单位':
        return 'dept'
      case '位置':
        return 'location'
      case '使用性质':
        return 'usingNature'
      case '使用者':
        return 'personnel'
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
        return 'note'
      case '可容纳人数':
        return 'peopleNum'
      case '实际人数':
        return 'realPeopleNum'
      case '公寓':
        return 'apartment'
      case '楼层':
        return 'floor'
      case '楼层数':
        return 'buildingFloors'
      case '房间':
        return 'room'
      case '单位名称':
        return 'dept'
      case '定额面积':
        return 'fixedArea'
      case '实际面积':
        return 'realArea'
      case '超额面积':
        return 'excessArea'
      case '本科生':
        return 'undergraduate'
      case '硕士':
        return 'masterDegree'
      case '博士':
        return 'doctor'
      case '博士后':
        return 'postdoctoral'
      case '楼宇名称':
        return 'buildingName'
      case '建筑面积':
        return 'buildingArea'
      case '建筑年代':
        return 'buildingTime'
      case '使用面积':
        return 'useArea'
      case '用户名称':
        return 'userName'
      case '职务':
        return 'duty'
      case '登录账号':
        return 'loginAccount'
      case '所属单位':
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
            case 0:
              return <span style={{color:'#333'}}>未上报</span>
            case 1:
              return <span style={{color:'#008000'}}>已审核</span>
            case 2:
              return <span style={{color:'#ff0000'}}>已驳回</span>
            case 3:
              return <span style={{color:'#008000'}}>已上报</span>
            case 4:
              return <span style={{color:'#ff0000'}}>已批准</span>
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

const sorterParse = (filter, sorter)=>{
  if(Object.keys(sorter).length===0)
    return filter
  let {order, field} = sorter
  let newfilter = {
    ...filter,
    sort: `${mapNameF2B[field]||field},${order==='ascend'?'asc':'desc'}`
  }
  return newfilter
}

export {TableUtil, pageSize, sorterParse}
export default MyTable
