import React, {Component} from 'react'
import {Row, Col, Form, message, Empty, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import UsingNature from '../common/usingNature'
import Split from '../common/split'
import Upload from '../common/upload'
import API from '../../api'
import {ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding} from './commonFormItem'
import Back from '../common/back'
import {TButton} from '../common/button'
const {Item} = Form


function Title(){
  return (
    <Row>
      <Col>
        <div style={{fontSize:'20px', textAlign:'right'}}>新增房屋</div>
      </Col>
    </Row>
  )
}


class MainForm extends Component{
  state = {
    type: '',
    loading: false,
  }
  setType = (props)=>{
    this.setState({type: props[0]})
    return props
  }
 staging = ()=>{
   this.props.form.validateFields((err, values) => {
     if (!err) {
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
       this.setState({loading: true})
       API.addPH(values)
       .then(()=>{
          message.success('添加成功')
        })
        .catch(err=>{
          if(!err.resolved){
            message.error('添加失败')
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
    let changeForm = {
      '1':<ScientificBuilding {...this.props}></ScientificBuilding>,
      '2':<LogisticsBuilding {...this.props}></LogisticsBuilding>,
      '3':<BusinessBuilding {...this.props}></BusinessBuilding>,
      '4':<CollegePartyBuilding {...this.props}></CollegePartyBuilding>,
    }
    return (
      <Spin spinning={this.state.loading}>
        <Form style={{minWidth: 700}} onSubmit={this.handleSubmit}>
          <Item labelCol={{span:3}} wrapperCol={{span:8}} label="房屋类型">
            {getFieldDecorator('usingNature', {
              getValueFromEvent: this.setType,
              rules:[{required: true, message:'请选择房屋类型'}]
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
                <Col offset={6}>
                  <Empty style={{marginBottom: 20}} description="请先选择房屋类型"></Empty>
                </Col>
              </Row>
            )
          }
          <Row>
            <Col offset={10}>
              <Row>
                <TButton.ConfirmButton type='primary' htmlType='submit'>提交</TButton.ConfirmButton>
                <TButton.ResetButton type='primary' onClick={this.reset}>重置</TButton.ResetButton>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    )
  }
}

const WrappedMainForm = Form.create({ name: 'main_form' })(MainForm)


class PHAdd extends Component{
  render(){
    return <MainContainer name="公用房新增">
      <Row>
        <Col span={2}>
          <Back></Back>
        </Col>
        <Col span={10}>
          <Title/>
        </Col>
      </Row>
      <Split/>
      <Row style={{marginBottom: 25}}>
        <Col span={15}>
          <WrappedMainForm />
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHAdd
