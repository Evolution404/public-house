import React, {Component} from 'react'
import {Form, Row, Col, Select, Input, Button, message, DatePicker} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import API from '../../api'

const Item = Form.Item
const {RangePicker} = DatePicker;

class UseStatistical extends Component{
  state = {
    tableList: [{id:1}],
  }
  search = type=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.searchUseStatistical(values)
        .then((rs)=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('查询失败')
        })
      }
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
            <Button type="primary">详细</Button>
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
              {getFieldDecorator('deptName',)(
                <Select></Select>
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
                <RangePicker />
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
        <Col span={2}><Button type="primary">导出到文件</Button></Col>
        <Col offset={1} span={2}><Button block type="primary">打印</Button></Col>
      </Row>
      <Table data={this.state.tableList} columns={columns}></Table>
    </MainContainer>
  }
}

const WrappedUseStatistical = Form.create({ name: 'my_reservation' })(UseStatistical);

export default WrappedUseStatistical
