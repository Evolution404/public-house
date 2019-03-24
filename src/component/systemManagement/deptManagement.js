import React, {Component} from 'react'
import {Input, Button,Form, Row, Col, message, Modal} from 'antd'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {TableUtil}from '../common/table'
import API from '../../api'
const Item = Form.Item
const confirm = Modal.confirm;

class DisplayLabel extends Component{
  render(){
    return (
      <div style={{padding: '5px 0', fontWeight: '700'}}>
        <Row>
          <Col span={10}>{this.props.label}</Col>
          <Col span={10}>{this.props.value}</Col>
        </Row>
      </div>
    )
  }
}

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
      <Row style={{margin: '20px 0'}}>
        <Col span={13}>
          <Col offset={1} span={4}><Button block type="primary">+新增</Button></Col>
          <Col offset={1} span={4}><Button block type="primary">X删除</Button></Col>
          <Col offset={1} span={4}><Button block type="primary">从文件导入</Button></Col>
        </Col>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '序号', '单位名称', '本科生', '博士', '硕士', '博士后'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.detail.bind(this,index)} text='详细'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.update.bind(this,index)} text='更新'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class DetailModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  render() {
    let data = this.props.data
    // {
    //    deptName(部门名称), zj(正局级), fj(副局级)
    //    zc(正处级), fc(副处级), uc(处级以下u-under)
    //    academician(院士), tT(高端人才, t-top T-talent)
    //    eT(优秀人才 e-excellent), zg(正高级), fg(副高级)
    //    middle(中级职称), other(其他职称), 
    //    undergraduate(本科生数), doctor(博士生数),
    //    masterDegree(硕士生数), postdoctoral(博士后数)
    // }
    return (
      <Modal
        title="部门详细信息"
        width="700px"
        visible={this.props.visible}
        closable={false}
        footer={[
            <Button type="primary" onClick={this.hideModal}>确定</Button>
          ]}
      >
        <Row><Col span={12}>
          <DisplayLabel label="部门名称" value="计算机与软件学院"/>
        </Col></Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="副校级(正局级)" value={data.zj}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="副校级(副局级)" value={data.fj}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="正处级" value={data.zc}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="副处级" value={data.fc}/>
          </Col>
        </Row>
        <Row><Col span={12}>
          <DisplayLabel label="处级以下" value={data.uc}/>
        </Col></Row>
        <Row><Col span={20} style={{textAlign: 'center'}}><h4>学院部门</h4></Col></Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="院士数" value={data.academician}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="高端人才" value={data.tT}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="优秀人才" value={data.eT}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="正高级职称" value={data.zg}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="副高级职称" value={data.fg}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="中级职称" value={data.middle}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="其他职称" value={data.other}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="本科生数" value={data.undergraduate}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="博士生数" value={data.doctor}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="硕士生数" value={data.masterDegree}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="博士后数" value={data.postdoctoral}/>
          </Col>
        </Row>
      </Modal>
    )
  }
}

class UpdateModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  updata = ()=>{
    let newData = {
      index: this.props.index,
      // other data
    }
    API.updateDept(newData)
    .then(()=>{
      message.success('更新成功')
      this.hideModal()
    })
    .catch(err=>{
      console.log(err)
      message.success('更新失败')
    })
  }
  render() {
    return (
      <Modal
        title="更新部门信息"
        width="700px"
        visible={this.props.visible}
        closable={false}
        onOk={this.updata}
        onCancel={this.hideModal}
      >
        <Form>
          <Item>

          </Item>
        </Form>
      </Modal>
    )
  }
}

class DeptManagement extends Component{
  constructor(props){
    super(props)
    this.state = {
      deptName: '',
      tableList: [{id:1}],
      detailmodal: {
        visible: false,
        data: [],
      },
      updatemodal: {
        visible: false,
        index: 0,
      },
    }
  }
  search = ({deptName})=>{
    this.setState({
      deptName,
    })
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  // 删除条目处理函数
  delete = (index)=>{
    // 转换index为一个list
    // index大于等于0, 说明是删除单条记录 index不变
    // index为-1 说明是删除多条记录, 从state中取到被选中的数据
    index = index===-1?this.state.selected:[index]
    index = index.map(i=>this.state.tableList[i].id)
    let self = this
    confirm({
      title: '删除部门信息',
      content: '删除操作会造成单位信息丢失，您确定要删除单位信息吗？',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deleteDept(index)
        .then(()=>{
          message.success('删除成功')
          self.refresh()
        })
        .catch(err=>{
          console.log(err)
          message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  detail = index=>{
    index = this.state.tableList[index].id
    API.detailDept(index)
    .then(rs=>{
      this.setState({detailmodal: {visible: true, data:rs}})
    })
    .catch(err=>{
      console.log(err)
      message.error('获取详细信息失败')
    })
  }
  closeDetailModal = ()=>{
    this.setState({detailmodal: {visible: false, data:{}}})
  }
  closeUpdateModal = ()=>{
    this.setState({updatemodal: {visible: false, index:0}})
  }
  update = index=>{
    index = this.state.tableList[index].id
    this.setState({updatemodal: {visible: true, index}})
  }
  refresh = ()=>{
    API.searchDept(this.state.deptName)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  render(){
    let tableHelper = {
      delete: this.delete,
      detail: this.detail,
      update: this.update,
    }
    return <MainContainer name="部门管理">
      部门管理
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup/>
      <Row>
        <Col span={20}>
          <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange} {...tableHelper}/>
        </Col>
      </Row>
      <DetailModal {...this.state.detailmodal} close={this.closeDetailModal}/>
      <UpdateModal {...this.state.updatemodal} close={this.closeUpdateModal}/>
    </MainContainer>
  }
}

export default DeptManagement
