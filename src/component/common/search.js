import React, {Component} from 'react'
import {Select, Input, Form, Row, Col, Button} from 'antd'
import UsingNature from '../common/usingNature'
import {DeptSelect, BuildingSelect} from '../common/select'

const Item = Form.Item
const Option = Select.Option

// 传入onSearch回调函数

class Search extends Component{
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('deptName',{
                initialValue: this.props.initialValue.deptName,
              })(
                  <DeptSelect size="small"></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('usingNature',{
                initialValue: this.props.initialValue.usingNature,
                rules: [{required: true, message: '请选择使用性质'}]
              })(
                <UsingNature size="small"/>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="审批状态">
              {getFieldDecorator('auditStatus',{
                initialValue: this.props.initialValue.auditStatus,
              })(
                <Select size="small">
                  <Option value="">所有</Option>
                  <Option value="已批准">已批准</Option>
                  <Option value="未上报">未上报</Option>
                  <Option value="已上报">已上报</Option>
                  <Option value="已驳回">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用者">
              {getFieldDecorator('personnel',{
                initialValue: this.props.initialValue.personnel,
              })(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',{
                initialValue: this.props.initialValue.buildingName,
              })(
                  <BuildingSelect size="small"></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',{
                initialValue: this.props.initialValue.roomNum,
              })(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房屋状态">
              {getFieldDecorator('status',{
                initialValue: this.props.initialValue.status,
              })(
                <Select size="small">
                  <Option value="">所有</Option>
                  <Option value="已租">已租</Option>
                  <Option value="待租">待租</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} offset={1} span={2}>
            <Button block onClick={this.search} type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedSearch = Form.create({ name: 'search' })(Search)

class ReservationAuditSearch extends Component{
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('dept',{
                initialValue: this.props.initialValue.dept
              })(
                  <DeptSelect size="small"></DeptSelect>
              )}
            </Item>
          </Col>
          <Col offset={2} span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="预约状态">
              {getFieldDecorator('reservationStatus',{
                initialValue: this.props.initialValue.reservationStatus,
              })(
                <Select size="small">
                  <Option value="">所有</Option>
                  <Option value="已审批">已审批</Option>
                  <Option value="未审批">未审批</Option>
                  <Option value="已驳回">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={2} span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="预约人">
              {getFieldDecorator('reservationPerson',{
                initialValue: this.props.initialValue.reservationPerson,
              })(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('building',{
                initialValue: this.props.initialValue.building,
              })(
                  <BuildingSelect size="small"></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col offset={2} span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',{
                initialValue: this.props.initialValue.roomNum,
              })(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} offset={3} span={2}>
            <Button block onClick={this.search} type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

ReservationAuditSearch =
  Form.create({ name: 'ReservationAuditSearch' })(ReservationAuditSearch)

class MyPHSearch extends Component{
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('usingNature',{
                initialValue: this.props.initialValue.usingNature,
                rules: [{required: true, message: '请选择使用性质'}]
              })(
                <UsingNature size="small"/>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="审批状态">
              {getFieldDecorator('auditStatus',{
                initialValue: this.props.initialValue.auditStatus,
              })(
                <Select size="small">
                  <Option value="">所有</Option>
                  <Option value="已批准">已批准</Option>
                  <Option value="未上报">未上报</Option>
                  <Option value="已上报">已上报</Option>
                  <Option value="已驳回">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',{
                initialValue: this.props.initialValue.buildingName,
              })(
                  <BuildingSelect size="small"></BuildingSelect>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',{
                initialValue: this.props.initialValue.roomNum,
              })(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房屋状态">
              {getFieldDecorator('status',{
                initialValue: this.props.initialValue.houseStatus,
              })(
                <Select size="small">
                  <Option value="">所有</Option>
                  <Option value="已租">已租</Option>
                  <Option value="待租">待租</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} offset={1} span={2}>
            <Button block onClick={this.search} type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

MyPHSearch = Form.create({ name: 'myph_search' })(MyPHSearch)

export default WrappedSearch
export {ReservationAuditSearch, MyPHSearch}
