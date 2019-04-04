import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Empty,Button,Form, Row, Col, message, Modal, Select, Upload, Icon} from 'antd'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table from '../common/table'
import API from '../../api'
const Item = Form.Item
const confirm = Modal.confirm;
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
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="姓名">
              {getFieldDecorator('name',)(
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
          <Col offset={1} span={4}><Button block onClick={this.props.onAdd} type="primary">+新增</Button></Col>
          <Col offset={1} span={4}><Button block onClick={this.props.onDelete.bind(this, -1)} type="primary">X删除</Button></Col>
          <Col offset={1} span={4}><Button block onClick={this.props.onImport} type="primary">从文件导入</Button></Col>
        </Col>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '工号',
        dataIndex: 'workNum',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '职称级别',
        dataIndex: 'proTitleLevel',
      },
      {
        title: '职务级别',
        dataIndex: 'dutyGrade',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
    ]
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
            <SButton onClick={this.props.change.bind(this,index)} text='修改'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class AddModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  add = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      API.addPersonnel(values)
      .then(()=>{
        message.success('添加成功')
        this.props.refresh()
        this.hideModal()
      })
      .catch(err=>{
        message.error('添加失败')
        if(err.response)
          message.error(err.response.data.title)
      })

    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="新增人员"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.add}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='工号'>
            {getFieldDecorator('workNum', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='姓名'>
            {getFieldDecorator('name', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='职务级别'>
            {getFieldDecorator('dutyGrade', )(
              <Select>
                <Option value='校级'>校级</Option>
                <Option value='院士'>院士</Option>
                <Option value='高端人才'>高端人才</Option>
                <Option value='优秀人才'>优秀人才</Option>
                <Option value='外聘高端'>外聘高端</Option>
                <Option value='正高级职称'>正高级职称</Option>
                <Option value='正处级'>正处级</Option>
                <Option value='副处级职称'>副处级职称</Option>
                <Option value='副处级'>副处级</Option>
                <Option value='其他'>其他</Option>
              </Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='职称级别'>
            {getFieldDecorator('proTitleLevel', )(
              <Select>
                <Option value='校级'>校级</Option>
                <Option value='院士'>院士</Option>
              </Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='所属部门'>
            {getFieldDecorator('dept', )(
              <Select>
                <Option value="学院">学院</Option>
                <Option value="部处">部处</Option>
              </Select>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedAddModal = Form.create({ name: 'addmodal' })(AddModal)

class DisplayLabel extends Component{
  render(){
    return (
      <div style={{padding: '5px 0', fontWeight: '700'}}>
        <Row>
          <Col span={12}>{this.props.label}</Col>
          <Col span={12}>{this.props.value}</Col>
        </Row>
      </div>
    )
  }
}

class DetailModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  render() {
    let data = this.props.data
    return (
      <Modal
        title="人员详细信息"
        width="400px"
        visible={this.props.visible}
        closable={false}
        footer={[
            <Button key='1' type="primary" onClick={this.hideModal}>确定</Button>
          ]}
      >
          <DisplayLabel label="工号" value={data.workNum}/>
          <DisplayLabel label="姓名" value={data.name}/>
          <DisplayLabel label="职称级别" value={data.proTitleLevel}/>
          <DisplayLabel label="职务级别" value={data.dutyGrade}/>
      </Modal>
    )
  }
}

class ChangeModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  change = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      let newData = {
        id: this.props.id,
        // other data
        ...this.props.data,
        ...values,
      }
      API.changePersonnel(newData)
      .then(()=>{
        message.success('更新成功')
        form.resetFields()
        this.props.refresh()
        this.hideModal()
      })
      .catch(err=>{
        console.log(err)
        message.error('更新失败')
        if(err.response)
          message.error(err.response.data.title)
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let data = this.props.data
    return (
      <Modal
        title="修改人员信息"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.change}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='工号'>
            {getFieldDecorator('workNum', {initialValue: data.workNum})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='姓名'>
            {getFieldDecorator('name', {initialValue: data.name})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='职务级别'>
            {getFieldDecorator('dutyGrade', {initialValue:data.dutyGrade})(
              <Select>
                <Option value='校级'>校级</Option>
                <Option value='院士'>院士</Option>
                <Option value='高端人才'>高端人才</Option>
                <Option value='优秀人才'>优秀人才</Option>
                <Option value='外聘高端'>外聘高端</Option>
                <Option value='正高级职称'>正高级职称</Option>
                <Option value='正处级'>正处级</Option>
                <Option value='副处级职称'>副处级职称</Option>
                <Option value='副处级'>副处级</Option>
                <Option value='其他'>其他</Option>
              </Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='职称级别'>
            {getFieldDecorator('proTitleLevel', {initialValue: data.proTitleLevel})(
              <Select>
                <Option value='校级'>校级</Option>
                <Option value='院士'>院士</Option>
              </Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='所属部门'>
            {getFieldDecorator('dept', {initialValue: data.dept})(
              <Select>
                <Option value="学院">学院</Option>
                <Option value="部处">部处</Option>
              </Select>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedChangeModal = Form.create({ name: 'changemodal' })(ChangeModal)

class Import extends Component{
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    this.props.uploadHelper(formData)
    .then(()=>{
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success('上传成功');
    })
    .catch(err=>{
      this.setState({
        uploading: false,
      });
      message.error('上传失败');
    })
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div style={{margin: '20px 0'}}>
        <h3>{this.props.text}</h3>
        <Row style={{marginTop: 15}}>
          <Col offset={1} span={8}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" />选择文件
              </Button>
            </Upload>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? '导入中' : '开始导入' }
            </Button>
          </Col>
          <Col style={{marginTop: 8}}>
            <a download href={this.props.templateLink}>导入模板下载</a>
          </Col>
        </Row>
      </div>
    );
  }
}

class ImportModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  render() {
    let uploadInfo = {
      uploadHelper: API.ULBuildings,
      templateLink: '',
    }
    return (
      <Modal
        title="导入使用者信息"
        width="600px"
        visible={this.props.visible}
        closable={false}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Import {...uploadInfo}></Import>
      </Modal>
    )
  }
}

class TheUserManagement extends Component{
  state = {
    isSearched: false,
    name: '',
    tableList: [],
    selected: [],
    addmodal: {
      visible: false,
    },
    detailmodal: {
      visible: false,
      data: [],
    },
    changemodal: {
      visible: false,
      id: 0,
      data: {},
    },
    importmodal: {
      visible: false,
    },
  }
  closeImportModal = ()=>{
    this.setState({importmodal: {visible: false}})
  }
  openImport = ()=>{
    this.setState({importmodal: {visible: true}})
  }
  add = ()=>{
    this.setState({addmodal: {visible: true}})
  }
  search = ({name})=>{
    this.setState({
      name,
      isSearched: true,
    })
    API.searchPersonnel(name)
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
  refresh = ()=>{
    API.searchPersonnel(this.state.name)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('刷新失败')
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
      title: '删除人员信息',
      content: '删除操作会造成人员信息丢失，您确定要删除人员信息吗？',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deletePersonnel(index)
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
    API.detailPersonnel(index)
    .then(rs=>{
      this.setState({detailmodal: {visible: true, data:rs}})
    })
    .catch(err=>{
      console.log(err)
      message.error('获取详细信息失败')
    })
  }
  change = index=>{
    let id = this.state.tableList[index].id
    this.setState({changemodal: {visible: true, id,
                  data:this.state.tableList[index]}})
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
  }
  closeDetailModal = ()=>{
    this.setState({detailmodal: {visible: false, data: []}})
  }
  closeChangeModal = ()=>{
    this.setState({changemodal: {visible: false, id:0, data: {}}})
  }
  render(){
    let tableHelper = {
      delete: this.delete,
      detail: this.detail,
      change: this.change,
    }
    return <MainContainer name="人员管理">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add} onDelete={this.delete} onImport={this.openImport}/>
      <Row>
        <Col span={20}>
          {this.state.isSearched?(
            <DisplayTable
              data={this.state.tableList}
              onSelectedChange={this.selectedChange} {...tableHelper}/>
          ):(
            <Empty description="请先搜索"></Empty>
          )}
        </Col>
      </Row>
      <WrappedAddModal refresh={this.refresh}
        {...this.state.addmodal} close={this.closeAddModal}/>
      <DetailModal {...this.state.detailmodal} close={this.closeDetailModal}/>
      <WrappedChangeModal refresh={this.refresh}{...this.state.changemodal} close={this.closeChangeModal}/>
      <ImportModal refresh={this.refresh} {...this.state.importmodal} close={this.closeImportModal}/>
    </MainContainer>
  }
}

export default TheUserManagement
