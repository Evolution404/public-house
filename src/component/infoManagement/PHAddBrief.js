import React, {Component} from 'react'
import {Row, Col, Form, Select, Input, Button, Checkbox, Upload, Icon, message} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
const {Item} = Form
const Option = Select.Option
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
  reset = ()=>{
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        API.briefAddPH(values)
        .then(()=>{
          message.success('新增成功')
        })
        .catch(err=>{
          message.error('新增失败')
        })

      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const checkboxOption = [
      { label: '是否地下室', value: 0},
      { label: '是否简易房', value: 1},
    ]
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item labelCol={{span:3}} wrapperCol={{span:6}} label="楼宇">
          {getFieldDecorator('building', )(
            <Select >
              <Option value="部门1">部门1</Option>
            </Select>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:6}} label="楼层">
          {getFieldDecorator('floor', )(
            <Select >
              <Option value="部门1">部门1</Option>
            </Select>
          )}
        </Item>
        <Row>
          <Col span={6}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="房间号">
              {getFieldDecorator('roomNum', )(
                <Input />
              )}
            </Item>
          </Col>
          <Col offset={1} span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:13, offset:1}} label="房屋状态">
              {getFieldDecorator('houseStatus', )(
                <Select >
                  <Option value="使用中">使用中</Option>
                  <Option value="待分配">待分配</Option>
                  <Option value="暂借中">暂借中</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:12}} label="使用面积">
              {getFieldDecorator('area',{initialValue:this.props.usingArea} )(
                <Input />
              )}
            </Item>
          </Col>
          <Col span={10}>
            <Item labelCol={{span:3}} wrapperCol={{span:20}}>
              {getFieldDecorator('areaConfig', )(
                <CheckboxGroup options={checkboxOption}/>
              )}
            </Item>
          </Col>
        </Row>
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
          <Col offset={6} span={4}>
            <Button type='primary' htmlType='submit'>保存</Button>
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


class PHAddBrief extends Component{
  render(){
    return <MainContainer name="基本信息管理">
      基本信息/新增公用房
      <Title/>
      <Split/>
      <Row>
        <Col offset={2} span={15}>
          <WrappedMainForm/>
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHAddBrief
