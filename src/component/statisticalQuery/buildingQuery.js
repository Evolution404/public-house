import React, {Component} from 'react'
import {Select, Button, Form, Row, Col} from 'antd'
import {LButton} from '../common/button'
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
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',)(
                <Select>
                  <Option value="研究院">研究院</Option>
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

class BuildingQuery extends Component{
  constructor(props){
    super(props)
    this.state = {
      buildingName: '',
    }
  }
  search = ({buildingName})=>{
    this.setState({
      buildingName,
    })
  }
  render(){
    return <MainContainer name="统计查询">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
    </MainContainer>
  }
}

export default BuildingQuery
