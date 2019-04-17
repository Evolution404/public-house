import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Modal, message, Empty} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {LButton, SButton} from '../common/button'
import Split from '../common/split'
import Table from '../common/table'
import Search from '../common/search'
import columns from './typeColumns'

const confirm = Modal.confirm;

class ButtonGroup extends Component{
  render(){
    return (
      <Router><div style={{marginTop: '10px'}}>
          <div style={{padding: '10px', display: 'inline-block'}}>
            <Link to={Map.PHAdd.path}>
              <LButton text='+新增公用房'/>
            </Link>
          </div>
          <div style={{padding: '10px', display: 'inline-block'}}><LButton onClick={this.props.delete.bind(this, -1)} text='X删除'/></div>
          <div style={{padding: '10px', display: 'inline-block'}}><LButton onClick={this.props.refresh} text='刷新'/></div>
          <div style={{padding: '10px', display: 'inline-block'}}>
            <Link to={Map.PHImportDetail.path}>
              <LButton text='从文件夹导入'/>
            </Link>
          </div>
      </div></Router>
    )
  }
}
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
    let tableColumns = JSON.parse(JSON.stringify(columns))
    // 未上报
    // 已上报
    // 已驳回
    // 已批准
    let getChangeButton = (record)=>{
      let path = Map.PHChange.path.replace(':id', `${this.props.type}-${record.id}`)
      switch(record.auditStatus){
        case '未上报':
        return (
          <Link to={path}>
            <SButton text='修改'/>
          </Link>
        )
        case '已上报':
        return (
          <Link to={path}>
            <SButton text='变更'/>
          </Link>
        )
        case '已驳回':
        return (
          <Link to={path}>
            <SButton text='变更'/>
          </Link>
        )
        case '已批准':
        return (
          <SButton disable={true} text='变更'/>
        )
        default:
        return (
          <Link to={path}>
            <SButton text='修改'/>
          </Link>
        )
      }
    }
    let operate = {
      title: '操作',
      render: (text, record, index)=>(
        <Router>
          <div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
              <SButton disable={record.auditStatus==='已审核'} onClick={this.props.delete.bind(this,index)} text='X删除'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
              <Link to={Map.PHDetailInfo.path.replace(':id', `${this.props.type}-${record.id}`)}>
                <SButton text='详细'/> 
              </Link>
            </div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
                <SButton onClick={this.props.report.bind(this, index)} disable={record.auditStatus!=='未上报'} text='上报'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
              {
                getChangeButton(record)
              }
            </div>
          </div>
        </Router>
      )
    }
    tableColumns[1].push(operate)
    tableColumns[2].push(operate)
    tableColumns[3].push(operate)
    tableColumns[4].push(operate)
    if(this.props.type){
      tableColumns = tableColumns[this.props.type]
    }else{
      tableColumns = []
    }

    return <Table columns={tableColumns} {...this.props}/>
  }
}

class PHList extends Component{
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
    }
  }
  search = (values)=>{
    console.log(values)
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
  // 删除条目处理函数
  delete = (index)=>{
    // 转换index为一个list
    // index大于等于0, 说明是删除单条记录 index不变
    // index为-1 说明是删除多条记录, 从state中取到被选中的数据
    index = index===-1?this.state.selected:[index]
    index = index.map(i=>this.state.tableList[i].id)
    let self = this
    confirm({
      title: '删除',
      content: '确定要删除这条记录吗?',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deletePH(index, self.state.type)
        .then(()=>{
          message.success('删除成功')
          self.refresh()
        })
        .catch(err=>{
          console.log(err)
          message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  // 上传条目处理函数
  upload = (index)=>{

  }
  // 修改条目处理函数
  change = (index)=>{

  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
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
  render(){
    let tableHelper = {
      delete: this.delete,
      report: this.report,
    }
    let groupHelper = {
      delete: this.delete,
      refresh: this.refresh,
    }
    return <MainContainer name="信息管理">
      基本信息
      <Search onSearch={this.search}/>
      <Split/>
      <ButtonGroup {...groupHelper}/>
      {
        this.state.isSearched?(
          <DisplayTable loading={this.state.tableLoading}
            type={this.state.type}
            data={this.state.tableList}
            onSelectedChange={this.selectedChange} {...tableHelper}/>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}


export default PHList
