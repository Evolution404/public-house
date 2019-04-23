import React, {Component} from 'react'
import {Upload, Button, Icon, message, Row, Col} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'

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
      if(err.response)
        message.error(err.response.data.title)
      else
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
          <Col offset={1} span={4}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" />选择文件
              </Button>
            </Upload>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? '导入中' : '开始导入' }
            </Button>
          </Col>
          <Col style={{marginTop: 5}}>
            <a download href={this.props.templateLink}>导入模板下载</a>
          </Col>
        </Row>
      </div>
    );
  }
}

class DataImport extends Component{
  render(){
    let infoList = [
      {
        text: '导入教学单位工作量',
        uploadHelper: API.ULTeachingUnitWorkLoad,
        templateLink: '',
      },
      {
        text: '导入科研单位工作量',
        uploadHelper: API.ULScientificUnitWorkLoad,
        templateLink: '',
      },
      {
        text: '导入规范分',
        uploadHelper: API.ULSpecificationPoints,
        templateLink: '',
      },
      {
        text: '导入教室承担课程信息',
        uploadHelper: API.ULClassroom,
        templateLink: '',
      },
    ]
    return <MainContainer name="公用房管理">
      基本信息/导入公用房信息
      <h2 style={{textAlign:'center'}}>导入公用房信息</h2>
      <Split/>
      {infoList.map((item, index)=>(
        <Import {...item} key={index}></Import>
      ))}
    </MainContainer>
  }
}

export default DataImport
