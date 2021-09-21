import './App.css'
import React from 'react'

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reseted: true,
      clicking: false,
      above: false,
      lastX: -1,
      lastY: -1
    };

    this.draw = this.draw.bind(this);
    this.setclickflag = this.setclickflag.bind(this);
  }

  resetCanvas(){
    const canvas = document.querySelector('.Canvas');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      //ctx.fillStyle = "#ffffff";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('reset!');

      this.setState({reseted: true});
    }
  }

  getCanvas(){
    const canvas = document.querySelector('.Canvas');
    return canvas.getContext('2d').canvas;
  }

  setclickflag(event, bool){
    //console.log("change click-flag");
    var ntv_event = event.nativeEvent;
    if (ntv_event.button === 0) {
      this.setState({
        clicking: bool
      });
    }
  }

  // setaboveflag(event, bool){
  //   console.log("change above-flag");
  //   var ntv_event = event.nativeEvent;
  //   if (ntv_event.button === 0) {
  //     this.setState({
  //       above: bool
  //     });
  //   }
  // }

  draw(event){
    var ntv_event = event.nativeEvent;
    //console.log(ntv_event);
    var canvas = ntv_event.target;

    var nowX = ntv_event.offsetX;
    var nowY = ntv_event.offsetY;

    if (canvas.getContext && this.state.clicking) {
      var ctx = canvas.getContext('2d');

      ctx.lineWidth = 20;

      ctx.beginPath();
      ctx.moveTo(this.state.lastX, this.state.lastY);
      ctx.lineTo(nowX, nowY);
      ctx.stroke();

      ctx.arc(this.state.lastX, this.state.lastY, 10, 0, 2*Math.PI);
      ctx.arc(nowX, nowY, 10, 0, 2*Math.PI);
      ctx.fill();
    }

    this.setState({
      reseted: false,
      lastX: nowX,
      lastY: nowY,
    });
  }

  render(){
    return (
      <canvas key='canvas' className='Canvas' width={450} height={450}
        onMouseMove={this.draw}
        onMouseDown={(e) => this.setclickflag(e, true)}
        onMouseUp={(e) => this.setclickflag(e, false)}
        onMouseLeave={(e) => this.setclickflag(e, false)}>

      </canvas>
    );
  }
}


export default Canvas;

//  onMouseDown={this.onMouseDown}
