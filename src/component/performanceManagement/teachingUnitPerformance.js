import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, message} from 'antd'
import {SButton} from '../common/button'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import Histogram from '../common/histogram'

const Item = Form.Item
const Option = Select.Option

class TeachingUnitPerformance extends Component{
  state = {
    year: 0,
    deptName: '',
    tableList: [],
    printData: {},
    isPrinting: false,
    graphData: {
      '类别1': {
          '项目1':100,
          '项目2':200,
      },
      '类别2': {
          '项目1':100,
          '项目2':200,
      },
      '类别3': {
          '项目1':100,
          '项目2':200,
      },
      '类别4': {
          '项目1':100,
          '项目2':200,
      },
      '类别5': {
          '项目1':100,
          '项目2':200,
      },
    },
  }
  getCanvasURL = (id)=>{
    return document.querySelector(`#${id} canvas`).toDataURL()
  }
  print = ()=>{
    let printData = {
      graph: this.getCanvasURL('graph'),
    }
    this.setState({isPrinting: true, printData}, ()=>{
      // 直接执行有可能图片没有加载完成
      // 使用一个interval直到找到图片才开始打印
      let interval = setInterval(()=>{
        if(document.querySelectorAll('#printArea img').length>0){
          clearInterval(interval)
          window.document.body.innerHTML =
            window.document.getElementById('printArea').innerHTML
          window.print()
          window.location.reload()
        }
      }, 100)
    })
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        API.searchTeachingUnitPHUsePerformance(values)
        .then(rs=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '学院',
        dataIndex: 'college',
      },
      {
        title: '教学工作量',
        dataIndex: 'teachingWorkLoad',
        sorter: (a, b) => a.teachingWorkLoad - b.teachingWorkLoad,
      },
      {
        title: '科研工作量',
        dataIndex: 'scientificWorkLoad',
        sorter: (a, b) => a.scientificWorkLoad - b.scientificWorkLoad,
      },
      {
        title: '规范管理分',
        dataIndex: 'specificationPoints',
        sorter: (a, b) => a.specificationPoints - b.specificationPoints,
      },
      {
        title: '公用房面积',
        dataIndex: 'PHArea',
        sorter: (a, b) => a.PHArea - b.PHArea,
      },
      {
        title: '使用效益',
        dataIndex: 'usePerformance',
        sorter: (a, b) => a.usePerformance - b.usePerformance,
      },
      {
        title: '米均效益',
        dataIndex: 'averagePerformance',
        sorter: (a, b) => a.averagePerformance - b.averagePerformance,
      },
      {
        title: '操作',
        render: (text, record, index)=>(
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.props.delete.bind(this,index)} text='详细'/>
            </div>
        )
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:5}} wrapperCol={{span:18}} label="年份">
              {getFieldDecorator('year',)(
                <Select>
                  <Option value="2019">2019</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('deptName',)(
                <Select>
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button block type='primary' onClick={this.search}>搜索</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>导出到文件</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button onClick={this.print} block type='primary'>打印</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Split/>
      <div id="printArea">
        <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>教学单位公用房使用效益</div>
        <Table columns={columns} data={this.state.tableList}></Table>
        <Row style={{marginTop: 30}}>
          <Col offset={1} span={12}>
            {
              !this.state.isPrinting&&(
                <Histogram id="graph"
                  title="图表对比（各教学单位使用效益、米均效益对比情况）"
                  data={this.state.graphData}></Histogram>
              )
            }
            {this.state.isPrinting&&(
              <img style={{width:500}} src={this.state.printData.graph} alt=""/>
            )}
          </Col>
        </Row>
      </div>
    </MainContainer>
  }
}

const WrappedTeachingUnitPerformance = Form.create({ name: 'teaching_unit_performance' })(TeachingUnitPerformance);

export default WrappedTeachingUnitPerformance
