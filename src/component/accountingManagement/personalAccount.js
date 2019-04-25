import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Form, Row, Col, Input, Button, Empty, Spin, message} from 'antd'
import {YearSelect} from '../common/select'
import Split from '../common/split'
import Table from '../common/table'
import API from '../../api'

const Item = Form.Item

class Search extends Component{
  search = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(err)
        return
      this.props.search(values)
    })
  }
  accounting = ()=>{
    this.props.form.validateFields((err, values)=>{
      if(err)
        return
      this.props.accounting(values)
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{span:12}} wrapperCol={{span: 12}}>
        <Row>
          <Col span={4}>
            <Item label="年份">
              {getFieldDecorator('nianfen',)(
                <YearSelect size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} style={{marginTop: 5}}
            span={2}><Button
              onClick={this.search}
              type="primary">查询</Button></Col>
          <Col span={6}>
            <Item labelCol={{span: 7}} wrapperCol={{span: 14}} label="工号">
              {getFieldDecorator('gonghao',)(
                <Input></Input>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}}
            span={2}><Button
              onClick={this.accounting}
              type="primary">核算</Button></Col>
        </Row>
      </Form>      
    )
  }
}

Search = Form.create({name: 'search'})(Search)

class DisplayTable extends Component{
  render(){
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '年份',
        dataIndex: 'nianfen',
      },
      {
        title: '工号',
        dataIndex: 'gonghao',
      },
      {
        title: '行政面积定额',
        dataIndex: 'xingzhengmianjiDe',
      },
      {
        title: '学院面积定额',
        dataIndex: 'xueyuanmianjiDe',
      },
      {
        title: '行政面积实际',
        dataIndex: 'xingzhengmianjiSj',
      },
      {
        title: '学院面积实际',
        dataIndex: 'xueyuanmianjiSj',
      },
    ]
    return (
      <Table {...this.props} columns={columns} data={this.props.data}></Table>      
    )
  }
}

class PersonalAccount extends Component{
  state = {
    tableList: [],
    hasSearched: false,
    loading: false,
    tip: "",
  }
  // 核算信息
  accounting = (values)=>{
    this.setState({loading: true, tip: `核算信息中...`})
    API.accountingPersonalInfo(values)
    .then(()=>{
      message.success('信息核算成功')
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('核算信息失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  // 查询信息
  search = (values)=>{
    this.setState({hasSearched: true, loading: true, tip: `加载核算信息中...`})
    API.searchPersonnelAccountingInfo(values)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('加载核算信息失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  render(){
    return (
      <MainContainer name="核算管理">
        <Search search={this.search} accounting={this.accounting}></Search>
        <Split></Split>
        <Spin tip={this.state.tip} spinning={this.state.loading}>
          <Row>
            <Col><h2 style={{textAlign: 'center'}}>个人核算结果</h2></Col>
          </Row>
          {
            this.state.hasSearched?(
              <DisplayTable
                data={this.state.tableList}></DisplayTable>
            ):(
              <Empty description="请先搜索"></Empty>
            )
          }
        </Spin>
      </MainContainer>
    )
  }
}

export default PersonalAccount
