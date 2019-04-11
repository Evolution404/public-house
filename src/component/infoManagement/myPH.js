import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Input, Select, Form, Row, Col, Button, message, Spin, Card, Tag} from 'antd'
import API from '../../api'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'

const Option = Select.Option
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
        <Card.Grid style={gridStyle}><Label>本科生:</Label>
          <InfoTag data={data.undergraduate}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>研究生:</Label>
          <InfoTag data={data.masterDegree}/></Card.Grid>
        <Card.Grid style={gridStyle}><Label>博士生</Label>
          <InfoTag data={data.doctor}/></Card.Grid>
      </Card>
    )
  }
}

class Search extends Component{
  onSearch = ()=>{
    let self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        self.props.onSearch(values)
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form
    return (
      <Form labelCol={{span: 8}} wrapperCol={{span:16}}>
        <Row>
          <Col span={6}>
            <Item label="部门名称">
              {getFieldDecorator('dept',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="使用性质">
              {getFieldDecorator('usingNature',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="二级性质">
              {getFieldDecorator('secondaryNature',)(
                <Select></Select>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Item label="楼宇名称">
              {getFieldDecorator('buildingName',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="房间号">
              {getFieldDecorator('roomNum',)(
                <Input></Input>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="使用者">
              {getFieldDecorator('personnel',)(
                <Input></Input>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Button onClick={this.onSearch} style={{marginTop: 5}} type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
Search = Form.create({ name: 'search' })(Search)
class DisplayTable extends Component{
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '使用性质',
        dataIndex: 'usingNature',
      },
      {
        title: '二级性质',
        dataIndex: 'secondaryNature',
      },
      {
        title: '使用者',
        dataIndex: 'personnel',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
        <Router>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Link to={Map.PHDetailInfo.path.replace(':id', record.id)}>
              <SButton text='详细'/>
            </Link>
          </div>
        </Router>
        )
      },
    ]
    return (
      <Table columns={columns} {...this.props}></Table>      
    )
  }
}

class MyPH extends Component{
  state = {
    personnelInfo: {},
    tableList: [],
    tableLoading: false,
    // TODO infoLoading改成true
    infoLoading: false,
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
      // TODO 接口对接删除
      let rs = {
        workNum: '1100018',
        name: '张三',
        dept: '计算机与软件学院',
        dutyGrade: '院士',
        undergraduate: '10',
        masterDegree: '10',
        doctor: '10',
      }
      this.setState({personnelInfo: rs})
      // }
      this.setState({infoLoading: false})
    })
  }
  componentDidMount(){
    let id = this.props.match.params.id
    if(id===':id')
      id = JSON.parse(localStorage.getItem('id'))
    this.initPersonnelInfo(id)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({infoLoading: true})
    let id = nextProps.match.params.id
    if(id===':id')
      id = JSON.parse(localStorage.getItem('id'))
    this.initPersonnelInfo(id)
  }
  search = (values)=>{
    this.setState({tableLoading: true})
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
      // TODO 对接后删除
      let data = [{
        id: 1,
        dept: 'x部门',
        location: 'xxx',
        usingNature: 'xxxnature',
        secondaryNature: 'xxxnature',
        personnel: 'xxxper',
      }]
      this.setState({tableList: data})
    })
  }
  render(){
    return <MainContainer name="信息管理">
      <Spin spinning={this.state.infoLoading}>
        <PersonalInfo data={this.state.personnelInfo}></PersonalInfo>
      </Spin>
      <Search onSearch={this.search}></Search>
      <Split></Split>
      <DisplayTable
        data={this.state.tableList}/>
    </MainContainer>
  }
}

export default MyPH
