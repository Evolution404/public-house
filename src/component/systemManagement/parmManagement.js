import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import API from '../../api'
import {InputNumber, Form, Row, Col, Button, message} from 'antd'
const Item = Form.Item

class MainForm extends Component{
  submitBasement = e=>{
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if (!err) {
        console.log('Received values of form: ', values);
        API.setBasementCoefficient(values)
        .then(()=>{
          message.success('设置地下室面积系数成功')
        })
        .catch(err=>{
          message.error('设置地下室面积系数失败')
          console.log(err)
        })
      }
    })
  }
  submitBunk = e=>{
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if (!err) {
        console.log('Received values of form: ', values);
        API.setBunkCoefficient(values)
        .then(()=>{
          message.success('设置简易房面积系数成功')
        })
        .catch(err=>{
          message.error('设置简易房面积系数失败')
          console.log(err)
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form labelAlign='left' labelCol={{span:12}} wrapperCol={{span:12}} onSubmit={this.submitBasement}>
          <Row>
            <Col span={5}>
              <Item label="地下室面积系数">
                {getFieldDecorator('basementCoefficient',)(
                  <InputNumber/>
                )}
              </Item>
            </Col>
            <Col span={2}>
              <Button style={{marginTop: '5px'}} type="primary" htmlType="submit">确定</Button>
            </Col>
          </Row>
        </Form>
        <Form labelAlign='left' labelCol={{span:12}} wrapperCol={{span:12}} onSubmit={this.submitBunk}>
          <Row>
            <Col span={5}>
              <Item label="简易房面积系数">
                {getFieldDecorator('bunkCoefficient',)(
                  <InputNumber/>
                )}
              </Item>
            </Col>
            <Col span={2}>
              <Button style={{marginTop: '5px'}} type="primary" htmlType="submit">确定</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
const WrappedForm = Form.create({ name: 'mainform' })(MainForm)

class SystemParm extends Component{
  render(){
    return <MainContainer name="参数管理">
      <WrappedForm/>
    </MainContainer>
  }
}


export default SystemParm
