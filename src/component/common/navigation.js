import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";

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
    let NavData = this.props.data
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
