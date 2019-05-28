import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Button,Form, Row, Col, message, Modal, InputNumber, Upload, Icon, Select} from 'antd'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {sorterParse}from '../common/table'
import API from '../../api'
import moban from '../mobaninfo'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'
const Option = Select.Option
const Item = Form.Item
const confirm = Modal.confirm;

class Search extends Component{
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
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="名称">
              {getFieldDecorator('name',{
                initialValue: this.props.name,
              })(
                <Input placeholder="请输入楼宇名称"/>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <TButton.SearchButton type='primary' htmlType='submit'>搜索</TButton.SearchButton>
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
      <Row style={{margin: '20px 30px'}}>
        <TButton.AddButton onClick={this.props.onAdd} type="primary">新增</TButton.AddButton>
        <TButton.DelButton disabled={!this.props.selected||this.props.selected.length===0}
          onClick={this.props.onDelete.bind(this, -1)} type="primary">删除</TButton.DelButton>
        <TButton.ImButton
          style={{width: 140}}
          onClick={this.props.onImport} type="primary">从文件导入</TButton.ImButton>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    const columns = [
      {
        title:'楼宇名称',
        dataIndex: 'buildingName',
        sorter:true,
      },
      {
        title:'楼层数',
        dataIndex: 'buildingFloors',
        sorter:true,
      },
      {
        title:'建筑面积',
        dataIndex: 'buildingArea',
        sorter:true,
      },
      {
        title:'建筑年代',
        dataIndex: 'buildingTime',
        sorter:true,
      },
      {
        title:'备注',
        dataIndex: 'note',
      },
    ]
    columns.push({
      title: '操作',
      width: 300,
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,record)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.update.bind(this,record)} text='修改'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.uploadPic.bind(this,record)} text='上传平面图'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class AddModal extends Component {
  state = {
    buildingFloors: 0,
  }
  hideModal = () => {
    this.props.close()
  }
  add = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      API.addBuilding(values)
      .then(()=>{
        message.success('添加成功')
        this.hideModal()
        this.props.refresh()
      })
      .catch(err=>{
       if(!err.resolved)
        message.error('添加失败')
     })
   })
 }
 render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="添加楼宇"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.add}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='楼宇名称'>
            {getFieldDecorator('buildingName', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='建筑面积'>
            {getFieldDecorator('buildingArea', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='建筑年代'>
            {getFieldDecorator('buildingTime', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='备注'>
            {getFieldDecorator('note', )(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='楼宇层数'>
            {getFieldDecorator('buildingFloors', {initialValue: 0})(
              <InputNumber max={100} min={0}/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedAddModal = Form.create({ name: 'addmodal' })(AddModal)

class UpdateModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  update = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values = {
        id: this.props.data.id,
        ...values,
      }
      API.updateBuilding(values)
      .then(()=>{
        message.success('更新成功')
        this.hideModal()
        this.props.refresh()
      })
      .catch(err=>{
       if(!err.resolved)
        message.error('更新失败')
     })
   })
 }
 render() {
    const { getFieldDecorator } = this.props.form
    let data = this.props.data
    return (
      <Modal
        title="修改楼宇信息"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.update}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='楼宇名称'>
            {getFieldDecorator('buildingName', {initialValue: data.buildingName})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='建筑面积'>
            {getFieldDecorator('buildingArea', {initialValue: data.buildingArea})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='建筑年代'>
            {getFieldDecorator('buildingTime', {initialValue: data.buildingTime})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='备注'>
            {getFieldDecorator('note', {initialValue: data.note})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='楼宇层数'>
            {getFieldDecorator('buildingFloors', {initialValue: data.buildingFloors})(
              <InputNumber max={100} min={0}/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedUpdateModal = Form.create({ name: 'updatemodal' })(UpdateModal)

class Import extends Component{
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    })
    this.setState({
      uploading: true,
    })
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
      })
      if(!err.resolved)
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
    }

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
      templateLink: moban('louyu'),
    }
    return (
      <Modal
        title="导入楼宇信息"
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
class UploadModal extends Component {
  state = {
    fileList: [],
    uploading: false,
  }
  hideModal = () => {
    this.props.close()
  }
  handleUpload = () => {
    let form = this.props.form
    form.validateFields((err, values)=>{
      if(err) return
      const { fileList } = this.state;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file);
      })
      this.setState({
        uploading: true,
      })
      formData.append('louceng', values.floor)
      formData.append('louyumingcheng', this.props.data.buildingName)
      API.ULFloorPlan(formData)
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
        })
        if(!err.resolved)
          message.error('上传失败');
      })
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
    }
    const { getFieldDecorator } = this.props.form
    let floorOptions = []
    for(let i =0;i < this.props.data.buildingFloors;i++){
      floorOptions.push(<Option key={i+1} value={i+1}>{i+1}</Option>)
    }
    return (
      <Modal
        title="上传平面图"
        width="600px"
        visible={this.props.visible}
        closable={false}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Item labelCol={{span:4}} wrapperCol={{span:6}} style={{marginBottom: '0px'}} label='楼层'>
            {getFieldDecorator('floor', {
              rules: [{ required: true, message: '请选择楼层' }],
            })(
              <Select placeholder="请选择楼层">
                {floorOptions}
              </Select>
            )}
          </Item>
          <Row>
            <Col span={12}>
              <Item labelCol={{span:8}} wrapperCol={{span:12}} style={{marginBottom: '0px'}} label='请选择图片'>
                {getFieldDecorator('buildingFloorPic', )(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" />选择图片
                  </Button>
                </Upload>
                )}
              </Item>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
              >
                {uploading ? '导入中' : '开始导入' }
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}
UploadModal = Form.create({ name: 'upload_modal' })(UploadModal)

class BuildingManagement extends Component{
  state = {
    isSearched: false,
    name: '',
    tableLoading: false,
    tableList: [],
    selected: [],
    addmodal: {
      visible: false,
    },
    updatemodal: {
      visible: false,
      data: {},
    },
    importmodal: {
      visible: false,
    },
    uploadmodal: {
      visible: false,
      data: {},
    },
    current: 0,
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  add = ()=>{
    this.setState({addmodal: {visible: true}})
  }
  search = ({name})=>{
    this.setState({
      name,
      isSearched: true,
      current: 1,
    })
    this.setState({tableLoading: true})
    API.searchBuilding(name)
    .then(rs=>{
      this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
     if(!err.resolved)
       message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  refresh = ()=>{
    API.searchBuilding(this.state.name, this.state.page)
    .then(rs=>{
      this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
     if(!err.resolved)
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
    if(index!==-1)
      index=[index.id]
    else{
      index = this.state.selected.map(i=>i.id)
    }
    let self = this
    confirm({
      title: '删除楼宇信息',
      content: '删除操作会造成信息丢失，您确定要删除吗？',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deleteBuilding(index)
        .then(()=>{
          message.success('删除成功')
         self.refresh()
       })
       .catch(err=>{
         if(!err.resolved)
           message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  update = record=>{
    this.setState({updatemodal: {visible: true, data: record}})
  }
  uploadPic = record=>{
    this.setState({uploadmodal: {visible: true, data: record}})
  }
  closeUploadModal = ()=>{
    this.setState({uploadmodal: {visible: false, data:{}}})
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
  }
  closeUpdateModal = ()=>{
    this.setState({updatemodal: {visible: false, data:{}}})
  }
  closeImportModal = ()=>{
    this.setState({importmodal: {visible: false}})
  }
  openImport = ()=>{
    this.setState({importmodal: {visible: true}})
  }
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page: p, current: p.current})
    API.searchBuilding(this.state.name, p,sorterParse({},s))
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
  render(){
    let tableHelper = {
      delete: this.delete,
      update: this.update,
      uploadPic: this.uploadPic,
    }
    return <MainContainer name="楼宇管理">
      <WrappedSearch name={this.state.name} onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add}
        selected={this.state.selected}
        onDelete={this.delete} onImport={this.openImport}/>
      <DisplayTable
        current={this.state.current}
        onChange={this.tableChange}
        data={this.state.tableList}
        loading={this.state.tableLoading}
        onSelectedChange={this.selectedChange} {...tableHelper}/>
      <WrappedAddModal refresh={this.refresh} {...this.state.addmodal} close={this.closeAddModal}/>
      {
        this.state.updatemodal.visible&&(
          <WrappedUpdateModal refresh={this.refresh} {...this.state.updatemodal} close={this.closeUpdateModal}/>
        )
      }
      <ImportModal {...this.state.importmodal} close={this.closeImportModal}/>
      <UploadModal {...this.state.uploadmodal} close={this.closeUploadModal}/>
    </MainContainer>
  }
}

export default BuildingManagement
