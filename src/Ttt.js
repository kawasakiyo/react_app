import './App.css'
import React from 'react'

class Ttt extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <h2> {this.props.message} </h2>
    );
  }
}


export default Ttt;
