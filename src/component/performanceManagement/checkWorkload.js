import React, {Component} from 'react'
import {Button, Form, Row, Col, message, Empty} from 'antd'
import API from '../../api'
import Table from '../common/table'
import MainContainer from '../common/mainContainer'
import {DeptSelect} from '../common/select'
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
              {getFieldDecorator('dept',)(
                <DeptSelect></DeptSelect>
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
    const columns = [
      {
        title: '年份',
        dataIndex: 'nianfen',
      },
      {
        title: '部门',
        dataIndex: 'bumen',
      },
      {
        title: '教学工作量',
        dataIndex: 'jiaoxuegongzuoliang',
      },
      {
        title: '科研工作量',
        dataIndex: 'keyangongzuoliang',
      },
      {
        title: '备注',
        dataIndex: 'beizhu',
      },
    ]
    return <Table columns={columns} {...this.props}/>
  }
}

class CheckWorkload extends Component{
  state = {
    dept: '',
    tableList: [],
    isSearched: false,
    tableLoading: false,
    current: 0,
  }
  search = ({dept})=>{
    this.setState({
      dept,
    })
    this.setState({tableLoading: true, isSearched: true, current: 1})
    API.searchWorkLoad(dept)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  tableChange = (p)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchWorkLoad(this.state.dept, p)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('加载失败')
    })
    .finally(()=>this.setState({tableLoading: false}))
  }

  render(){
    return <MainContainer name="工作量查看">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      {
        this.state.isSearched?(
          <DisplayTable
            current={this.state.current}
            onChange={this.tableChange}
            loading={this.state.tableLoading} data={this.state.tableList}/>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
    </MainContainer>
  }
}

export default CheckWorkload
