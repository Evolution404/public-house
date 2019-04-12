import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, message, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import Histogram from '../common/histogram'
import YearSelect from '../common/yearSelect'

const Item = Form.Item
const Option = Select.Option

class LabPerformance extends Component{
  state = {
    year: 0,
    deptName: '',
    tableList: [],
    isSearched: false,
    tableLoading: false,
    totalSchool: 0,
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
        this.setState({isSearched: true, tableLoading: true})
        API.searchLabPerformance(values)
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
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '实验室',
        dataIndex: 'lab',
        sorter: (a, b) => a.lab - b.lab,
      },
      {
        title: '课程名',
        dataIndex: 'courseName',
        sorter: (a, b) => a.courseName - b.courseName,
      },
      {
        title: '学时数',
        dataIndex: 'schoolNum',
        sorter: (a, b) => a.schoolNum - b.schoolNum,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={3}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="年份">
              {getFieldDecorator('year',)(
                <YearSelect size="normal"></YearSelect>
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
          <Col offset={1} span={4}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="实验室">
              {getFieldDecorator('deptName',)(
                <Select>
                  <Option value="实验室1">实验室1</Option>
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
        <div style={{fontSize: '18px',
          textAlign: 'center', padding:'20px 0'}}>实验室使用效益</div>
        {
          this.state.isSearched?(
            <div>
              <Row>
                <Col offset={1}>
                  <p style={{fontSize: '17px'}}
                    >总学时数: {this.state.totalSchool}</p>
                </Col>
              </Row>
              <Table loading={this.state.tableLoading}
                columns={columns} data={this.state.tableList}></Table>
              <Row style={{marginTop: 30}}>
                <Col offset={1} span={12}>
                  {
                    (!this.state.isPrinting&&
                     Object.keys(this.state.graphData).length>0)&&(
                      <Histogram id="graph"
                        title="图表对比（各教室学时数据对比情况）"
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
      </div>
    </MainContainer>
  }
}

const WrappedLabPerformance = Form.create({ name: 'lab_performance' })(LabPerformance);

export default WrappedLabPerformance
