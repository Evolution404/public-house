import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, Tag, Empty, message, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import {DeptSelect, YearSelect} from '../common/select'
import Histogram from '../common/histogram'
import PieChart from '../common/pieChart'
import Split from '../common/split'
import API from '../../api'
import Table from '../common/table'

const Option = Select.Option
const Item = Form.Item

class Graph extends Component{
  render(){
    let graphData = this.props.graphData
    let rs = this.props.type==="1"?(
          <div style={{marginTop: 50}}>
            {
              !this.props.isPrinting&&(
                <Histogram id="graph"
                  title="定额面积、实际面积、人均面积对比情况"
                  data={graphData}></Histogram>
              )
            }
            {this.props.isPrinting&&(
              <img style={{width: 300}} src={this.props.printData.graphData} alt=""/>
            )}
          </div>
        ):(
          <Row style={{marginTop: 50}}>
            <Col span={12}>
              <PieChart
                data={graphData.pieData}
                title="各分项实际面积对比情况" id="graph1"></PieChart>
            </Col>
            <Col span={12}>
              <Histogram id="graph2"
                title="各分项定额面积、实际面积、人均面积对比情况"
                data={graphData.hisData}></Histogram>
            </Col>
          </Row>
        )
    return rs
  }
}

class MyTag extends Component{
  render(){
    return (
      <Tag style={{marginLeft: 20}} color="blue">{this.props.children}</Tag>      
    )
  }
}

class TotalData extends Component{
  render(){
    return (
      <div>
      <Row style={{margin: 25}}>
        <Col offset={2} span={6}>总面积:<MyTag>{this.props.data.zongmianji}</MyTag></Col>
        <Col offset={2} span={6}>人数:<MyTag>{this.props.data.zongrenshu}</MyTag></Col>
        <Col span={8}>人均面积:<MyTag>{this.props.data.renjunmianji}</MyTag></Col>
      </Row>
      {
        this.props.type==='1'&&(
          <Row>
            <Col offset={2} span={6}>定额面积合计:<MyTag>{this.props.data.zongdingemianji}</MyTag></Col>
            <Col offset={2} span={6}>实际面积合计:<MyTag>{this.props.data.zongmianji}</MyTag></Col>
          </Row>
        )
      }
      </div>
    )
  }
}
function Slash(){
  return (
    <div>分类/指标</div>
  )
}

class AcademyHouse extends Component{
  render(){
    let columns = [
      {
        title: <Slash></Slash>,
        dataIndex: 'slash',
      },
      {
        title: '办公用房(BG)',
        dataIndex: 'bangongyongfang',
      },
      {
        title: '公用用房(GY)',
        dataIndex: 'gongyongyongfang',
      },
      {
        title: '实验实习用房(SS)',
        dataIndex: 'shiyanshixiyongfang',
      },
      {
        title: '超大设备用房补贴(CB)',
        dataIndex: 'chaodashebeibutie',
      },
      {
        title: '重点实验室用房补贴(ZB)',
        dataIndex: 'zhongdianshiyanshibutie',
      },
      {
        title: '调节用房(TJ)',
        dataIndex: 'tiaojieyongfang',
      },
      {
        title: '合计',
        dataIndex: 'heji',
      },
    ]
    return (
      <div>
        <Row>
          <Col offset={2} span={10}>核算结果明细</Col>
          <Col offset={6} span={6}>单位:平米</Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            <Table columns={columns}
              noPaginnation
              data={this.props.tableData}/>
          </Col>
        </Row>
      </div>
    )
  }
}
class PartyHouse extends Component{
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '使用面积',
        dataIndex: 'shiyongmianji',
        sorter: (a, b) => a.shiyongmianji - b.shiyongmianji,
      },
      {
        title: '使用者',
        dataIndex: 'shiyongzhe',
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
      },
      {
        title: '楼宇',
        dataIndex: 'louyu',
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
        sorter: (a, b) => a.fangjianhao - b.fangjianhao,
      },
    ]
    return (
      <div>
        <Row>
          <Col offset={1} span={22}>
            <Table columns={columns}
              noPaginnation
              data={this.props.tableData}/>
          </Col>
        </Row>
      </div>
    )
  }
}

class DepartmentAccount extends Component{
  state = {
    hasSearched: false,
    isPrinting: false,
    printData: {},
    graphData: {},
    loading: false,
    year: 0,
    dept: '',
    type: '',
    formtype: '', // form里使用的临时type
    id: '',
    tableData: [],
    totalData: {},
  }
  setInitState = ()=>{
    this.setState({
      hasSearched: false,
      isPrinting: false,
      printData: {},
      graphData: {},
      loading: false,
      year: 0,
      dept: '',
      type: '',
      id: '',
      tableData: [],
      totalData: {},
    })
  }
  componentDidMount(){
    let pathId = this.props.match.params.id
    if(pathId===':id') return
    let [type, id] = pathId.split('-')
    this.setState({id, type, hasSearched: true, loading: true})
    API.getDeptAccountingDataById(type, id)
    .then(rs=>{
      this.setState(rs)
    })
    .catch(err=>{
      this.setInitState()
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('加载信息失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  getDataByInfo = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(!err){
        let type = values.type
        this.setState({type, hasSearched: true, loading: true})
        API.getDeptAccountingDataByInfo(values)
        .then(rs=>{
          this.setState(rs)
        })
        .catch(err=>{
          this.setInitState()
          if(err.response)
            message.error(err.response.data.title)
          else
            message.error('加载信息失败')
        })
        .finally(()=>{this.setState({loading: false})})
      }
    })
  }
  onTypeChange = (formtype)=>{
    this.setState({formtype})
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="核算管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="年份">
              {getFieldDecorator('year',{
                rules: [{required: true, message: '请选择年份'}]
              })(
                <YearSelect size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col span={4}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="部门类型">
              {getFieldDecorator('type',{
                rules: [{required: true, message: '请选择部门类型'}]
              })(
                <Select onChange={this.onTypeChange}>
                  <Option value="1">党政机关</Option>
                  <Option value="2">学院部门</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:8}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('dept',{
                rules: [{required: true, message: '请选择部门'}]
              })(
                <DeptSelect type={this.state.formtype}></DeptSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button onClick={this.getDataByInfo} type='primary'>查询核算信息</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>导出到文件</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' block>打印</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Split />
      {
        this.state.hasSearched?(
          <Spin spinning={this.state.loading} tip="加载信息中">
            <Row>
              <Col span={22}>
                <h2 style={{textAlign: 'center'}}>
                  {this.state.dept}{this.state.type==='1'?'党政机关用房':'公用房情况'}</h2>
              </Col>
            </Row>
            <TotalData type={this.state.type} data={this.state.totalData}></TotalData>
            {
              this.state.type==='1'?(
                <PartyHouse tableData={this.state.tableData}></PartyHouse>
              ):(
                <AcademyHouse tableData={this.state.tableData}></AcademyHouse>
              )
            }
            {
              this.state.loading||(
                <Graph type={this.state.type}
                  printData={this.state.printData}
                  graphData={this.state.graphData}
                  isPrinting={this.state.isPrinting}></Graph>
              )
            }
          </Spin>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}
const WrappedDepartmentAccount = Form.create({ name: 'department_account' })(DepartmentAccount);

export default WrappedDepartmentAccount
