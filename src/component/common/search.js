import React, {Component} from 'react'
import {Select, Input, Form, Row, Col, Button, Cascader} from 'antd'
import UsingNature from '../common/usingNature'

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
              {getFieldDecorator('dept',)(
                  <Select size="small"></Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('usingNature',)(
                <UsingNature size="small"/>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="审批状态">
              {getFieldDecorator('auditStatus',)(
                <Select size="small">
                  <Option value="所有">所有</Option>
                  <Option value="已批准">已批准</Option>
                  <Option value="未上报">未上报</Option>
                  <Option value="等待审核">等待审核</Option>
                  <Option value="已驳回">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用者">
              {getFieldDecorator('personnel',)(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',)(
                  <Select size="small"></Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',)(
                  <Input size="small"></Input>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房屋状态">
              {getFieldDecorator('houseStatus',)(
                <Select size="small">
                  <Option value="所有">所有</Option>
                  <Option value="使用中">使用中</Option>
                  <Option value="待分配">待分配</Option>
                  <Option value="暂借中">暂借中</Option>
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

export default WrappedSearch
