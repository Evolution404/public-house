import React, {Component} from 'react'
import {message, Row, Col, Form, Select, Input, Button, Checkbox, Icon} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Upload from '../common/upload'
import API from '../../api'
const {Item} = Form
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

class MainForm extends Component{
  reset = ()=>{
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          ...values,
          id:this.props.id,
        }
        API.briefChangeSubmitPH(values)
        .then(()=>{
          message.success('提交成功')
        })
        .catch(err=>{
          message.error('提交失败')
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
        <Row>
          <Col span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:13}} label="楼宇">
              {getFieldDecorator('building', {initialValue:this.props.building})(
                <Select >
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="楼层">
              {getFieldDecorator('floor', {initialValue:this.props.floor})(
                <Select >
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="房间号">
              {getFieldDecorator('roomNum', {initialValue:this.props.roomNum})(
                <Input />
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:12}} label="使用面积">
              {getFieldDecorator('useArea',{initialValue:this.props.useArea} )(
                <Input />
              )}
            </Item>
          </Col>
          <Col span={10}>
            <Item labelCol={{span:3}} wrapperCol={{span:20}}>
              {getFieldDecorator('areaConfig',
                 {initialValue: this.props.areaConfig})(
                <CheckboxGroup options={checkboxOption}/>
              )}
            </Item>
          </Col>
        </Row>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="房屋图纸">
          {getFieldDecorator('drawings', {})(
            <Upload fileList={this.props.drawings} disableRemove></Upload>
          )}
        </Item>
        <Row>
          <Col offset={12} span={4}>
            <Button type='primary' htmlType='submit'>提交变更</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedMainForm = Form.create({ name: 'main_form' })(MainForm)


class PHChangeBrief extends Component{
  state = {
    hasLoaded: false,
    id: this.props.match.params.id
  }
  componentDidMount(){
    this.search()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({hasSearched: false, isJump: false})
      let id = nextProps.match.params.id
      if(id===':id') {return}
      this.setState({isJump: true})
      this.search({id})
    } 
  }
  search = ()=>{
    API.briefChangeFilterPH(this.state.id)
    .then(rs=>{
      this.setState(rs)
      this.setState({hasLoaded: true})
    })
    .catch(err=>{
      message.error('加载失败')
    })
  }
  render(){
    let formInfo = this.state
    return <MainContainer name="详细信息">
      <h2 style={{textAlign: 'center'}}>公用房详细信息</h2>
      <Split/>
      {
        this.state.hasLoaded&&(
          <Row style={{marginTop: 50}}>
            <Col span={15}>
              <WrappedMainForm {...formInfo}/>
            </Col>
          </Row>
        )
      }
    </MainContainer>
  }
}

export default PHChangeBrief
