import React, {Component} from 'react'
import {UsingNatureBrief} from '../common/usingNature'
import {Form, Row, Col, Button, message} from 'antd'
import Table from '../common/table'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import API from '../../api'

const Item = Form.Item

class Search extends Component{
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{span:12}} wrapperCol={{span:12}}>
        <Row>
          <Col span={6}>
            <Item label="使用性质">
              {getFieldDecorator('type',{
                rules:[{required:true, message:'请选择部门性质'}]})(
                  <UsingNatureBrief></UsingNatureBrief>
              )}
            </Item>
          </Col>
          <Col offset={2} style={{marginTop: 5}} span={2}>
            <Button onClick={this.search} type="primary">搜索</Button>
          </Col>
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
        title: '部门',
        dataIndex: 'bumen',
      },
      {
        title: '楼宇',
        dataIndex: 'louyu',
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
      },
      {
        title: '改造审批状态',
        dataIndex: 'gaizaoshenpizhuangtai',
        render: (text)=>{
          if(text < 1){
            return '审批驳回'
          }
          else if(text < 5){
            return '审批中'
          }else if (text < 6){
            return '审批通过'
          }else{
            return '不是改造公用房'
          }

        }
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton
                onClick={this.props.audit.bind(this, record.id, 1)} text='通过'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton
                onClick={this.props.audit.bind(this, record.id, 0)} text='驳回'/>
            </div>
          </div>
        )
      },
    ]
    return <Table columns={columns} {...this.props}/>
  }
}

class PHTransformAudit extends Component{
  state = {
    tableList: [],
    type: '',
    loading: false,
  }
  audit = (id, shenpi)=>{
    API.transformAudit({
      leixing: parseInt(this.state.type),
      id, shenpi,
    })
    .then(()=>{
      message.success('审批成功')
      this.refresh()
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('审批失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  refresh = ()=>{
    this.setState({loading: true})
    API.transformAuditSearch(this.state.type)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('刷新失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  search = ({type})=>{
    this.setState({type, loading: true})
    API.transformAuditSearch(type)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      if(err.response)
        message.error(err.response.data.title)
      else
        message.error('搜索失败')
    })
    .finally(()=>{this.setState({loading: false})})
  }
  tableChange = (p)=>{
    this.setState({loading: true, page:p, current: p.current})
    API.transformAuditSearch(this.state.type, p)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('加载失败')
    })
    .finally(()=>this.setState({loading: false}))
  }
  render(){
    return (
      <MainContainer name="改造审核">
        <Search onSearch={this.search}></Search>
        <DisplayTable loading={this.state.loading}
          current={this.state.current}
          onChange={this.tableChange}
          audit={this.audit}
          data={this.state.tableList}></DisplayTable>
      </MainContainer>
    )
  }
}

export default PHTransformAudit
