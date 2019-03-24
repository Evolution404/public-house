import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'

class Import extends Component{
  render(){
    return (
      <div>
        <h2>导入教学单位工作量</h2>
      </div>
    )
  }
}

class DataImport extends Component{
  render(){
    return <MainContainer name="公用房管理">
      基本信息/导入公用房信息
      <h2 style={{textAlign:'center'}}>导入公用房信息</h2>
      <Split/>
      <Import></Import>
    </MainContainer>
  }
}

export default DataImport
