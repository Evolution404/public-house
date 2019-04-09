import React, {Component} from 'react'
import css from '../../cssConfig'

class MainContainer extends Component{
  render(){
    return <div>
      <div style={{width: "114px",
        height: "37px",
        backgroundColor: "#4091f7",
        ...css.commonFontStyle,
        fontSize: "13px",
        lineHeight: "37px",
        textAlign: "center",
        marginLeft: "20px",
        boxSizing: "border-box",
      }}>{this.props.name}</div>
      <div style={{
        ...css.borderLight,
      }}>
        <div style={{paddingLeft: "20px",
          paddingTop: "10px",
          fontSize: "14px",
          fontWeight: "400",
          color: "#333",
        }}>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
export default MainContainer
