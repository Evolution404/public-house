import React, {Component} from 'react'
import {Form, Row, Col, Button, message, Spin, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {sorterParse} from '../common/table'
import Histogram from '../common/histogram'
import download from '../common/download'
import {YearSelect, DeptSelect} from '../common/select'
import {read, write} from '../stateHelper'

const Item = Form.Item

class TeachingUnitPerformance extends Component{
  state = {
    hasSearched: false,
    loading: false,
    tableList: [],
    tableLoading: false,
    printData: {},
    isPrinting: false,
    graphData: {},
    filter:{},
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
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
        this.setState({loading: true, hasSearched: true, current: 1, filter: values})
        API.searchTeachingUnitPHUsePerformance(values)
        .then(rs=>{
          this.setState(rs)
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        .finally(()=>this.setState({loading: false}))
      }
    })
  }
  tableChange = (p, s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchTeachingUnitPHUsePerformance(sorterParse(this.state.filter, s), p)
    .then(rs=>{
      this.setState({
        tableList: rs.tableList,
     })
   })
   .catch(err=>{
     console.log(err)
     message.error('加载失败')
   })
   .finally(()=>this.setState({tableLoading: false}))
  }
  export = ()=>{
    let data = new FormData()
    data.append('nianfen', this.state.filter.year)
    if(this.state.filter.dept)
      data.append('bumen', this.state.filter.dept)
    data.append('tubiao', this.getCanvasURL('graph').split(',')[1])
    this.setState({loading: true})
    API.exportTeachingUnitPerformance(data)
    .then(rs=>{
      download(rs)
    })
    .catch(err=>{
      if(!err.response)
        message.error('导出失败')
    })
    .finally(()=>this.setState({loading: false}))
  }
  render(){
    let columns = [
      {
        title: '学院',
        dataIndex: 'xueyuan',
        sorter: true,
      },
      {
        title: '教学工作量',
        dataIndex: 'jiaoxuegongzuoliang',
        sorter: true,
      },
      {
        title: '科研工作量',
        dataIndex: 'keyangongzuoliang',
        sorter: true,
      },
      {
        title: '规范管理分',
        dataIndex: 'guifanguanlifen',
        sorter: true,
      },
      {
        title: '公用房面积',
        dataIndex: 'gongyongfangmianji',
        sorter: true,
      },
      {
        title: '使用效益',
        dataIndex: 'shiyongxiaoyi',
        sorter: true,
      },
      {
        title: '米均效益(元/㎡)',
        dataIndex: 'mijunxiaoyi',
        sorter: true,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="教学单位绩效">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="年份">
              {getFieldDecorator('year',{
                initialValue: this.state.filter.year,
                rules: [{required: true, message: '请选择年份'}]
              })(
                <YearSelect size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={6}>
            <Item labelCol={{span:6}} wrapperCol={{span:18}} label="部门名称">
              {getFieldDecorator('dept',{
                initialValue: this.state.filter.dept,
              })(
                <DeptSelect type="2"></DeptSelect>
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
              <Button type='primary'
                disabled={
                  Object.keys(this.state.tableList).length===0||
                  this.state.tableList.tableList.length===0}
                onClick={this.export}>导出到文件</Button>
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
      <Spin spinning={this.state.loading}>
        {
          this.state.hasSearched?(
            <div id="printArea">
              <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>教学单位公用房使用效益</div>
              <Table
                loading={this.state.tableLoading}
                current={this.state.current}
                onChange={this.tableChange}
                columns={columns} data={this.state.tableList}></Table>
              <Row style={{marginTop: 30}}>
                <Col offset={1} span={12}>
                  {
                    (!this.state.loading&&!this.state.isPrinting)&&(
                      <Histogram id="graph"
                        title="各教学单位使用效益、米均效益对比情况"
                        data={this.state.graphData}></Histogram>
                    )
                  }
                  {this.state.isPrinting&&(
                    <img style={{width:500}} src={this.state.printData.graph} alt=""/>
                  )}
                </Col>
              </Row>
            </div>
          ):(
            <Empty description="请先搜索"></Empty>
          )
        }
      </Spin>
    </MainContainer>
  }
}

const WrappedTeachingUnitPerformance = Form.create({ name: 'teaching_unit_performance' })(TeachingUnitPerformance);

export default WrappedTeachingUnitPerformance
