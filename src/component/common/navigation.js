import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'

import css from '../../cssConfig.js'

function Top(){
  return (
    <div style={{width: "238px",
      height: "39px",
      backgroundColor: css.green,
      bodrder: css.border,
    }}>
      <p style={{...css.commonFontStyle,
        lineHeight: "39px",
        textAlign: "center"}
      }>系统导航</p>
    </div>
  )
}

class NavCeilTop extends Component{
  render(){
    return (
      <div style={{height: "36px",
        backgroundColor: css.cyan,
        ...css.borderDeep,
      }}>
        <div style={{width: "213px",
          padding: "4px 52px"
        }}>
          <img style={{width: "28px",
            height: "28px",
          }} src={this.props.img} alt="" />
          <div style={{fontWeight: 400,
            fontSize:"13px",
            color: "#333",
            width: "70px",
            float: "right",
            paddingTop: "3px"
          }}>{this.props.text}</div>
        </div>
      </div>
    )
  }
}

class NavCeilList extends Component{
  render(){
    return <Router>
      <ol style={{...css.commonFontStyle}}>
        {this.props.list.map((l,index)=>
          <Link key={index} to={l.path}>
            <li style={{margin: "6px 50px",
              color: "#333"
            }}>{l.name}</li>
          </Link>)}
      </ol>
    </Router>
  }
}

class NavCeil extends Component{
  render(){
    let data = this.props.data
    return (
      <div>
        <NavCeilTop img={data.img} text={data.text}/>
        <div style={{...css.borderLight}}>
          <NavCeilList list={data.list}/>
        </div>
      </div>
    )
  }
}


class Navigation extends Component{
  render(){
    let NavData = [
      {
        img: "/images/1.png",
        text: "信息管理",
        list:[Map.BasicInfoManagement, Map.PHList, Map.PHAdd, Map.PHChange, Map.PHAudit, Map.MyPH]
      },
      {
        img: "/images/2.png",
        text: "统计查询",
        list:[Map.ConditionQuery, Map.BuildingQuery]
      },
      {
        img: "/images/3.png",
        text: "核算管理",
        list:[Map.OverallAccount, Map.DepartmentAccount]
      },
      {
        img: "/images/4.png",
        text: "绩效管理",
        list:[Map.DataImport, Map.CheckWorkload, Map.TeachingUnitPerformance, Map.CyclePerformance, Map.BusinessPerformance, Map.LabPerformance, Map.ClassroomPerformance]
      },
      {
        img: "/images/5.png",
        text: "动态监测",
        list:[Map.RealtimeMonitor, Map.MonitorStatistics]
      },
      {
        img: "/images/6.png",
        text: "会议室管理",
        list:[Map.MeetingRoomReservation, Map.ReservationAudit, Map.MyAudit, Map.UseStatistical]
      },
      {
        img: "/images/7.png",
        text: "公寓管理",
        list:[Map.ARealtimeMonitor, Map.AMonitorStatistics]
      },
      {
        img: "/images/8.png",
        text: "系统管理",
        list: [Map.DeptManagement, Map.SystemParm, Map.BuildingManagement, Map.TheUserManagement, Map.UserManagement]
      },
    ]
    let ceilList = NavData.map((ceil, index) => {
      return <NavCeil key={index} data={ceil}/>
    })
    return (
      <div style={{width: "238px", backgroundColor: "#f8fdfd"}}>
        <div style={{padding: "7px 0"}}><Top/></div>
        {ceilList}
      </div>
    )
  }
}

export default Navigation
