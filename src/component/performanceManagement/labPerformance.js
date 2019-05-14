import React, {Component} from 'react'
import {Form, Row, Col, message, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table,{sorterParse} from '../common/table'
import Histogram from '../common/histogram'
import { YearSelect, DeptSelect, LabSelect } from '../common/select'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'
import download from '../common/download'

const Item = Form.Item

class LabPerformance extends Component{
  state = {
    // 实时搜索实验室使用的临时状态
    formYear: '',
    formDept: '',
    tableList: [],
    isSearched: false,
    tableLoading: false,
    totalSchool: 0,
    printData: {},
    isPrinting: false,
    graphData: {},
    filter: {},
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
        this.setState({isSearched: true, tableLoading: true, filter: values, current: 1})
        API.searchLabPerformance(values)
        .then(rs=>{
          this.setState(rs)
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
  tableChange = (p, s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchLabPerformance(sorterParse(this.state.filter, s), p)
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
    if(this.state.filter.year)
      data.append('nianfen', this.state.filter.year)
    if(this.state.filter.dept)
      data.append('bumen', this.state.filter.dept)
    if(this.state.filter.roomNum)
      data.append('fangjianhao', this.state.filter.roomNum)
    data.append('tubiao', this.getCanvasURL('graph').split(',')[1])
    this.setState({loading: true})
    API.exportLabperformance(data)
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
        title: '年份',
        dataIndex: 'nianfen',
        sorter: true,
      },
      {
        title: '部门',
        dataIndex: 'bumen',
        sorter: true,
      },
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
        title: '课程名',
        dataIndex: 'kechengming',
        sorter: true,
      },
      {
        title: '学时数',
        dataIndex: 'xueshishu',
        sorter: true,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="实验室绩效">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col span={3}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="年份">
              {getFieldDecorator('year',{
                initialValue: this.state.filter.year,
              })(
                <YearSelect onChange={formYear=>this.setState({formYear})} size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('dept',{
                initialValue: this.state.filter.dept,
              })(
                <DeptSelect onChange={formDept=>this.setState({formDept})} type="2"></DeptSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="实验室">
              {getFieldDecorator('roomNum',{
                initialValue: this.state.filter.roomNum,
              })(
                <LabSelect year={this.state.formYear}
                  dept={this.state.formDept}
                ></LabSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <TButton.SearchButton block type='primary' onClick={this.search}>搜索</TButton.SearchButton>
            </div>
          </Col>
        </Row>
      </Form>
      <Split/>
      <Row style={{marginBottom: 25, marginLeft: 10}}>
        <TButton.ExButton type='primary'
          style={{width: 140}}
          disabled={
            Object.keys(this.state.tableList).length===0||
            this.state.tableList.tableList.length===0}
          onClick={this.export}>导出到文件</TButton.ExButton>
        <TButton.PrintButton
          onClick={this.print} type='primary'>打印</TButton.PrintButton>
      </Row>
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
                current={this.state.current}
                onChange={this.tableChange}
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
