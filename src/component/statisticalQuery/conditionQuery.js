import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {message, Empty, Button, Row, Col} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {TableUtil} from '../common/table'
import Search from '../common/search'


class DisplayTable extends Component{
  mapStatus(value){
    value = parseInt(value)
    switch(value){
      case 1:
        return <span style={{color:'#008000'}}>已审核</span>
      case 2:
        return <span style={{color:'#ff0000'}}>已驳回</span>
      case 0:
      default:
        return <span style={{color:'#333'}}>未上报</span>
    }
  }
  render(){
    let tableColumns = [
      [
        {
          title: '部门',
          dataIndex: 'dept',
        },
        {
          title: '楼宇',
          dataIndex: 'building',
        },
        {
          title: '楼层',
          dataIndex: 'floor',
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
        },
        {
          title: '使用面积',
          dataIndex: 'useArea',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '科研团队',
          dataIndex: 'scientificTeam',
        },
        {
          title: '年收入',
          dataIndex: 'annualIncome',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '租金单价',
          dataIndex: 'rentPrice',
        },
        {
          title: '租金类型',
          dataIndex: 'rentType',
        },
        {
          title: '备注',
          dataIndex: 'note',
        },
      ],
      [
        {
          title: '部门',
          dataIndex: 'dept',
        },
        {
          title: '楼宇',
          dataIndex: 'building',
        },
        {
          title: '楼层',
          dataIndex: 'floor',
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
        },
        {
          title: '使用面积',
          dataIndex: 'useArea',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '备注',
          dataIndex: 'note',
        },
      ],
      [
        {
          title: '部门',
          dataIndex: 'dept',
        },
        {
          title: '楼宇',
          dataIndex: 'building',
        },
        {
          title: '楼层',
          dataIndex: 'floor',
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
        },
        {
          title: '使用面积',
          dataIndex: 'useArea',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '年收入',
          dataIndex: 'annualIncome',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '租金单价',
          dataIndex: 'rentPrice',
        },
        {
          title: '租金类型',
          dataIndex: 'rentType',
        },
        {
          title: '备注',
          dataIndex: 'note',
        },
      ],
      [
        {
          title: '部门',
          dataIndex: 'dept',
        },
        {
          title: '楼宇',
          dataIndex: 'building',
        },
        {
          title: '楼层',
          dataIndex: 'floor',
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
        },
        {
          title: '容纳人数',
          dataIndex: 'galleryful',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '备注',
          dataIndex: 'note',
        },
      ],
    ]
    let operate = {
      title: '操作',
      render: (text, record, index)=>(
        <Router>
          <div style={{display: 'inline-block', padding: '0 5px'}}>
            <Link to={Map.PHDetailInfo.path.replace(':id', `${this.props.type}-${record.id}`)}>
              <SButton text='详细'/> 
            </Link>
          </div>
        </Router>
      )
    }
    tableColumns[0].push(operate)
    tableColumns[1].push(operate)
    tableColumns[2].push(operate)
    tableColumns[3].push(operate)
    if(this.props.type){
      tableColumns = tableColumns[this.props.type-1]
    }else{
      tableColumns = []
    }

    return <Table columns={tableColumns} {...this.props}/>
  }
}

class ConditionQuery extends Component{
  constructor(props){
    super(props)
    this.state = {
      type: '',
      deptName: '',
      uesingNature: '',
      auditStatus: '',
      personnel: '',
      buildingName: '',
      roomNum: '',
      houseStatus: '',
      isSearched: false,
      tableList: [], // 表格处的数据
      tableLoading: false,
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
      current: 0,
    }
  }
  search = (values)=>{
    this.setState({type: values.usingNature[0], isSearched: true, tableLoading: true})
    this.setState(values)
    API.listFilterPH(values)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    let filter = {
      dept: this.state.dept,
      usingNature: this.state.usingNature,
      auditStatus: this.state.auditStatus,
      personnel: this.state.personnel,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      houseStatus: this.state.houseStatus,
    }
    this.setState({tableLoading: true})
    return API.listFilterPH(filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      if(this.state.isSearched)
        message.error('获取失败, 请重试')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  report = (index)=>{
    let id = this.state.tableList[index].id
    let data = {
      id,
      type: this.state.type,
      auditStatus: '已上报',
    }
    API.reportPH(data)
    .then(()=>{
      message.success('上报成功')
      this.refresh()
      // this.props.history.push(Map.PHAudit.path)
    })
    .catch(err=>{
      message.error('上报失败')
    })
  }
  tableChange = (p)=>{
    let filter = {
      dept: this.state.dept,
      usingNature: this.state.usingNature,
      auditStatus: this.state.auditStatus,
      personnel: this.state.personnel,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      houseStatus: this.state.houseStatus,
    }
    this.setState({tableLoading: true, page:p, current: p.current})
    API.listFilterPH(filter, p)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('加载失败')
    })
    .finally(()=>this.setState({tableLoading: false}))
  }
  render(){
    return <MainContainer name="条件查询">
      基本信息
      <Search onSearch={this.search}/>
      <Split/>
      <Row style={{marginBottom: 10}}>
        <Col offset={16} span={2}><Button type="primary">导出到文件</Button></Col>
        <Col offset={1} span={2}><Button type="primary">打印</Button></Col>
      </Row>
      {
        this.state.isSearched?(
          <DisplayTable loading={this.state.tableLoading}
            current={this.state.current}
            onChange={this.tableChange}
            type={this.state.type}
            data={this.state.tableList}/>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}


export default ConditionQuery
