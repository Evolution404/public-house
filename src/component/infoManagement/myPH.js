import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Input, Select, Form, Row, Col, Button, message, Spin, Card, Tag, Empty, Upload} from 'antd'
import API from '../../api'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
import {MyPHSearch} from '../common/search'
import MainContainer from '../common/mainContainer'
import columns from './typeColumns'

const Item = Form.Item

class InfoTag extends Component{
  render(){
    return (
      <Tag style={{}} color="blue">{this.props.data}</Tag>
    )
  }
}

function Label(props){
  return <span style={{width: 65, display: 'inline-block'}}>{props.children}</span>
}

class PersonalInfo extends Component{
  render(){
    const gridStyle = {
      width: '25%',
    }
    let data = this.props.data
    return (
      <Card style={{marginBottom: 25}} title="使用者信息">
        <Card.Grid style={gridStyle}><Label>工号:</Label>
          <InfoTag data={data.workNum}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>姓名:</Label>
          <InfoTag data={data.name}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>所属部门:</Label>
          <InfoTag data={data.dept}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>职务级别:</Label>
          <InfoTag data={data.dutyGrade}/></Card.Grid>
      </Card>
    )
  }
}

class DisplayTable extends Component{
  render(){
    let tableColumns = JSON.parse(JSON.stringify(columns))
    let operate = {
        title: '操作',
        render: (text, record, index)=>(
        <Router>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Link to={Map.PHDetailInfo.path.replace(':id', this.props.type+'-'+record.id)}>
              <SButton text='详细'/>
            </Link>
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

class MyPH extends Component{
  state = {
    type: '',
    personnelInfo: {},
    tableList: [],
    isSearched: false,
    tableLoading: false,
    infoLoading: true,
  }
  initPersonnelInfo = id=>{
    API.getPersonnelInfo(id)
    .then(rs=>{
      this.setState({personnelInfo: rs})
    })
    .catch(err=>{
      message.error('获取个人信息失败')
      if(err.response)
        message.error(err.response.data.title)
    })
    .finally(()=>{
      this.setState({infoLoading: false})
    })
  }
  componentDidMount(){
    let id = this.props.match.params.id
    if(id===':id')
      id = JSON.parse(localStorage.getItem('userData'))['workNum']
    this.initPersonnelInfo(id)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({infoLoading: true})
    let id = nextProps.match.params.id
    if(id===':id')
      id = JSON.parse(localStorage.getItem('userData'))['workNum']
    this.initPersonnelInfo(id)
  }
  search = (values)=>{
    this.setState({type: values.usingNature[0], isSearched: true, tableLoading: true})
    API.myPHSearch(values)
    .then(rs=>{
      this.setState({tableList:rs})
    })
    .catch(err=>{
      message.error('搜索失败')
      if(err.response)
        message.error(err.response.data.title)
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  render(){
    return <MainContainer name="信息管理">
      <Spin spinning={this.state.infoLoading}>
        <PersonalInfo data={this.state.personnelInfo}></PersonalInfo>
      </Spin>
      <MyPHSearch onSearch={this.search}></MyPHSearch>
      <Split></Split>
      {
        this.state.isSearched?(
          <DisplayTable loading={this.state.tableLoading}
            type={this.state.type}
            data={this.state.tableList}
            onSelectedChange={this.selectedChange}/>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}

export default MyPH
