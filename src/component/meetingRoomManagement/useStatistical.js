import React, {Component} from 'react'
import {Form, Row, Col, Select, Input, Button, message, DatePicker, Empty} from 'antd'
import {SButton} from '../common/button'
import {DeptSelect} from '../common/select'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import API from '../../api'
import {host} from '../../api/apiConfig'
import Histogram from '../common/histogram'

const Item = Form.Item
const {RangePicker} = DatePicker;

class UseStatistical extends Component{
  state = {
    dept: '',
    startStopTime: [],
    tableList: [],
    tableLoading: false,
    isSearched: false,
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
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({tableLoading: true, isSearched: true})
        console.log('Received values of form: ', values);
        if(values.startStopTime){
          let startStopTime =
            values.startStopTime.map(i=>Math.round((i.valueOf())/1000))
          values.startStopTime = startStopTime
        }
        this.setState({dept: values.dept, startStopTime: values.startStopTime})
        API.searchUseStatistical(values)
        .then((rs)=>{
          this.setState({tableList: rs})
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
  export = ()=>{
    let graph = document.querySelector('#graph canvas').toDataURL()
    let data = {
      dept: this.state.dept,
      startStopTime: this.state.startStopTime,
      graph,
    }
    API.exportUseStatistical(data)
    .then(rs=>{
      let downloadElement = document.createElement('a');
      let href = host+rs
      downloadElement.href = href;
      downloadElement.download = '预约管理统计.xls'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '会议室',
        dataIndex: 'meetingRoom',
      },
      {
        title: '总使用时间(小时)',
        dataIndex: 'totalUseTime',
      },
      {
        title: '日均使用时间',
        dataIndex: 'avgDailyUseTime',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton text='详细'></SButton>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="预约管理">
      <Form labelCol={{span:12}} wrapperCol={{span: 12}}>
        <Row>
          <Col span={6}>
            <Item label="部门名称">
              {getFieldDecorator('dept',)(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="楼宇">
              {getFieldDecorator('building',)(
                <Select></Select>
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
            <Item labelCol={{span:6}} wrapperCol={{span:12}} label="起止时间">
              {getFieldDecorator('startStopTime',)(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} span={2}>
            <Button block type="primary" onClick={this.search}>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Split/>
      <Row style={{margin: '20px 10px'}}>
        <Col span={2}><Button
            onClick={this.export}
            type="primary">导出到文件</Button></Col>
        <Col offset={1} span={2}><Button block type="primary">打印</Button></Col>
      </Row>
      {
        this.state.isSearched?(
          <div>
            <Table columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
            <Histogram id="graph"
              title="图表对比（部门各会议室总使用时间、日均使用时间对比情况）"
              data={this.state.graphData}></Histogram>
          </div>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}

const WrappedUseStatistical = Form.create({ name: 'my_reservation' })(UseStatistical);

export default WrappedUseStatistical
