import React, {Component} from 'react'
import { Upload, Icon, Modal, message} from 'antd'
import {host} from '../../api/apiConfig'

// 必传onRemove 参数是图片的id 向后台发请求
// 可选fileList, 默认展示的图片

class MyUpload extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: (this.props.fileList?
    this.props.fileList.map(({id, tupianlujing})=>({uid:id,
                                                   url:host+tupianlujing})):[])
  }
  componentWillMount(){
    if(this.props.value&&this.props.value.length>0)
      this.setState({fileList: this.props.value})
  }

  componentWillReceiveProps(nextProps){
    if(this.props.defaultIsFile&&nextProps.value)
      this.setState({fileList: nextProps.value})
  }
  handleCancel = () => this.setState({ previewVisible: false })
  beforeUpload = (file) => {
    this.setState(state => ({
      fileList: [...state.fileList, file],
    }));
    return false;
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  onRemove = (file)=>{
    if(this.props.disableRemove){
      message.error('暂不支持删除')
      return false
    }
    if(file.url&&this.props.onRemove){
      return new Promise((resolve, reject)=>{
        this.props.onRemove(file.uid)
        .then(()=>{
          this.setState((state) => {
              const index = state.fileList.indexOf(file)
              const newFileList = state.fileList.slice()
              newFileList.splice(index, 1);
              if(this.props.defaultIsFile)
                this.props.onChange(newFileList)
              else
                this.props.onChange(newFileList.map(i=>i['originFileObj']))
              return {
                fileList: newFileList,
            }
          })
          resolve()
        })
        .catch(()=>{reject()})
      })
    }
    this.setState((state) => {
        const index = state.fileList.indexOf(file)
        const newFileList = state.fileList.slice()
        newFileList.splice(index, 1);
        let withoutBackImg = newFileList.filter(i=>!i.url)
        this.props.onChange(withoutBackImg.map(i=>i['originFileObj']))
        return {
          fileList: newFileList,
      }
    })
  }

  handleChange = ({fileList}) => {
    this.setState({fileList})
    fileList = fileList.filter(i=>!i.url)
    if(this.props.defaultIsFile)
      this.props.onChange(fileList)
    else
      this.props.onChange(fileList.map(i=>i['originFileObj']))
  }
  render(){
    const { previewVisible, previewImage, fileList } = this.state
    return (
      <div>
        <Upload {...this.props}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          listType='picture-card'>
          <div>
            <Icon type="plus" />
          <div className="ant-upload-text">上传</div>
        </div>
        </Upload>
        <Modal width="40%" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default MyUpload
