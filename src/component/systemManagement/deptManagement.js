import React, {Component} from 'react'
import {Input, Button,Form, Row, Col} from 'antd'
import {LButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
const Item = Form.Item

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
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('deptName',)(
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

class ButtonGroup extends Component{
  render(){
    return (
      <Row>
        <Col></Col>
      </Row>
    )
  }
}

class DeptManagement extends Component{
  constructor(props){
    super(props)
    this.state = {
      deptName: '',
    }
  }
  search = ({deptName})=>{
    this.setState({
      deptName,
    })
  }
  render(){
    return <MainContainer name="部门管理">
      部门管理
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup/>
    </MainContainer>
  }
}

export default DeptManagement
