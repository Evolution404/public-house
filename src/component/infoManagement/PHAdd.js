import React, {Component} from 'react'
import {Row, Col, Form, Button, message} from 'antd'
import MainContainer from '../common/mainContainer'
import UsingNature from '../common/usingNature'
import Split from '../common/split'
import API from '../../api'
import {ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding} from './commonFormItem'
const {Item} = Form


function Title(){
  return (
    <Row>
      <Col>
        <div style={{fontSize:'20px', textAlign:'center'}}>新增公用房</div>
      </Col>
    </Row>
  )
}


class MainForm extends Component{
  state = {
    type: '',
  }
  setType = (props)=>{
    this.setState({type: props[0]})
    return props
  }
  staging = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  reset = ()=>{
    this.props.form.resetFields()
    this.setState({type: '1'})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.addPH(values)
        .then(()=>{
          message.success('添加成功')
        })
        .catch(err=>{
          message.error('添加失败')
          if(err.response){
            message.error(err.response.data.title)
          }
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    let changeForm = {
      '1':<ScientificBuilding {...this.props}></ScientificBuilding>,
      '2':<LogisticsBuilding {...this.props}></LogisticsBuilding>,
      '3':<BusinessBuilding {...this.props}></BusinessBuilding>,
      '4':<CollegePartyBuilding {...this.props}></CollegePartyBuilding>,
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item labelCol={{span:3}} wrapperCol={{span:8}} label="使用性质">
          {getFieldDecorator('usingNature', {
            getValueFromEvent: this.setType,
            rules:[{required: true, message:'请选择使用性质'}]
          })(
            <UsingNature changeOnSelect={false}></UsingNature>
          )}
        </Item>
        {
          changeForm[this.state.type]
        }
        <Row>
          <Col span={4} offset={10}>
            <Button type='primary' onClick={this.staging}>暂时保存</Button>
          </Col>
          <Col span={4}>
            <Button type='primary' htmlType='submit'>提交审核</Button>
          </Col>
          <Col span={4}>
            <Button type='primary' onClick={this.reset}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedMainForm = Form.create({ name: 'main_form' })(MainForm)


class PHAdd extends Component{
  render(){
    return <MainContainer name="基本信息管理">
      基本信息/新增公用房
      <Title/>
      <Split/>
      <Row>
        <Col span={15}>
          <WrappedMainForm />
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHAdd
