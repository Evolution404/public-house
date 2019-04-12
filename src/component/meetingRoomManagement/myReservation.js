import React, {Component} from 'react'
import {Form, Row, Col, Select, Input, Button, message, Empty} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
import API from '../../api'

const Item = Form.Item
const Option = Select.Option

class MyReservation extends Component{
  state = {
    tableList: [],
    tableLoading: false,
    isSearched: false,
  }
  search = type=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({tableLoading: true, isSearched: true})
        console.log('Received values of form: ', values);
        values = {
          ...values,
          type,
        }
        API.searchMyReservation(values)
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
  retryReservation = id=>{
    API.retryReservation(id)
    .then(()=>{
      message.success('再次预约成功, 请等待审核')
    })
    .catch(err=>{
      message.error('再次预约失败, 请重试')
    })
  }
  cancleReservation = id=>{
    API.cancleReservation(id)
    .then(()=>{
      message.success('取消预约成功')
    })
    .catch(err=>{
      message.error('取消预约失败, 请重试')
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: '房屋部门',
        dataIndex: 'houseDept',
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '预约人',
        dataIndex: 'reservationPerson',
      },
      {
        title: '联系电话',
        dataIndex: 'phoen',
      },
      {
        title: '预约用途',
        dataIndex: 'purpose',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton text='再次预约'
              onClick={this.retryReservation.bind(this, record.id)}/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton  text='取消预约'
              onClick={this.cancleReservation.bind(this, record.id)}/>
            </div>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="我的预约">
      <Form labelCol={{span:12}} wrapperCol={{span: 12}}>
        <Row>
          <Col span={6}>
            <Item label="房屋部门名称">
              {getFieldDecorator('houseDept',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="楼宇名称">
              {getFieldDecorator('buildingName',)(
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
          <Col span={5}>
            <Item label="预约状态">
              {getFieldDecorator('reservationStatus',)(
                <Select>
                  <Option value="待审核">待审核</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={2}>
            <Button type="primary"
              onClick={this.search.bind(this, 'oneWeek')}>最近一周</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 'onMonth')}>最近一月</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 'threeMonth')}>最近三月</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 'halfYear')}>最近半年</Button>
          </Col>
        </Row>
      </Form>
      <Split/>
      {
        this.state.isSearched?(
          <Table columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}

const WrappedMyReservation = Form.create({ name: 'my_reservation' })(MyReservation);

export default WrappedMyReservation
