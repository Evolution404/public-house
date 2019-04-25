import React, {Component} from 'react'
import {Empty, message, Row, Col, Form, Input, Button, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import UsingNature, { UsingNatureBrief } from '../common/usingNature'
import {BuildingSelect, FloorSelect} from '../common/select'
import Upload from '../common/upload'
import {ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding} from './commonFormItem'
import API from '../../api'
const {Item} = Form

class Search extends Component{
  state = {
    building: '',
  }
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
  buildingChange = building=>{
    if(building!==this.state.building)
      this.setState({building})
    return building
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('type',{
                rules: [{required: true, message: '请选择使用性质'}]
              })(
                <UsingNatureBrief></UsingNatureBrief>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',{
                getValueFromEvent: this.buildingChange,
                rules: [{required: true, message: '请选择楼宇名称'}]
              })(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼层">
              {getFieldDecorator('floor',{
                rules: [{required: true, message: '请选择楼层'}]
              })(
                <FloorSelect building={this.state.building}></FloorSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房间号">
              {getFieldDecorator('roomNum',{
                rules: [{required: true, message: '请选择房间号'}]
              })(
                <Input/>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
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
  state = {
    type: this.props.type,
  }
  reset = ()=>{
    this.props.form.resetFields()
  }
  setType = (type)=>{
    this.setState({type: type[0]})
    return type
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.change(values, self.props.type, self.props.id)
      }
    })
  }
  removeHousePic = (id)=>{
    return new Promise((resolve, reject)=>{
      API.deleteHousePic(id)
      .then(()=>{
        resolve()
      })
      .catch(err=>{
        reject()
        message.error('删除图片失败')
      })
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    let info = this.props.info
    let changeForm = {
      '1':<ScientificBuilding
        default={info} {...this.props}></ScientificBuilding>,
      '2':<LogisticsBuilding
        default={info} {...this.props}></LogisticsBuilding>,
      '3':<BusinessBuilding
        default={info} {...this.props}></BusinessBuilding>,
      '4':<CollegePartyBuilding
        default={info} {...this.props}></CollegePartyBuilding>,
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item labelCol={{span:3}} wrapperCol={{span:8}} label="使用性质">
          {getFieldDecorator('usingNature', {
            initialValue: info.usingNature,
            getValueFromEvent: this.setType,
            rules:[{required: true, message:'请选择使用性质'}]
          })(
            <UsingNature changeOnSelect={false}></UsingNature>
          )}
        </Item>
        {
          changeForm[this.state.type]
        }
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="房屋照片">
          {getFieldDecorator('housePic', {
          })(
            <Upload fileList={info.housePic}
              onRemove={this.removeHousePic}></Upload>
          )}
        </Item>
        <Item labelCol={{span:3}} wrapperCol={{span:12}} label="批准文书">
          {getFieldDecorator('approvalDocument', {})(
            <Upload disableRemove fileList={info.approvalDocument}></Upload>
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
    id: '',  // 1-11 -前面是类型,后面是房屋id
    type: '',
    hasSearched: false,
    // 是否是从公用房列表跳转过来的
    isJump: false,
    loading: false,
    formInfo: {},
  }
  componentWillMount(){
    let id = this.props.match.params.id
    if(id===':id') {return}
    this.setState({isJump: true, type:id.split('-')[0], id:id.split('-')[1]})
    this.search({id})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({hasSearched: false, isJump: false})
      let id = nextProps.match.params.id
      if(id===':id') {return}
      this.setState({isJump: true, type:id.split('-')[0], id:id.split('-')[1]})
      this.search({id})
    } 
  }
  change = (values, oldType, oldId)=>{
    this.setState({loading: true})
    API.PHChangeSubmit(values, oldType, oldId, this.state.formInfo.rawData)
    .then(()=>{
      message.success('修改成功')
    })
    .catch(err=>{
      message.error('修改失败')
      if(err.response){
        message.error(err.response.data.title)
      }
    })
    .finally(()=>{this.setState({loading: false})})
  }
  search = (values)=>{
    this.setState({loading: true, hasSearched:false})
    if(values.type)
      this.setState({type: values.type})
    API.changeFilterPH(values)
    .then(rs=>{
      this.setState({formInfo: rs, id:rs.id, hasSearched: true})
    })
    .catch(err=>{
      message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  render(){
    let formInfo = this.state.formInfo
    return <MainContainer name="详细信息">
      <Spin spinning={this.state.loading}>
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
                <WrappedMainForm
                  change={this.change}
                  type={this.state.type} id={this.state.id} info={formInfo}/>
              </Col>
            </Row>
          ):(
            <Empty description="请先搜索"></Empty>
          )
        }
      </Spin>
    </MainContainer>
  }
}

export default PHChange
