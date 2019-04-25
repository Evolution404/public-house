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
import UsingNature from '../common/usingNature'
import {DeptSelect} from '../common/select'
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
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('deptName',)(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="使用性质">
              {getFieldDecorator('usingNature',{
                rules: [{required: true, message: '请选择使用性质'}]
              })(
                <UsingNature></UsingNature>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="审批状态">
              {getFieldDecorator('auditStatus',)(
                <Select allowClear>
                  <Option value="">所有</Option>
                  <Option value="已批准">已批准</Option>
                  <Option value="已驳回">已驳回</Option>
                  <Option value="已上报">已上报</Option>
                  <Option value="未上报">未上报</Option>
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
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '楼宇',
        dataIndex: 'building',
      },
      {
        title: '楼层',
        dataIndex: 'floor',
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
      },
      {
        title: '审批状态',
        dataIndex: 'auditStatus',
        render: (text)=>(
          TableUtil.mapColor(text)
        )
      },
      {
        title: '驳回原因',
        dataIndex: 'dismissReason',
      }
    ]
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <Router>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Link to={Map.PHAuditDetail.path.replace(':id', this.props.type+'-'+record.id)}>
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
  state = {
    type: '',
    tableList: [],
    selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
  }
  // filter的内容是dept, usingNature, status
  search = (filter)=>{
    this.setState({type: filter.usingNature[0]})
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
      <DisplayTable
        type={this.state.type}
        data={this.state.tableList} onSelectedChange={this.selectedChange}></DisplayTable>
    </MainContainer>
  }
}

export default PHAudit
