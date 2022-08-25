import React, {Component} from 'react'
import {message, Row, Col, Form, Input, Button, Checkbox, Select} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Upload from '../common/upload'
import API from '../../api'
import {BuildingSelect, FloorSelect} from '../common/select'
import Back from '../common/back'
const Option = Select.Option
const {Item} = Form
const CheckboxGroup = Checkbox.Group

class MainForm extends Component{
  state = {
    areaConfig: [],
  }
  reset = ()=>{
    this.props.form.resetFields()
  }
  areaConfigChange = (e)=>{
    if(e.length < 2){
      this.setState({areaConfig: e})
      return e
    }
    let newValue = e.filter(key => !this.state.areaConfig.includes(key))
    this.setState({areaConfig: newValue})
    return newValue
  }
  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       values = {
         ...values,
         id:this.props.id,
        }
        API.briefChangeSubmitPH(values)
        .then(()=>{
          message.success('提交成功')
        })
        .catch(err=>{
           if(!err.resolved)
            message.error('提交失败')
        })
      }
    })
  }
  removeDrawings = (id)=>{
    return new Promise((resolve, reject)=>{
      API.deleteDrawings(id)
      .then(()=>{
        resolve()
      })
      .catch(err=>{
        reject()
        if(!err.resolved)
          message.error('删除图片失败')
      })
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const checkboxOption = [
      { label: '地下室', value: 0},
      { label: '平房', value: 1},
    ]
    return (
      <Form style={{minWidth: 950}} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={8}>
            <Item labelCol={{span:9}} wrapperCol={{span:13}} label="楼宇">
              {getFieldDecorator('building', {initialValue:this.props.building})(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="楼层">
              {getFieldDecorator('floor', {initialValue:this.props.floor})(
                <FloorSelect></FloorSelect>
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
          <Col span={8}>
            <Item labelCol={{span:6}} wrapperCol={{span:13, offset:1}} label="房屋状态">
              {getFieldDecorator('status', {
                initialValue: this.props.status
              })(
                <Select >
                  <Option value="使用中">使用中</Option>
                  <Option value="待分配">待分配</Option>
                  <Option value="暂借中">暂借中</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item labelCol={{span:3}} wrapperCol={{span:20}}>
              {getFieldDecorator('areaConfig', {
                getValueFromEvent: this.areaConfigChange,
                initialValue: this.props.areaConfig,
              })(
                <CheckboxGroup options={checkboxOption}/>
              )}
            </Item>
          </Col>
        </Row>
        <Item labelCol={{span:3}} wrapperCol={{span:10}} label="备注">
          {getFieldDecorator('note', {
            initialValue: this.props.note,
          })(
            <Input></Input>
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
       if(!err.resolved)
        message.error('加载失败')
    })
  }
  render(){
    let formInfo = this.state
    return <MainContainer name="基本信息修改">
      <Row>
        <Col span={2}>
          <Back></Back>
        </Col>
        <Col span={10}>
          <h2 style={{textAlign: 'right'}}>房屋基本信息修改</h2>
        </Col>
      </Row>
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
