import React, {Component} from 'react'
import {Button, Steps, message,
  Spin, Row, Col, Form, TreeSelect, Empty,
  Modal, Input, Select, Checkbox} from 'antd'
import MainContainer from '../common/mainContainer'
import {BuildingSelect, FloorSelect} from '../common/select'
import Upload from '../common/upload'
import API from '../../api'
import UsingNature from '../common/usingNature'
import {ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding} from './commonFormItem'

const Step = Steps.Step
const Item = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const confirm = Modal.confirm

class RoomSelect extends Component{
  render(){
    return (
      <TreeSelect
        {...this.props}
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={this.props.treeData}
        placeholder="请选择房间号"
        treeDefaultExpandAll
        multiple
      />      
    )
  }
}

// 楼宇 楼层 房间号(房屋类型)
class BasicInfo extends Component{
  state = {
    louyu:'',
    louceng: '',
    treeData: [],
  }
  louyuChange = louyu=>{
    if(louyu!==this.state.louyu)
      this.setState({louyu})
    return louyu
  }
  componentWillMount(){
    let initialValue = this.props.initialValue
    if(initialValue.louceng&&initialValue.louyu){
      this.getTreeData(initialValue.louyu, initialValue.louceng)
    }
  }
  loucengChange = louceng=>{
    louceng = louceng.target.value
    if(this.state.louyu&&louceng&&louceng!==this.state.louceng){
      this.setState({louceng})
      this.getTreeData(this.state.louyu, louceng)
    }
    return louceng
  }
  getTreeData = (louyu, louceng)=>{
    API.transformSearch(louyu, louceng)
    .then(rs=>{
      this.setState({treeData: rs})
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error("加载房间号失败")
    })
  }
  submit = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(err)
        return
      this.props.setData(1, 0, values)
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const initialValue = this.props.initialValue
    return (
      <Form labelCol={{span: 12}}
        wrapperCol={{span:12}}>
        <Row style={{marginTop: 25}}>
          <Col offset={2} span={8}>
            <Item label="楼宇名称">
              {
                getFieldDecorator('louyu',{
                  getValueFromEvent: this.louyuChange,
                  initialValue: initialValue.louyu,
                  rules: [{required: true, message: '请选择楼宇'}]
                })(
                  <BuildingSelect></BuildingSelect>
                )
              }
            </Item>
          </Col>
          <Col span={8}>
            <Item label="楼层">
              {
                getFieldDecorator('louceng',{
                  getValueFromEvent: this.loucengChange,
                  initialValue: initialValue.louceng,
                  rules: [{required: true, message: '请选择楼层'}]
                })(
                  <FloorSelect></FloorSelect>
                )
              }
            </Item>
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={8}>
            <Item label="具体房间">
              {
                getFieldDecorator('fangjian',{
                  initialValue: initialValue.fangjian,
                  rules: [{required: true, message: '请选择房间号'}]
                })(
                  <RoomSelect treeData={this.state.treeData}></RoomSelect>
                )
              }
            </Item>
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={8}>
            <Item label="改造目标房间数">
              {
                getFieldDecorator('targetNum',{
                  initialValue: initialValue.targetNum,
                  rules: [{required: true, message: '请输入改造目标房间数'}]
                })(
                  <Input></Input>
                )
              }
            </Item>
          </Col>
        </Row>
        <Row style={{margin: '20px 0'}}>
          <Col offset={11} span={2}>
            <Button
              onClick={this.submit}
              type="primary">下一步</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

BasicInfo = Form.create({name: 'basicinfo'})(BasicInfo)

class MainForm extends Component{
  state = {
    type: (this.props.info&&this.props.info.usingNature)?
            this.props.info.usingNature[0]:'',
    loading: false,
  }
  prev = ()=>{
    this.props.form.validateFields((err, values)=>{
      this.props.prev(values)
      this.props.form.resetFields()
    })
  }
  next = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(err)
        return
      if(this.props.next(values))
        return
      this.props.form.resetFields()
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.info){
      if(nextProps.info.usingNature){
        if(nextProps.info.usingNature[0]!==this.state.type){
          this.setState({type: nextProps.info.usingNature[0]})
        }
      }
    }
  }
  setType = (props)=>{
    this.setState({type: props[0]})
    return props
  }
  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       this.setState({loading: true})
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
        .finally(()=>{
          this.setState({loading: false})
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    let info = this.props.info||{}
    let changeForm = {
      '1':<ScientificBuilding
        noBFR
        default={info} {...this.props}></ScientificBuilding>,
      '2':<LogisticsBuilding
        noBFR
        default={info} {...this.props}></LogisticsBuilding>,
      '3':<BusinessBuilding
        noBFR
        default={info} {...this.props}></BusinessBuilding>,
      '4':<CollegePartyBuilding
        noBFR
        default={info} {...this.props}></CollegePartyBuilding>,
    }
    return (
      <Spin spinning={this.state.loading}>
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
            this.state.type?(
              <div>
                {
                  changeForm[this.state.type]
                }
              </div>
            ):(
              <Row>
                <Col offset={0}>
                  <Empty style={{marginBottom: 20}} description="请先选择使用性质"></Empty>
                </Col>
              </Row>
            )
          }
        </Form>
        <Row style={{margin: '20px 0'}}>
          <Col offset={10} span={2}>
            <Button
              onClick={this.prev}
              type="primary">上一步</Button>
          </Col>
          <Col span={2}>
            <Button
              onClick={this.next}
              type="primary">{this.props.isEnd?'完成':'下一步'}</Button>
          </Col>
        </Row>
      </Spin>
    )
  }
}

MainForm = Form.create({ name: 'main_form' })(MainForm)

class RoomInfo extends Component{
  state = {
    loading: false,
    subValues: {},
    areaConfig: [],
  }
  prev = (subValues)=>{
    this.props.form.validateFields((err, values)=>{
      values.subValues = subValues
      this.props.setData(this.props.current-1, this.props.current, values)
      this.props.form.resetFields()
    })
  }
  next = (subValues)=>{
    this.props.form.validateFields((err, values)=>{
      if(err)
        return err
      values.subValues = subValues
      this.props.setData(this.props.current+1, this.props.current, values)
      this.props.form.resetFields()
    })
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
  render(){
    const {getFieldDecorator} = this.props.form
    const initialValue = this.props.initialValue
    const checkboxOption = [
      { label: '是否地下室', value: 0},
      { label: '是否简易房', value: 1},
    ]
    return (
      <Spin spinning={this.state.loading}>
        <Form>
          <Item labelCol={{span:3}} wrapperCol={{span:6}} label="楼宇">
            {getFieldDecorator('louyu', {
              initialValue: this.props.louyu,
              getValueFromEvent: this.buildingChange,
            })(
              <BuildingSelect disabled></BuildingSelect>
            )}
          </Item>
          <Item labelCol={{span:3}} wrapperCol={{span:6}} label="楼层">
            {getFieldDecorator('louceng', {
              initialValue: this.props.louceng,
            })(
              <FloorSelect disabled building={this.props.louyu}></FloorSelect>
            )}
          </Item>
          <Row>
            <Col span={6}>
              <Item labelCol={{span:12}} wrapperCol={{span:12}} label="房间号">
                {getFieldDecorator('fangjianhao', {
                  initialValue: initialValue.fangjianhao||"",
                })(
                  <Input />
                )}
              </Item>
            </Col>
            <Col offset={1} span={8}>
              <Item labelCol={{span:9}} wrapperCol={{span:13, offset:1}} label="房屋状态">
                {getFieldDecorator('zhuangtai', {
                  initialValue: initialValue.zhuangtai||"",
                })(
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
                {getFieldDecorator('shiyongmianji', {
                  initialValue: initialValue.shiyongmianji||"",
                })(
                  <Input />
                )}
              </Item>
            </Col>
            <Col span={10}>
              <Item labelCol={{span:3}} wrapperCol={{span:20}}>
                {getFieldDecorator('areaConfig', {
                  getValueFromEvent: this.areaConfigChange,
                  initialValue: initialValue.areaConfig||[],
                })(
                  <CheckboxGroup options={checkboxOption}/>
                )}
              </Item>
            </Col>
          </Row>
          <Item labelCol={{span:3}} wrapperCol={{span:12}} label="备注">
            {getFieldDecorator('beizhu', {
              initialValue: initialValue.beizhu||"",
            })(
              <Input></Input>
            )}
          </Item>
          <Item labelCol={{span:3}} wrapperCol={{span:12}} label="房屋照片">
            {getFieldDecorator('housePic', {
              initialValue: initialValue.housePic||[],
            })(
              <Upload defaultIsFile></Upload>
            )}
          </Item>
        </Form>
        <MainForm
          prev={this.prev}
          next={this.next}
          isEnd={this.props.isEnd}
          info={initialValue.subValues}
        ></MainForm>
      </Spin>
    )
  }
}

RoomInfo = Form.create({name: 'roominfo'})(RoomInfo)


class PHTransform extends Component{
  state = {
    current: 0,
    stepData: [],
    targetNum: 0,
    louyu: '',
    louceng: 0,
  }
  setData = (newCurrent, current, values)=>{
    // 如果进入步骤1 需要设置targetNum, louyu, louceng
    if(current===0&&newCurrent===1){
      let {targetNum, louyu, louceng} = values
      this.setState({targetNum: parseInt(targetNum), louyu, louceng})
    }
    let stepData = this.state.stepData
    stepData[current] = values
    // 此时是完成按钮
    if(current!==0&&newCurrent>this.state.targetNum){
      let self = this
      this.setState({stepData}, ()=>{
        confirm({
          title: '确认要提交改造信息吗?',
          content: '点击确认后改造信息将提交给管理员审核',
          onOk() {
            API.transformSubmit(self.state.stepData)
            .then(rs=>{
              message.success('提交改造信息成功')
            })
            .catch(err=>{
              if(err.response)
                message.error(err.response.data.title)
              else
                message.error('提交改造信息失败')
            })
          },
          onCancel() {},
        })      
      })
    }
    else
      this.setState({current: newCurrent, stepData})
  }
  render(){
    const { current } = this.state
    let steps = [
      {
        title: '填写改造基本信息',
        content: 
        <BasicInfo initialValue={this.state.stepData[0]||{}}
          setData={this.setData}></BasicInfo>,
      },
    ]
    if(this.state.current===0){
      steps.push({
        title: '填写改造后房屋信息',
      })
    }else{
      for(let i=0;i < this.state.targetNum;i++){
        steps.push({
          title: '填写房间'+(i+1)+'信息',
          content: 
          <RoomInfo initialValue={this.state.stepData[i+1]||{}}
            current={i+1}
            louyu={this.state.louyu}
            louceng={this.state.louceng}
            setData={this.setData}></RoomInfo>,
        })
      }
    }
    return (
      <MainContainer name="公用房改造">
        <Row style={{margin: '20px 0'}}>
          <Col offset={1} span={22}>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
          </Col>
        </Row>
        {
          current===0?(
            <BasicInfo initialValue={this.state.stepData[0]||{}}
              setData={this.setData}></BasicInfo>
          ):(
            <RoomInfo initialValue={this.state.stepData[current]||{}}
              current={current}
              isEnd={parseInt(this.state.targetNum)===current}
              louyu={this.state.louyu}
              louceng={this.state.louceng}
              setData={this.setData}></RoomInfo>
          )
        }
      </MainContainer>
    )
  }
}

export default PHTransform
