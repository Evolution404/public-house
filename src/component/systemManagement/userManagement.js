import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Button,Form, Row, Col, message, Modal, Select, Upload, Icon} from 'antd'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {TableUtil}from '../common/table'
import API from '../../api'
const Item = Form.Item
const confirm = Modal.confirm;

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
    const columns = TableUtil.mapColumns([
      '序号', '姓名', '登录账号', '所属部门', '角色'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
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
      API.addUser(values)
      .then(()=>{
        message.success('添加成功')
      })
      .catch(err=>{
        message.error('添加失败')
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="新增用户"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.add}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='登录账号'>
            {getFieldDecorator('loginAccount', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='姓名'>
            {getFieldDecorator('name', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='密码'>
            {getFieldDecorator('password', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='确认密码'>
            {getFieldDecorator('confirmPassword', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='所属部门'>
            {getFieldDecorator('dept', )(
              <Select></Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='角色'>
            {getFieldDecorator('role', )(
              <Select></Select>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedAddModal = Form.create({ name: 'addmodal' })(AddModal)


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
        index: this.props.index,
        // other data
        ...values,
      }
      API.changeUser(newData)
      .then(()=>{
        message.success('更新成功')
        form.resetFields()
        this.hideModal()
      })
      .catch(err=>{
        console.log(err)
        message.error('更新失败')
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="修改人员"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.change}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='登录账号'>
            {getFieldDecorator('loginAccount', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='姓名'>
            {getFieldDecorator('name', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='所属部门'>
            {getFieldDecorator('dept', )(
              <Select></Select>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='角色'>
            {getFieldDecorator('role', )(
              <Select></Select>
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
        title="导入用户信息"
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

class UserManagement extends Component{
  state = {
    name: '',
    tableList: [],
    selected: [],
    addmodal: {
      visible: false,
    },
    changemodal: {
      visible: false,
      index: 0,
    },
    importmodal: {
      visible: false,
    },
  }
  add = ()=>{
    this.setState({addmodal: {visible: true}})
  }
  search = ({name})=>{
    this.setState({
      name,
    })
    API.searchUser(name)
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
        return API.deleteUser(index)
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
  change = index=>{
    index = this.state.tableList[index].id
    this.setState({changemodal: {visible: true, index}})
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
  }
  closeChangeModal = ()=>{
    this.setState({changemodal: {visible: false, index:0}})
  }
  closeImportModal = ()=>{
    this.setState({importmodal: {visible: false}})
  }
  openImport = ()=>{
    this.setState({importmodal: {visible: true}})
  }
  render(){
    let tableHelper = {
      delete: this.delete,
      change: this.change,
    }
    return <MainContainer name="人员管理">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add} onDelete={this.delete} onImport={this.openImport}/>
      <Row>
        <Col span={20}>
          <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange} {...tableHelper}/>
        </Col>
      </Row>
      <WrappedAddModal {...this.state.addmodal} close={this.closeAddModal}/>
      <WrappedChangeModal {...this.state.changemodal} close={this.closeChangeModal}/>
      <ImportModal {...this.state.importmodal} close={this.closeImportModal}/>
    </MainContainer>
  }
}

export default UserManagement
