import React, {Component} from 'react'
import {Form, Select, Row, Col, Tag, Empty, message, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import {DeptSelect, YearSelect} from '../common/select'
import Histogram from '../common/histogram'
import PieChart from '../common/pieChart'
import Split from '../common/split'
import API from '../../api'
import Table, {sorterParse} from '../common/table'
import Back from '../common/back'
import {TButton} from '../common/button'
import download from '../common/download'

const Option = Select.Option
const Item = Form.Item

class Graph extends Component{
  render(){
    let graphData = this.props.graphData
    let rs = this.props.type==="1"?(
          <div style={{marginTop: 50}}>
            {
              !this.props.isPrinting&&(
                <Row>
                  <Col offset={2} span={6}>
                    <Histogram id="graph"
                      title="定额面积、实际面积对比"
                      data={graphData}></Histogram>
                  </Col>
                </Row>
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
                desc='房屋分类'
                title="各分项实际面积对比情况" id="graph1"></PieChart>
            </Col>
            <Col span={12}>
              <Histogram id="graph2"
                title="各分项定额面积、实际面积对比情况"
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
      <Tag style={{width: 70,textAlign: 'center', marginLeft: 20}} color="blue">{this.props.children}</Tag>      
    )
  }
}

class TotalData extends Component{
  render(){
    return (
      <div>
      <Row style={{margin: '25px 0'}}>
        <Col span={12}><Col style={{textAlign: 'right'}} offset={4} span={6}>人数:</Col><MyTag>{this.props.data.zongrenshu}</MyTag></Col>
        <Col span={12}><Col style={{textAlign: 'right'}} offset={4} span={6}>人均面积:</Col><MyTag>{this.props.data.renjunmianji}</MyTag></Col>
      </Row>
      {
        this.props.type==='1'&&(
          <Row style={{marginBottom: 25}}>
            <Col span={12}><Col style={{textAlign: 'right'}} offset={4} span={6}>定额面积合计:</Col><MyTag>{this.props.data.zongdingemianji}</MyTag></Col>
            <Col span={12}><Col style={{textAlign: 'right'}} offset={4} span={6}>实际面积合计:</Col><MyTag>{this.props.data.zongmianji}</MyTag></Col>
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
        title: '楼宇',
        dataIndex: 'louyu',
        sorter: true,
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
        sorter: true,
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
        sorter: true,
      },
      {
        title: '使用者',
        dataIndex: 'shiyongzhe',
        sorter: true,
      },
      {
        title: '使用面积(㎡)',
        dataIndex: 'shiyongmianji',
        sorter: true,
      },
    ]
    return (
      <div>
        <Row>
          <Col offset={1} span={22}>
            <Table columns={columns}
              {...this.props}
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
      if(!err.response)
        message.error('加载信息失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  getDataByInfo = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(!err){
        let type = values.type
        this.setState({id: '', type, hasSearched: true, loading: true,
                      filter: values})
        API.getDeptAccountingDataByInfo(values)
        .then(rs=>{
          this.setState(rs)
        })
        .catch(err=>{
          this.setInitState()
          if(!err.response)
            message.error('加载信息失败')
        })
        .finally(()=>{this.setState({loading: false})})
      }
    })
  }
  onTypeChange = (formtype)=>{
    this.setState({formtype})
  }
  getCanvasURL = (id)=>{
    return document.querySelector(`#${id} canvas`).toDataURL().split(',')[1]
  }
  export = ()=>{
    let promise
    this.setState({loading: true})
    if(this.state.id){
      // 党政机关一个图
      // 学院部门两个图
      if(this.state.type==='1')
        promise = API.exportPDeptAccountDataById(this.state.id, {tubiao:this.getCanvasURL('graph')})
      else
        promise = API.exportCDeptAccountDataById(this.state.id,
          {tubiao1:this.getCanvasURL('graph1'), tubiao2:this.getCanvasURL('graph2')})
    }else{
      if(this.state.type==='1')
        promise = API.exportPDeptAccountDataByInfo(this.state.filter.dept, this.state.filter.year, {tubiao: this.getCanvasURL('graph')})
      else
        promise = API.exportCDeptAccountDataByInfo(this.state.filter.dept, this.state.filter.year, {tubiao1: this.getCanvasURL('graph1'), tubiao2: this.getCanvasURL('graph2')})
    }
    promise.then(rs=>{
      download(rs)
    })
    .catch(err=>{
      if(!err.response)
        message.error('导出失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  tableChange = (p, s)=>{
    // 党政机关的才有可能翻页排序
    if(this.state.type!=='1')
      return
    this.setState({tableLoading: true, page:p, current: p.current})
    if(this.state.id){
      API.getDeptAccountingDataById(this.state.type, this.state.id, p,
                                    sorterParse({},s))
      .then(rs=>{
        this.setState({tableData: rs.tableData})
      })
      .catch(err=>{
        if(!err.response)
          message.error('加载信息失败')
      })
      .finally(()=>{this.setState({tableLoading: false})})

    }else{
      API.getDeptAccountingDataByInfo(this.state.filter, p, sorterParse({},s))
      .then(rs=>{
        this.setState(rs)
      })
      .catch(err=>{
        this.setInitState()
        if(!err.response)
          message.error('加载信息失败')
      })
      .finally(()=>{this.setState({tableLoading: false})})
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="部门核算">
      <Back></Back>
      <Form onSubmit={this.handleSubmit}>
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
          <TButton.SearchButton
            style={{width: 140, marginTop: 5}}
            onClick={this.getDataByInfo} type='primary'>查询核算信息</TButton.SearchButton>
        </Row>
      </Form>
      <Split />
      <Row style={{marginBottom: 25, marginLeft: 50}}>
        <TButton.ExButton
          style={{width: 140}}
          onClick={this.export}
          disabled={
            (this.state.type==='1'&&(Object.keys(this.state.tableData).length===0||
              this.state.tableData.tableList.length===0))||
            (this.state.type==='2'&&this.state.tableData.length===0)
          }
          type='primary'>导出到文件</TButton.ExButton>
        <TButton.PrintButton type='primary' block>打印</TButton.PrintButton>
      </Row>
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
                <PartyHouse
                  loading={this.state.tableLoading}
                  current={this.state.current}
                  onChange={this.tableChange}
                  tableData={this.state.tableData}></PartyHouse>
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
