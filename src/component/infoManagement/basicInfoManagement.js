import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"
import Map from '../../routerMap'
import {Button,Form, Row, Col, message, Modal, Upload,
  Icon, Input} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {LButton, SButton} from '../common/button'
import Split from '../common/split'
import Table from '../common/table'
import {BuildingSelect, FloorSelect} from '../common/select'
const confirm = Modal.confirm
const Item = Form.Item


class Search extends Component{
  state = {
    building: '',
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSearch(values)
      }
    })
  }
  buildingChange = building=>{
    if(building!==this.state.building)
      this.setState({building})
    return building
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{span:10}} wrapperCol={{span:14}}>
        <Row>
          <Col span={6}>
            <Item label="楼宇名称">
              {getFieldDecorator('buildingName',{
                getValueFromEvent: this.buildingChange,
              })(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="楼层">
              {getFieldDecorator('floor',)(
                <FloorSelect
                  building={this.state.building}></FloorSelect>
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="房间号">
              {getFieldDecorator('roomNum',)(
                <Input></Input>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} offset={1} span={2}>
            <Button onClick={this.search} type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
Search = Form.create({ name: 'search' })(Search)

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
              <LButton text='从文件中导入'/>
            </Link>
          </div>
      </div></Router>
    )
  }
}
class DisplayTable extends Component{
  render(){
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '楼宇',
        dataIndex: 'building',
      },
      {
        title: '楼层',
        dataIndex: 'floor',
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
      },
      {
        title: '使用面积',
        dataIndex: 'useArea',
      },
      {
        title: '备注',
        dataIndex: 'note',
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
      formData.append('file', file);
    })
    formData.append('id', this.props.index)

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
          <Col offset={1} span={10}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" />选择文件
              </Button>
            </Upload>
          </Col>
          <Col span={10}>
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
    return (
      <Modal
        title="上传平面图"
        width="450px"
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
  state = {
    tableList: [], // 表格处的数据
    tableLoading: false,
    selected: [], // 被选中的数据, 数值代表的是在tableList中的位置
    filter: {},
    uploadModal: {
      visible: false,
      index: 0,
    }
  }
  search = (values)=>{
    this.setState({tableLoading: true, filter: values})
    API.filterPH(values)
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
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
          if(err.response)
            message.error(err.response.data.title)
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
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  // 根据当前填写的搜索信息获取后台数据
  refresh = ()=>{
    this.setState({selected:[], tableLoading: true})
    return API.filterPH(this.state.filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('获取失败, 请重试')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  render(){
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
      <Search onSearch={this.search}/>
      <Split/>
      <ButtonGroup {...groupHelper}/>
      <DisplayTable loading={this.state.tableLoading}
        data={this.state.tableList}
        onSelectedChange={this.selectedChange} {...tableHelper}/>
      <WrappedUploadModal {...this.state.uploadModal} close={this.closeUploadModal} />
    </MainContainer>
  }
}


export default PHManagement
