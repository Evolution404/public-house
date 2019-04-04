import React, {Component} from 'react'
import {message} from 'antd';
import MainContainer from '../common/mainContainer'
import Search from '../common/search'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {TableUtil} from '../common/table'
import API from '../../api'

// 需要传入type类型
// common: 普通类型
// apartment: 公寓类型
class DisplayTable extends Component{
  common(){
    const columns = TableUtil.mapColumns([
      '部门', '位置', '使用性质', '使用者', '填报时间',
      '状态', '审批时间',
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton text='详细'/>
          </div>
        </div>
      )
    })
    return <Table columns={columns} {...this.props}/>
  }
  apartment(){
    const columns = TableUtil.mapColumns([
      '序号', '公寓', '楼层', '房间', '可容纳人数',
      '实际人数', '备注',
    ])
    return <Table columns={columns} {...this.props}/>
  }
  render(){
    if(this.props.type==='apartment'){
      return this.apartment()
    }
    return this.common()
  }
}

class ConditionQuery extends Component{
  constructor(props){
    super(props)
    this.state = {
      // 以下数据是搜索组件需要的数据, 使用双向数据绑定
      dept: '',
      uesingNature: '',
      auditStatus: '',
      personnel: '',
      buildingName: '',
      roomNum: '',
      houseStatus: '',
      tableList: [], // 表格处的数据
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
    }
  }
  search = (values)=>{
    this.setState(values)
    API.conditionSearch(values)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      message.error('查询失败')
    })
    
  }
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    let filter = {
      dept: this.state.dept,
      usingNature: this.state.usingNatur,
      auditStatus: this.state.auditStatus,
      user: this.state.user,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      houseStatus: this.state.houseStatus,
    }
    return API.listFilterPH(filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('获取失败, 请重试')
    })
  }
  render(){
    return <MainContainer name="统计查询">
      <Search onSearch={this.search}/>
      <Split/>
      <DisplayTable data={this.state.tableList}/>
      <DisplayTable type="apartment" data={this.state.tableList}/>
    </MainContainer>
  }
}

export default ConditionQuery
