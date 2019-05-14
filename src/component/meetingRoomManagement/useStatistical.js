import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import {Form, Row, Col, Input, message, DatePicker} from 'antd'
import Map from '../../routerMap'
import {SButton} from '../common/button'
import {DeptSelect, BuildingSelect} from '../common/select'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {sorterParse} from '../common/table'
import API from '../../api'
import download from '../common/download'
import Histogram from '../common/histogram'
import {TButton} from '../common/button'

const Item = Form.Item
const {RangePicker} = DatePicker

class UseStatistical extends Component{
  state = {
    dept: '',
    hasSearched: false,
    startStopTime: [],
    tableList: [],
    tableLoading: false,
    isSearched: false,
    graphData: {},
    isPrinting: false,
    printData: {},
    exporting: false,
  }
  search = ()=>{
   this.props.form.validateFields((err, values) => {
     if (!err) {
       this.setState({tableLoading: true, isSearched: true})
       if(values.startStopTime){
         let startStopTime =
           values.startStopTime.map(i=>Math.round((i.valueOf())/1000))
          values.startStopTime = startStopTime
        }
        this.setState({dept: values.dept, startStopTime: values.startStopTime, filter: values, current: 1})
        API.searchUseStatistical(values)
        .then((rs)=>{
          const {tableList, graphData} = rs
          this.setState({tableList, graphData, hasSearched: true})
        })
        .catch(err=>{
          message.error('查询失败')
        })
        .finally(()=>{
          this.setState({tableLoading: false})
        })
      }
    })
  }
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchUseStatistical(sorterParse(this.state.filter,s), p)
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
    if(!document.querySelector('#graph canvas')){
      message.error('找不到图片, 请先搜索')
      return
    }
    this.setState({exporting: true},()=>{
      let graph
      let interval = setInterval(()=>{
        let newgraph = document.querySelector('#graph-export canvas').toDataURL()
        if(newgraph===graph){
          this.setState({exporting:false})
          clearInterval(interval)
          let data = {
            dept: this.state.dept,
            startStopTime: this.state.startStopTime,
            graph,
          }
          API.exportUseStatistical(data)
          .then(rs=>{
            download(rs)
          })
        }
        graph=newgraph
      }, 100)
    })
  }
  getCanvasURL = (id)=>{
    return document.querySelector(`#${id} canvas`).toDataURL()
  }
  print = ()=>{
    if(!document.querySelector('#graph canvas')){
      message.error('找不到图片, 请先搜索')
      return
    }
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
  render(){
    let columns = [
      {
        title: '单位',
        dataIndex: 'dept',
        sorter: true,
      },
      {
        title: '楼宇',
        dataIndex: 'building',
        sorter: true,
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
        sorter: true,
      },
      {
        title: '总使用时间(小时)',
        dataIndex: 'totalUseTime',
        sorter: true,
      },
      {
        title: '日均使用时间(小时)',
        dataIndex: 'avgDailyUseTime',
        sorter: true,
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Router>
              <Link to={Map.UseStatisticalDetail.path.replace(':id', record.meetingRoomId+'-'+this.state.startStopTime.join('-'))}>
                <SButton text='详细'></SButton>
              </Link>
            </Router>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="使用统计">
      <Form labelCol={{span:8}} wrapperCol={{span: 16}} style={{marginTop: 50}}>
        <Row>
          <Col span={6}>
            <Item label="单位名称">
              {getFieldDecorator('dept',{
                rules:[{required: true, message: '请选择单位'}]
              })(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="楼宇">
              {getFieldDecorator('building',)(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="房间号">
              {getFieldDecorator('roomNum',)(
                <Input/>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item labelCol={{span:4}} wrapperCol={{span:14}} label="起止时间">
              {getFieldDecorator('startStopTime',{
                rules: [{required: true, message: '请选择起止时间'}]
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} span={2}>
            <TButton.SearchButton block type="primary" onClick={this.search}>搜索</TButton.SearchButton>
          </Col>
        </Row>
      </Form>
      <Split/>
      <Row style={{margin: '20px'}}>
        <TButton.ExButton onClick={this.export}
          style={{width: 140}}
            type="primary">导出到文件</TButton.ExButton>
        <TButton.PrintButton onClick={this.print}
          type="primary">打印</TButton.PrintButton>
      </Row>
      <div id="printArea">
        <div>
          <Table
            current={this.state.current}
            onChange={this.tableChange}
            columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
          {
            this.state.hasSearched&&!this.state.isPrinting&&!this.state.tableLoading&&(
              <div>
                <Histogram id="graph"
                  title="图表对比（单位各会议室总使用时间、日均使用时间对比情况）"
                  data={this.state.graphData}></Histogram>
                {
                  this.state.exporting&&<Histogram id="graph-export"
                    data={this.state.graphData}></Histogram>
                }
              </div>
            )
          }
          {this.state.isPrinting&&(
            <img style={{width:500}} src={this.state.printData.graph} alt=""/>
          )}
        </div>
      </div>
    </MainContainer>
  }
}

const WrappedUseStatistical = Form.create({ name: 'my_reservation' })(UseStatistical);

export default WrappedUseStatistical
