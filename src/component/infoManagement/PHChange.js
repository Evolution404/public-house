import React, {Component} from 'react'
import {Empty, message, Row, Col, Form, Select, Input, Button, Cascader, Checkbox, Upload, Icon} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
const {Item} = Form
const Option = Select.Option
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        self.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',)(
                <Input/>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',)(
                <Input/>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' htmlType='submit'>搜索</Button>
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}
const WrappedSearch = Form.create({ name: 'search' })(Search)

class MainForm extends Component{
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
    const options = [
      {
        value: '0',
        label: '产业商业用房',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      },
      {
        value: '1',
        label: '后勤保障用房',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      },
      {
        value: '2',
        label: '公共服务用房',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      },
      {
        value: '3',
        label: '党政机关用房',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      },
      {
        value: '4',
        label: '学院用房',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
        }],
      },
    ]
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
          {getFieldDecorator('dept',{initialValue:this.props.dept,rules:[{required: true, message: '请选择所属部门'}]} )(
            <Select >
              <Option value="部门1">部门1</Option>
            </Select>
          )}
        </Item>
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
        <Item labelCol={{span:3}} wrapperCol={{span:8}} label="使用性质">
          {getFieldDecorator('usingNature', {initialValue:this.props.usingNature})(
            <Cascader
              
              placeholder='请选择'
              options={options}
              expandTrigger="hover"
            />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:4}} label="使用面积">
          {getFieldDecorator('area',{initialValue:this.props.usingArea} )(
            <Input disabled />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="使用者">
          {getFieldDecorator('user', {initialValue:this.props.user})(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="负责人">
          {getFieldDecorator('head', {initialValue:this.props.head})(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="防火责任人">
          {getFieldDecorator('fireHead', {initialValue:this.props.fireHead})(
            <Input />
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:20}} label="房屋描述">
          {getFieldDecorator('houseDesc', {initialValue:this.props.houseDesc})(
            <TextArea rows={4}></TextArea>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:20}} label="设备配置">
          {getFieldDecorator('deviceConfig', {initialValue:this.props.deviceConfig})(
            <CheckboxGroup options={checkboxOption}/>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:4}} label="容纳人数">
          {getFieldDecorator('peopleNum', {initialValue:this.props.peopleNum})(
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
          {getFieldDecorator('realPeopleNum', {initialValue:this.props.realPeopleNum})(
            <Input/>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="房屋照片">
          {getFieldDecorator('housePic', {})(
            <Upload action='//jsonplaceholder.typicode.com/posts/'
              listType='picture'
              defaultFileList={this.props.housePic}
            >
              <Button>
                <Icon type="upload" /> 上传
              </Button>
            </Upload>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="批准文书">
          {getFieldDecorator('housePic', {})(
            <Upload action='//jsonplaceholder.typicode.com/posts/'
              listType='picture'
              defaultFileList={this.props.housePic}
            >
              <Button>
                <Icon type="upload" /> 上传
              </Button>
            </Upload>
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


class PHChange extends Component{
  state = {
    hasSearched: false,
    // 是否是从公用房列表跳转过来的
    isJump: false,
  }
  componentDidMount(){
    let id = this.props.match.params.id
    if(id===':id') {return}
    this.setState({isJump: true})
    this.search({id})
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
  search = (values)=>{
    API.changeFilterPH(values)
    .then(rs=>{
      this.setState(rs)
      this.setState({hasSearched: true})
    })
    .catch(err=>{
      message.error('搜索失败')
    })
  }
  render(){
    let formInfo = this.state
    return <MainContainer name="详细信息">
      {
        !this.state.isJump&&(
          <WrappedSearch onSearch={this.search}/>
        )
      }
      <Split/>
      {
        this.state.hasSearched?(
          <Row>
            <Col span={15}>
              <WrappedMainForm {...formInfo}/>
            </Col>
          </Row>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}

export default PHChange
