import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Row, Col, Form, Select, Button, message} from 'antd'
import MainContainer from '../common/mainContainer'
import Table, {TableUtil} from '../common/table'
import {SButton} from '../common/button'
import API from '../../api'
const {Item} = Form
const Option = Select.Option

class SearchForm extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        self.props.onSearch(values)
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}><Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门">
              {getFieldDecorator('dept',)(
                <Select >
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('usingNature',)(
                <Select>
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="状态">
              {getFieldDecorator('status',)(
                <Select>
                  <Option value="0">所有</Option>
                  <Option value="1">已批准</Option>
                  <Option value="2">未批准</Option>
                  <Option value="3">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' htmlType='submit'>搜索</Button>
            </div>
          </Col>
      </Row></Form>
    )
  }
}

const WrappedSearchForm = Form.create({ name: 'search_form' })(SearchForm)

class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '序号', '部门', '位置', '使用性质', '使用者', '填报时间', '状态',
      '审批时间', '驳回原因'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <Router>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Link to={Map.PHAuditDetail.path.replace(':id', record.id)}>
              <SButton text='开始审批'/>
            </Link>
          </div>
        </Router>
      )
    })
    return <Table columns={columns} {...this.props}/>
  }
}

class PHAudit extends Component{
  constructor(props){
    super(props)
    this.state = {
      tableList: [],
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
    }
  }
  // filter的内容是dept, usingNature, status
  search = (filter)=>{
    API.auditFilterPH(filter)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(e=>{
      message.error('获取失败, 请重试')
      console.log(e)
    })
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  render(){
    return <MainContainer name="公用房管理">
      基本信息/公用房审批
      <WrappedSearchForm onSearch={this.search}/>
      <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange}></DisplayTable>
    </MainContainer>
  }
}

export default PHAudit
