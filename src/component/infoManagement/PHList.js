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
import Table, {TableUtil, sorterParse} from '../common/table'
import Search from '../common/search'
import {read, write} from '../stateHelper'

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
          <div style={{padding: '10px', display: 'inline-block'}}><LButton onClick={this.props.delete.bind(this, -1)}
          disable={!this.props.selected||this.props.selected.length===0} text='X删除'/></div>
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
    let tableColumns = [
      [
        {
          title: '部门',
          dataIndex: 'dept',
          sorter: true,
        },
        {
          title: '楼宇',
          dataIndex: 'building',
          sorter: true,
        },
        {
          title: '楼层',
          dataIndex: 'floor',
          sorter: true,
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
          sorter: true,
        },
        {
          title: '使用面积(㎡)',
          dataIndex: 'useArea',
          sorter: true,
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
          title: '年收入(元)',
          dataIndex: 'annualIncome',
          sorter: true,
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          sorter: true,
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '租金单价(元/㎡)',
          dataIndex: 'rentPrice',
          sorter: true,
        },
        {
          title: '租金类型',
          dataIndex: 'rentType',
          sorter: true,
        },
      ],
      [
        {
          title: '部门',
          dataIndex: 'dept',
          sorter: true,
        },
        {
          title: '楼宇',
          dataIndex: 'building',
          sorter: true,
        },
        {
          title: '楼层',
          dataIndex: 'floor',
          sorter: true,
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
          sorter: true,
        },
        {
          title: '使用面积(㎡)',
          dataIndex: 'useArea',
          sorter: true,
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
          sorter: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          sorter: true,
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          sorter: true,
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
          sorter: true,
        },
        {
          title: '楼宇',
          dataIndex: 'building',
          sorter: true,
        },
        {
          title: '楼层',
          dataIndex: 'floor',
          sorter: true,
        },
        {
          title: '房间号',
          dataIndex: 'roomNum',
          sorter: true,
        },
        {
          title: '使用面积(㎡)',
          dataIndex: 'useArea',
          sorter: true,
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
          sorter: true,
        },
        {
          title: '年收入(元)',
          dataIndex: 'annualIncome',
          sorter: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          sorter: true,
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          sorter: true,
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '租金单价(元/㎡)',
          sorter: true,
          dataIndex: 'rentPrice',
        },
        {
          title: '租金类型',
          sorter: true,
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
          sorter: true,
          dataIndex: 'dept',
        },
        {
          title: '楼宇',
          sorter: true,
          dataIndex: 'building',
        },
        {
          title: '楼层',
          sorter: true,
          dataIndex: 'floor',
        },
        {
          title: '房间号',
          sorter: true,
          dataIndex: 'roomNum',
        },
        {
          title: '具体用途',
          sorter: true,
          dataIndex: 'spectificPurpose',
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          sorter: true,
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
          <Link to={path}>
            <SButton text='变更'/>
          </Link>
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
      width: 300,
      render: (text, record, index)=>(
        <Router>
          <div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
              <SButton disable={!(record.auditStatus==='已驳回'||record.auditStatus==='未上报')} onClick={this.props.delete.bind(this,record)} text='X删除'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
              <Link to={Map.PHDetailInfo.path.replace(':id', `${this.props.type}-${record.id}`)}>
                <SButton text='详细'/> 
              </Link>
            </div>
            <div style={{display: 'inline-block', padding: '0 5px'}}>
                <SButton onClick={this.props.report.bind(this, record)} disable={record.auditStatus!=='未上报'} text='上报'/>
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
      status: '',
      isSearched: false,
      tableList: [], // 表格处的数据
      tableLoading: false,
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
      current: 0,
    }
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  search = (values)=>{
    this.setState({type: values.usingNature[0], isSearched: true, tableLoading: true, current: 1})
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
    if(index!==-1)
      index=[index.id]
    else{
      index = this.state.selected.map(i=>i.id)
    }
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
  tableChange = (p, s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    let filter = {
      deptName: this.state.deptName,
      usingNature: this.state.usingNature,
      auditStatus: this.state.auditStatus,
      personnel: this.state.personnel,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      status: this.state.status,
    }
    API.listFilterPH(sorterParse(filter, s), p)
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
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    let filter = {
      deptName: this.state.deptName,
      usingNature: this.state.usingNature,
      auditStatus: this.state.auditStatus,
      personnel: this.state.personnel,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      status: this.state.status,
    }
    this.setState({tableLoading: true})
    return API.listFilterPH(filter, this.state.page)
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
  report = (record)=>{
    let id = record.id
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
      selected: this.state.selected,
    }
    let filter = {
      deptName: this.state.deptName,
      usingNature: this.state.usingNature,
      auditStatus: this.state.auditStatus,
      personnel: this.state.personnel,
      buildingName: this.state.buildingName,
     roomNum: this.state.roomNum,
     status: this.state.status,
   }
   return <MainContainer name="公用房列表">
     <Search
        initialValue={filter}
        onSearch={this.search}/>
      <Split/>
      <ButtonGroup {...groupHelper}/>
      {
        this.state.isSearched?(
          <DisplayTable loading={this.state.tableLoading}
            current={this.state.current}
            onChange={this.tableChange}
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
