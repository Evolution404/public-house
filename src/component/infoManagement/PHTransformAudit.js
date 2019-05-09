import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"
import Map from '../../routerMap'
import {UsingNatureBrief} from '../common/usingNature'
import {Form, Row, Col, Button, message} from 'antd'
import Table, {sorterParse} from '../common/table'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import API from '../../api'
import {read, write} from '../stateHelper'

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
      <Form labelCol={{span:12}} wrapperCol={{span:12}} style={{marginTop: 20}}>
        <Row>
          <Col span={6}>
            <Item label="使用性质">
              {getFieldDecorator('type',{
                initialValue:this.props.initialValue,
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
        sorter: true,
      },
      {
        title: '楼宇',
        dataIndex: 'louyu',
        sorter: true,
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
        sorter: true,
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
        sorter: true,
      },
      {
        title: '改造审批状态',
        dataIndex: 'gaizaoshenpizhuangtai',
        sorter: true,
        render: (text)=>{
          if(text === 0||text==='0'){
            return '审批驳回'
          }
          else if(text>0&&text < 5){
            return '审批中'
          }else if (text ===5||text==='5' ){
            return '审批通过'
          }else if(text===100||text==='100'){
            return '不是改造公用房'
          }else
            return ''

        }
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <Router>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <Link to={Map.PHAuditDetail.path.replace(':id', this.props.type+'-'+record.id+'-transform')}>
                <SButton
                  disable={!(record.gaizaoshenpizhuangtai>0&&record.gaizaoshenpizhuangtai < 5)} text='开始审批'/>
              </Link>
            </div>
          </Router>
          /*<div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton
                onClick={this.props.audit.bind(this, record.id, 1)} text='通过'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton
                onClick={this.props.audit.bind(this, record.id, 0)} text='驳回'/>
            </div>
          </div>*/
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
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  audit = (id, shenpi)=>{
    API.transformAudit({
      leixing: parseInt(this.state.type),
      id, shenpi,
    })
    .then(()=>{
      message.success('操作成功')
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
    let filter = {
      type: this.state.type,
    }
    API.transformAuditSearch(filter)
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
    API.transformAuditSearch({type})
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
  tableChange = (p, s)=>{
    this.setState({loading: true, page:p, current: p.current})
    let filter = {
      type: this.state.type,
    }
    API.transformAuditSearch(sorterParse(filter, s), p)
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
        <Search 
          initialValue={this.state.type}
          onSearch={this.search}></Search>
        <DisplayTable loading={this.state.loading}
          type={this.state.type}
          current={this.state.current}
          onChange={this.tableChange}
          audit={this.audit}
          data={this.state.tableList}></DisplayTable>
      </MainContainer>
    )
  }
}

export default PHTransformAudit
