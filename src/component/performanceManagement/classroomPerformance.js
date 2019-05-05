import React, {Component} from 'react'
import {Form, Row, Col, Button, message, Empty, Spin} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import Histogram from '../common/histogram'
import { YearSelect, DeptSelect, ClassroomSelect } from '../common/select'

const Item = Form.Item

class ClassroomPerformance extends Component{
  state = {
    year: 0,
    dept: '',
    // 实时搜索教室使用的临时状态
    formYear: '',
    formDept: '',
    loading: false,
    hasSearched: false,
    tableList: [],
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
        this.setState({hasSearched: true, loading: true, current: 1, filter: values})
        API.searchClassroomPerformance(values)
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
  tableChange = (p)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchClassroomPerformance(this.state.filter, p)
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
  render(){
    let columns = [
      {
        title: '年份',
        dataIndex: 'nianfen',
        sorter: (a, b) => a.nianfen - b.nianfen,
      },
      {
        title: '部门',
        dataIndex: 'bumen',
        sorter: (a, b) => a.bumen.localeCompare(b.bumen),
      },
      {
        title: '楼宇',
        dataIndex: 'louyu',
        sorter: (a, b) => a.louyu.localeCompare(b.louyu),
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
        sorter: (a, b) => a.louceng - b.louceng,
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
        sorter: (a, b) => a.fangjianhao - b.fangjianhao,
      },
      {
        title: '课程名',
        dataIndex: 'kechengming',
        sorter: (a, b) => a.kechengming.localeCompare(b.kechengming),
      },
      {
        title: '学时数',
        dataIndex: 'xueshishu',
        sorter: (a, b) => a.xueshishu - b.xueshishu,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="教室绩效">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={3}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="年份">
              {getFieldDecorator('year',)(
                <YearSelect onChange={formYear=>this.setState({formYear})} size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('dept',)(
                <DeptSelect onChange={formDept=>this.setState({formDept})} type="2"></DeptSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="教室">
              {getFieldDecorator('roomNum',)(
                <ClassroomSelect
                  year={this.state.formYear}
                  dept={this.state.formDept}
                ></ClassroomSelect>
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
        <div id="printArea">
          <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>教室使用效益</div>
          {
            this.state.hasSearched?(
              <div>
                <Row>
                  <Col offset={1}>
                    <p style={{fontSize: '17px'}}>总学时数: {this.state.totalSchool}</p>
                  </Col>
                </Row>
                <Table
                  loading={this.state.tableLoading}
                  current={this.state.current}
                  onChange={this.tableChange}
                  columns={columns} data={this.state.tableList}></Table>
                <Row style={{marginTop: 30}}>
                  <Col offset={1} span={12}>
                    {
                      !this.state.loading&&!this.state.isPrinting&&(
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
        </div>
      </Spin>
    </MainContainer>
  }
}

const WrappedClassroomPerformance = Form.create({ name: 'classroom_performance' })(ClassroomPerformance);

export default WrappedClassroomPerformance
