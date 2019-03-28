import React, {Component} from 'react'
import {Button, Form, Row, Col, message, Select} from 'antd'
import API from '../../api'
import Table, {TableUtil}from '../common/table'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
const Item = Form.Item
const Option = Select.Option

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
                <Select>
                  <Option value="部门1">部门1</Option>
                </Select>
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

class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '序号', '部门', '教学工作量', '科研工作量'
    ])
    return <Table columns={columns} {...this.props}/>
  }
}

class CheckWorkload extends Component{
  state = {
    deptName: '',
    tableList: [],
  }
  search = ({deptName})=>{
    this.setState({
      deptName,
    })
    API.searchWorkLoad(deptName)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('搜索失败')
    })
  }

  render(){
    return <MainContainer name="效益管理">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <DisplayTable data={this.state.tableList}/>
    </MainContainer>
  }
}

export default CheckWorkload
