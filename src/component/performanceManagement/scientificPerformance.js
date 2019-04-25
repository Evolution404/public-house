import React, {Component} from 'react'
import {Form, Row, Col, Button, message, Spin, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import Histogram from '../common/histogram'
import {YearSelect, DeptSelect} from '../common/select'

const Item = Form.Item

class ScientificPerformance extends Component{
  state = {
    year: 0,
    dept: '',
    loading: false,
    hasSearched: false,
    tableList: [],
    printData: {},
    isPrinting: false,
    graphData: {},
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
        this.setState({hasSearched: true, loading: true})
        API.searchScientificPerformance(values)
        .then(rs=>{
          this.setState(rs)
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        .finally(()=>this.setState({loading: false}))
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    let columns = [
      {
        title: '科研单位',
        dataIndex: 'keyantuandui',
        sorter: (a, b) => a.keyantuandui.localeCompare(b.keyantuandui),
      },
      {
        title: '科研工作量',
        dataIndex: 'keyangongzuoliang',
        sorter: (a, b) => a.keyangongzuoliang - b.keyangongzuoliang,
      },
      {
        title: '规范管理分',
        dataIndex: 'guifanguanlifen',
        sorter: (a, b) => a.guifanguanlifen - b.guifanguanlifen,
      },
      {
        title: '公用房面积',
        dataIndex: 'gongyongfangmianji',
        sorter: (a, b) => a.gongyongfangmianji - b.gongyongfangmianji,
      },
      {
        title: '使用效益',
        dataIndex: 'shiyongxiaoyi',
        sorter: (a, b) => a.shiyongxiaoyi - b.shiyongxiaoyi,
      },
      {
        title: '米均效益',
        dataIndex: 'mijunxiaoyi',
        sorter: (a, b) => a.mijunxiaoyi - b.mijunxiaoyi,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="年份">
              {getFieldDecorator('year',{
                rules: [{required: true, message: '请选择年份'}]
              })(
                <YearSelect size='default'></YearSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('dept',)(
                <DeptSelect></DeptSelect>
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
      <Spin spinning={this.state.loading}>
        {
          this.state.hasSearched?(
            <div id="printArea">
              <div style={{fontSize: '18px',
                textAlign: 'center', padding:'20px 0'}}>科研公用房使用效益</div>
              <Table columns={columns} data={this.state.tableList}></Table>
              <Row style={{marginTop: 30}}>
                <Col offset={1} span={12}>
                  {
                    (!this.state.loading&&!this.state.isPrinting)&&(
                      <Histogram id="graph"
                        title="各科研单位使用效益、米均效益对比情况"
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

const WrappedScientificPerformance = Form.create({ name: 'seientific_performance' })(ScientificPerformance);

export default WrappedScientificPerformance
