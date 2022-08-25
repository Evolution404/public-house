import React from 'react'
import {createHashHistory} from 'history'
import {Icon} from 'antd'
const history = createHashHistory()

function Back(){
  //return <Button shape="circle" icon="left-circle" onClick={()=>{history.goBack()}}></Button>
  return <span style={{fontSize: 25,cursor: 'pointer'}}
    onClick={()=>{history.goBack()}}><Icon type="left-circle"></Icon></span>
}

export default Back
