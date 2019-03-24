import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Modal, message} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {LButton, SButton} from '../common/button'
import Input from '../common/input'
import Split from '../common/split'
import Select from '../common/select'
import Table, {TableUtil}from '../common/table'

const confirm = Modal.confirm;

class Search extends Component{
  render(){
    return (
      <div style={{width:"900px",
        padding: '30px 30px 10px 30px',
      }}>
        <div style={{paddingBottom:'20px'}}>
          <Select name="楼宇名称" 
            onChange={this.props.buildingNameChange}/>
          <Input name="楼层" 
            onChange={this.props.floorChange}/>
          <Input name="房间号" 
            onChange={this.props.roomNumChange}/>
          <LButton onClick={this.props.refresh} text="搜索"/>
        </div>
      </div>
    )
  }
}

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
            <Link to={Map.PHImport.path}>
              <LButton text='从文件夹导入'/>
            </Link>
          </div>
      </div></Router>
    )
  }
}
class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '序号', '位置', '面积', '建立时间', '维护人'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
             <SButton onClick={this.props.change.bind(this,index)} text='修改查看'/> 
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.upload.bind(this,index)} text='上传图纸'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class PHManagement extends Component{
  constructor(props){
    super(props)
    this.state = {
      // 以下数据是搜索组件需要的数据, 使用双向数据绑定
      buildingName: '',
      roomNum: '',
      floor: '',
      tableList: [], // 表格处的数据
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
    }
  }
  buildingNameChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  roomNumChange = (e)=>{
    this.setState({
      roomNum: e.target.value
    })
  }
  floorChange = (e)=>{
    this.setState({
      floor: e.target.value
    })
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
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
        return API.deletePH(index)
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
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    let filter = {
      buildingName: this.state.buildingName,
      floor: this.state.floor,
      roomNum: this.state.roomNum,
    }
    return API.filterPH(filter)
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
    let changeListener = {
      buildingNameChange: this.buildingNameChange,
      roomNumChange: this.roomNumChange,
      floorChange: this.floorChange,
      refresh: this.refresh,
    }
    let tableHelper = {
      delete: this.delete,
      upload: this.upload,
      change: this.change,
    }
    let groupHelper = {
      delete: this.delete,
      refresh: this.refresh,
    }
    return <MainContainer name="信息管理">
      基本信息
      <Search {...changeListener}/>
      <Split/>
      <ButtonGroup {...groupHelper}/>
      <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange} {...tableHelper}/>
    </MainContainer>
  }
}


export default PHManagement
