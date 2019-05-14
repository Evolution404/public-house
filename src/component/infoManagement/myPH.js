import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {message, Spin, Empty} from 'antd'
import API from '../../api'
import Split from '../common/split'
import Table, {TableUtil, sorterParse} from '../common/table'
import {SButton} from '../common/button'
import {MyPHSearch} from '../common/search'
import MainContainer from '../common/mainContainer'
import css from '../../cssConfig'
import {read, write} from '../stateHelper'
import badge1 from './images/badge1.png'

/*class InfoTag extends Component{
  render(){
    return (
      <Tag style={{}} color="blue">{this.props.data}</Tag>
    )
  }
}

function Label(props){
  return <span style={{width: 65, display: 'inline-block'}}>{props.children}</span>
}*/

class PersonalInfo extends Component{
  render(){
    /*const gridStyle = {
      width: '25%',
    }*/
    let data = this.props.data
    return (
      /*<Card style={{marginBottom: 10, border:0}} >
        <Card.Grid style={gridStyle}><Label>工号:</Label>
          <InfoTag data={data.workNum}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>姓名:</Label>
          <InfoTag data={data.name}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>所属部门:</Label>
          <InfoTag data={data.dept}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>职务级别:</Label>
          <InfoTag data={data.dutyGrade}/></Card.Grid>
      </Card>*/
      <div style={{backgroundColor: '#f2f2f2', height: 120, padding: 20, paddingLeft: '3%',display: 'flex'}}>
        <div style={{ width: 300, display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRight: '1px solid #a4a4a4'}}>
          <p style={{fontSize: 20, paddingBottom: 10}}>{data.name}</p>
          <p style={{fontSize: 16, color: css.blue}}>工号:{data.workNum}</p>
        </div>
        <div style={{color:'#a4a4a4',paddingLeft: 20, width: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <p style={{fontSize: 12, paddingBottom: 10}}>部门: 
            <span style={{color: '#696969', fontSize: 15, paddingLeft: 10}}>{data.dept}</span>
          </p>
          <p style={{fontSize: 12, paddingBottom: 10}}>职务: 
            <span style={{color: '#696969', fontSize: 15, paddingLeft: 10}}>{data.dutyGrade}
              <img style={{padding: '0 5px', marginTop: -3}} src={badge1} alt=""/>
            </span>
          </p>
        </div>
      </div>
    )
  }
}

class DisplayTable extends Component{
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
          title: '使用面积',
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
          title: '年收入',
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
          title: '租金单价',
          sorter: true,
          dataIndex: 'rentPrice',
        },
        {
          title: '租金类型',
          sorter: true,
          dataIndex: 'rentType',
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
          title: '使用面积',
          sorter: true,
          dataIndex: 'useArea',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '状态',
          sorter: true,
          dataIndex: 'status',
        },
        {
          title: '审批状态',
          sorter: true,
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
          title: '使用面积',
          sorter: true,
          dataIndex: 'useArea',
        },
        {
          title: '具体用途',
          dataIndex: 'spectificPurpose',
        },
        {
          title: '年收入',
          sorter: true,
          dataIndex: 'annualIncome',
        },
        {
          title: '状态',
          sorter: true,
          dataIndex: 'status',
        },
        {
          title: '审批状态',
          sorter: true,
          dataIndex: 'auditStatus',
          render: (text)=>(
            TableUtil.mapColor(text)
          )
        },
        {
          title: '租金单价',
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
          dataIndex: 'spectificPurpose',
        },
        {
          title: '审批状态',
          sorter: true,
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
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Link to={Map.PHDetailInfo.path.replace(':id', this.props.type+'-'+record.id)}>
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

class MyPH extends Component{
  state = {
    type: '',
    personnelInfo: {},
    tableList: [],
    isSearched: false,
    tableLoading: false,
    infoLoading: true,
    current: 0,
    filter: {},
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  initPersonnelInfo = id=>{
    API.getPersonnelInfo(id)
    .then(rs=>{
      this.setState({personnelInfo: rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('获取个人信息失败')
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
    this.setState({type: values.usingNature[0], isSearched: true, tableLoading: true, current: 1,
                  filter: values})
    API.myPHSearch(values)
    .then(rs=>{
      this.setState({tableList:rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  tableChange = (p, s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.myPHSearch(sorterParse(this.state.filter, s), p)
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
    return <MainContainer name="我的公用房">
      <Spin spinning={this.state.infoLoading}>
        <PersonalInfo data={this.state.personnelInfo}></PersonalInfo>
      </Spin>
      <MyPHSearch
        initialValue={this.state.filter}
        onSearch={this.search}></MyPHSearch>
      <Split></Split>
      {
        this.state.isSearched?(
          <DisplayTable loading={this.state.tableLoading}
            current={this.state.current}
            onChange={this.tableChange}
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
