import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Button,Form, Row, Col, message, Modal, InputNumber, Upload, Icon} from 'antd'
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
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="名称">
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
      '序号', '名称', '建筑面积', '建筑年代', '使用面积'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.update.bind(this,index)} text='修改'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.uploadPic.bind(this,index)} text='上传平面图'/>
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
      console.log('Received values of form: ', values)
    })
  }
  onFloorsChange = (e)=>{
    this.setState({buildingFloors: e})
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let picUploader = []
    for(let i=0;i < this.state.buildingFloors; i++){
      picUploader.push((
        <Item key={i} style={{marginBottom: '0px'}}  label={'楼层'+(i+1)+'图片'}>
          {getFieldDecorator('pic'+(i+1), )(
            <Upload>
              <Button>
                <Icon type="upload" />上传
              </Button>
            </Upload>
          )}
        </Item>
      ))
    }
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
          <Item style={{marginBottom: '0px'}}  label='楼宇层数'>
            {getFieldDecorator('buildingFloors', {initialValue: 0})(
              <InputNumber max={100} onChange={this.onFloorsChange} min={0}/>
            )}
          </Item>
          {picUploader}
        </Form>
      </Modal>
    )
  }
}
const WrappedAddModal = Form.create({ name: 'addmodal' })(AddModal)

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

class BuildingManagement extends Component{
  state = {
    name: '',
    tableList: [],
    selected: [],
    addmodal: {
      visible: false,
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
    API.searchBuilding(name)
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
          console.log(err)
          message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  update = index=>{
  }
  uploadPic = index=>{
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
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
      update: this.update,
      uploadPic: this.uploadPic,
    }
    return <MainContainer name="楼宇管理">
      楼宇管理
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add} onDelete={this.delete} onImport={this.openImport}/>
      <Row>
        <Col span={20}>
          <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange} {...tableHelper}/>
        </Col>
      </Row>
      <WrappedAddModal {...this.state.addmodal} close={this.closeAddModal}/>
      <ImportModal {...this.state.importmodal} close={this.closeImportModal}/>
    </MainContainer>
  }
}

export default BuildingManagement
