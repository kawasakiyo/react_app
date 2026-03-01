import './App.css'
import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOn: false
    };
    this.changeMouseFlag = this.changeMouseFlag.bind(this);
  }

  changeMouseFlag(bool){
    //console.log(bool);
    this.setState({
      mouseOn: bool
    });
  }

  render(){
    const back_color = (this.state.mouseOn ? {backgroundColor: '#ddd'} : {backgroundColor: '#fff'});

    return (
      <div className='Button'
        onMouseEnter={(e)=>this.changeMouseFlag(true)}
        onMouseLeave={(e)=>this.changeMouseFlag(false)}
        onClick={(e)=>this.props.parentFunc(e)}
        style={back_color}>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export default Button;
