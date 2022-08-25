import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"
import Map from '../../routerMap'
import {Row, Col, Form, Select, message} from 'antd'
import MainContainer from '../common/mainContainer'
import Table, {TableUtil, sorterParse} from '../common/table'
import {SButton} from '../common/button'
import UsingNature from '../common/usingNature'
import {DeptSelect} from '../common/select'
import Split from '../common/split'
import API from '../../api'
import {TButton} from '../common/button'
import {read, write} from '../stateHelper'
const {Item} = Form
const Option = Select.Option

class SearchForm extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       self.props.onSearch(values)
     }
   })
 }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop: 50}}><Row>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('deptName',{
                initialValue: this.props.initialValue.deptName,
              })(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="房屋类型">
              {getFieldDecorator('usingNature',{
                initialValue: this.props.initialValue.usingNature,
                rules: [{required: true, message: '请选择房屋类型'}]
              })(
                <UsingNature></UsingNature>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="审批状态">
              {getFieldDecorator('auditStatus',{
                initialValue: this.props.initialValue.auditStatus,
              })(
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
              <TButton.SearchButton type='primary' htmlType='submit'>搜索</TButton.SearchButton>
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
        title: '部门',
        dataIndex: 'dept',
        sorter: true,
      },
      {
        title: '楼宇',
        dataIndex: 'building',
        sorter: true,
      },
      {
        title: '楼层',
        dataIndex: 'floor',
        sorter: true,
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
        sorter: true,
      },
      {
        title: '审批状态',
        dataIndex: 'auditStatus',
        sorter: true,
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
              <SButton disable={record.auditStatus!=='已上报'} text='开始审批'/>
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
    filter: {},
    current: 0,
    tableLoading: false,
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  // filter的内容是dept, usingNature, status
  search = (filter)=>{
    this.setState({type: filter.usingNature[0], filter, current: 1, tableLoading: true})
    API.auditFilterPH(filter)
    .then(rs=>{
      this.setState({tableList: rs})
   })
   .catch(e=>{
     message.error('获取失败, 请重试')
   })
   .finally(()=>{this.setState({tableLoading: false})})
 }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
 }
 tableChange = (p, s)=>{
   this.setState({tableLoading: true, page:p, current: p.current})
   API.auditFilterPH(sorterParse(this.state.filter, s), p)
   .then(rs=>{
     this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
     message.error('加载失败')
   })
   .finally(()=>this.setState({tableLoading: false}))
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  render(){
    return <MainContainer name="变更审核">
      <WrappedSearchForm
        initialValue={this.state.filter}
        onSearch={this.search}/>
      <Split></Split>
      <DisplayTable
        current={this.state.current}
        onChange={this.tableChange}
        type={this.state.type}
        loading={this.state.tableLoading}
        data={this.state.tableList} onSelectedChange={this.selectedChange}></DisplayTable>
    </MainContainer>
  }
}

export default PHAudit
