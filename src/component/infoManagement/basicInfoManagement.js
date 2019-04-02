import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import {Button,Form, Row, Col, message, Modal, Upload, Icon} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {LButton, SButton} from '../common/button'
import Input from '../common/input'
import Split from '../common/split'
import Select from '../common/select'
import Table, {TableUtil}from '../common/table'
const Item = Form.Item
const confirm = Modal.confirm;
const Option = Select.Option


class Search extends Component{
  render(){
    return (
      <div style={{width:"900px",
        padding: '30px 30px 10px 30px',
      }}>
        <div style={{paddingBottom:'20px'}}>
          <Select name="楼宇名称" 
            onChange={this.props.buildingNameChange}/>
          <Input name="楼层" 
            onChange={this.props.floorChange}/>
          <Input name="房间号" 
            onChange={this.props.roomNumChange}/>
          <LButton onClick={this.props.refresh} text="搜索"/>
        </div>
      </div>
    )
  }
}

class ButtonGroup extends Component{
  render(){
    return (
      <Router><div style={{marginTop: '10px'}}>
          <div style={{padding: '10px', display: 'inline-block'}}>
            <Link to={Map.PHAddBrief.path}>
              <LButton text='+新增公用房'/>
            </Link>
          </div>
          <div style={{padding: '10px', display: 'inline-block'}}><LButton onClick={this.props.delete.bind(this, -1)} text='X删除'/></div>
          <div style={{padding: '10px', display: 'inline-block'}}><LButton onClick={this.props.refresh} text='刷新'/></div>
          <div style={{padding: '10px', display: 'inline-block'}}>
            <Link to={Map.PHImport.path}>
              <LButton text='从文件夹导入'/>
            </Link>
          </div>
      </div></Router>
    )
  }
}
class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '序号', '位置', '面积', '建立时间', '维护人'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <Router>
              <Link to={Map.PHChangeBrief.path.replace(':id', record.id)}>
                <SButton onClick={this.props.change.bind(this,index)} text='修改查看'/> 
              </Link>
            </Router>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.upload.bind(this,index)} text='上传图纸'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

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
    formData.append('index', this.props.index)

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

class UploadModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  upload = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="上传平面图"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Import index={this.props.index}
          templateLink=''
          uploadHelper={API.ULDrawings}
        ></Import>
      </Modal>
    )
  }
}
const WrappedUploadModal = Form.create({ name: 'upload_modal' })(UploadModal)



class PHManagement extends Component{
  constructor(props){
    super(props)
    this.state = {
      // 以下数据是搜索组件需要的数据, 使用双向数据绑定
      buildingName: '',
      roomNum: '',
      floor: '',
      tableList: [], // 表格处的数据
      selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
      uploadModal: {
        visible: false,
        index: 0,
      }
    }
  }
  buildingNameChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  roomNumChange = (e)=>{
    this.setState({
      roomNum: e.target.value
    })
  }
  floorChange = (e)=>{
    this.setState({
      floor: e.target.value
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
      title: '删除',
      content: '确定要删除这条记录吗?',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deletePH(index)
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
  // 上传条目处理函数
  upload = (index)=>{
    index = this.state.tableList[index].id
    this.setState({uploadModal: {visible: true, index}})
  }
  closeUploadModal = ()=>{
    this.setState({uploadModal: {visible: false, index:0}})
  }
  // 修改条目处理函数
  change = (index)=>{

  }
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    let filter = {
      buildingName: this.state.buildingName,
      floor: this.state.floor,
      roomNum: this.state.roomNum,
    }
    return API.filterPH(filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('获取失败, 请重试')
    })
  }
  render(){
    let changeListener = {
      buildingNameChange: this.buildingNameChange,
      roomNumChange: this.roomNumChange,
      floorChange: this.floorChange,
      refresh: this.refresh,
    }
    let tableHelper = {
      delete: this.delete,
      upload: this.upload,
      change: this.change,
    }
    let groupHelper = {
      delete: this.delete,
      refresh: this.refresh,
    }
    return <MainContainer name="信息管理">
      基本信息
      <Search {...changeListener}/>
      <Split/>
      <ButtonGroup {...groupHelper}/>
      <DisplayTable data={this.state.tableList} onSelectedChange={this.selectedChange} {...tableHelper}/>
      <WrappedUploadModal {...this.state.uploadModal} close={this.closeUploadModal} />
    </MainContainer>
  }
}


export default PHManagement
