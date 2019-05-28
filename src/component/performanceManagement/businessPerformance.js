import React, {Component} from 'react'
import {Form, Row, Col, message, Spin, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {DeptSelect} from '../common/select'
import Split from '../common/split'
import download from '../common/download'
import Table, {sorterParse} from '../common/table'
import Histogram from '../common/histogram'
import {TButton} from '../common/button'
import {read, write} from '../stateHelper'

const Item = Form.Item

class BusinessPerformance extends Component{
  state = {
    loading: false,
    hasSearched: false,
    isPrinting: false,
    tableList: [],
    tableLoading: false,
    current: 0,
    graphData: {},
    totalArea: 0,
    totalRent: 0,
    avgPerformance: 0,
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
        this.setState({dept: values.dept, loading: true, hasSearched: true, filter: values, current: 1})
        API.searchBusinessPerformance(values)
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
    API.searchBusinessPerformance(sorterParse(this.state.filter, s), p)
    .then(rs=>{
      this.setState({
        tableList: rs.tableList,
     })
   })
   .catch(err=>{
     message.error('加载失败')
   })
   .finally(()=>this.setState({tableLoading: false}))
  }
  getCanvasURL = (id)=>{
    return document.querySelector(`#${id} canvas`).toDataURL()
  }
  export = ()=>{
    let data = new FormData()
    if(this.state.filter.dept)
      data.append('bumen', this.state.filter.dept)
    data.append('tubiao', this.getCanvasURL('graph').split(',')[1])
    this.setState({loading: true})
    API.exportBusinessPerformance(data)
    .then(rs=>{
      download(rs)
    })
    .catch(err=>{
      if(!err.resolved)
        message.error('导出失败')
    })
    .finally(()=>this.setState({loading: false}))
  }
  render(){
    let columns = [
      {
        title: '单位',
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
        title: '使用面积(㎡)',
        dataIndex: 'shiyongmianji',
        sorter: true,
      },
      {
        title: '使用者',
        dataIndex: 'shiyongzhe',
        sorter: true,
      },
      {
        title: '租金单价(元)',
        dataIndex: 'zujindanjia',
        sorter: true,
      },
      {
        title: '年租金(元)',
        dataIndex: 'nianzujin',
        sorter: true,
      },
      {
        title: '租金类型',
        dataIndex: 'zujinleixing',
        sorter: true,
      },
      {
        title: '米均效益(元/㎡)',
        dataIndex: 'mijunxiaoyi',
        sorter: true,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="商业用房绩效">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col offset={1} span={6}>
            <Item labelCol={{span:6}} wrapperCol={{span:18}} label="单位名称">
              {getFieldDecorator('dept',{
                initialValue: this.state.filter.dept,
              })(
                <DeptSelect></DeptSelect>
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
      <Row style={{marginBottom: 25, marginLeft: 50}}>
        <TButton.ExButton type='primary'
          style={{width: 140}}
          disabled={
            Object.keys(this.state.tableList).length===0||
            this.state.tableList.tableList.length===0}
          onClick={this.export}>导出到文件</TButton.ExButton>
        <TButton.PrintButton
          disabled={
            Object.keys(this.state.tableList).length===0||
            this.state.tableList.tableList.length===0}
          type='primary' onClick={this.print}>打印</TButton.PrintButton>
      </Row>
      <Spin id="printArea" spinning={this.state.loading}>
        {
          this.state.hasSearched?(
            <div>
              <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>公用房使用效益</div>
              <div style={{display: 'flex',
                fontSize: '15px',
                fontWeight: '500',
                justifyContent: 'space-around'
              }}>
                <span>总面积: {this.state.totalArea}MM</span>
                <span>总租金: {this.state.totalRent}元</span>
                <span>米均效益: {this.state.avgPerformance}元/平米</span>
              </div>
              <Table
                loading={this.state.tableLoading}
                current={this.state.current}
                onChange={this.tableChange}
                columns={columns} data={this.state.tableList}></Table>
              {
                (!this.state.loading&&!this.state.isPrinting)&&(
                  <Histogram id="graph"
                    title={(this.state.dept?"本":"各")+"单位各商业用房面积、使用效益、米均效益对比情况"}
                    data={this.state.graphData}
                  ></Histogram>
                )
              }
              {this.state.isPrinting&&(
                <img style={{width:1000}} src={this.state.printData.graph} alt=""/>
              )}
            </div>
          ):(
            <Empty description="请先搜索"></Empty>
          )
        }
      </Spin>
    </MainContainer>
  }
}

const WrappedBusinessPerformance = Form.create({ name: 'business_performance' })(BusinessPerformance);

export default WrappedBusinessPerformance
