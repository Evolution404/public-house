import React, {Component} from 'react'
import {Row, Col, Form, Select, Input, Button, Checkbox, Upload, Icon} from 'antd'
import MainContainer from '../common/mainContainer'
import UsingNature from '../common/usingNature'
import Split from '../common/split'
const {Item} = Form
const Option = Select.Option
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group

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
  staging = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  reset = ()=>{
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const checkboxOption = [
      { label: '投影仪', value: 0},
      { label: '音响', value: 1},
      { label: '麦克风', value: 2},
      { label: '白板', value: 3},
      { label: '电脑', value: 4},
    ]
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item labelCol={{span:3}} wrapperCol={{span:4}} label="所属部门">
          {getFieldDecorator('dept',{rules:[{required: true, message: '请选择所属部门'}]} )(
            <Select >
              <Option value="部门1">部门1</Option>
            </Select>
          )}
        </Item>
        <Row>
          <Col span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:13}} label="楼宇">
              {getFieldDecorator('building', )(
                <Select >
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="楼层">
              {getFieldDecorator('floor', )(
                <Select >
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="房间号">
              {getFieldDecorator('roomNum', )(
                <Input />
              )}
            </Item>
          </Col>
        </Row>
        <Item labelCol={{span:3}} wrapperCol={{span:8}} label="使用性质">
          {getFieldDecorator('usingNature', )(
            <UsingNature></UsingNature>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:4}} label="使用面积">
          {getFieldDecorator('area',{rules:[{type: 'number', message: '请输入数字',transform:(value)=> {return Number(value)}}]} )(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="使用者">
          {getFieldDecorator('user', )(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="负责人">
          {getFieldDecorator('head', )(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="防火责任人">
          {getFieldDecorator('fireHead', )(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:20}} label="房屋描述">
          {getFieldDecorator('houseDesc', )(
            <TextArea rows={4}></TextArea>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:20}} label="设备配置">
          {getFieldDecorator('deviceConfig', )(
            <CheckboxGroup options={checkboxOption}/>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:4}} label="容纳人数">
          {getFieldDecorator('peopleNum', )(
            <Select >
              <Option value="0">不限</Option>
              <Option value="1">5人以下</Option>
              <Option value="2">5-10人</Option>
              <Option value="3">10-20人</Option>
              <Option value="4">20人以上</Option>
            </Select>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="实际人数">
          {getFieldDecorator('realPeopleNum', )(
            <Input/>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="房屋照片">
          {getFieldDecorator('housePic', )(
            <Upload action='//jsonplaceholder.typicode.com/posts/' listType='picture'>
              <Button>
                <Icon type="upload" /> 上传
              </Button>
            </Upload>
          )}
        </Item>
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
          <WrappedMainForm/>
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHAdd
