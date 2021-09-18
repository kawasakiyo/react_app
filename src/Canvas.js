import './App.css'
import React from 'react'

class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
    }
  }

  getCanvas(){
    const canvas = document.querySelector('.Canvas');
    return canvas.getContext('2d').canvas;
  }

  setclickflag(event, bool){
    var ntv_event = event.nativeEvent;
    if (ntv_event.button == 0) {
      this.setState({
        clicking: bool
      });
    }
  }

  setaboveflag(event, bool){
    var ntv_event = event.nativeEvent;
    if (ntv_event.button == 0) {
      this.setState({
        above: bool
      });
    }
  }

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
      lastX: nowX,
      lastY: nowY,
    });
  }

  render(){
    return (
      <canvas key='canvas' className='Canvas' width={500} height={500}
        onMouseMove={this.draw}
        onMouseDown={(e) => this.setclickflag(e, true)}
        onMouseUp={(e) => this.setclickflag(e, false)}
        onMouseEnter={(e) => this.setaboveflag(e, true)}
        onMouseLeave={(e) => this.setaboveflag(e, false)}
        onKeyDown={this.resetCanvas}>

      </canvas>
    );
  }
}


export default Canvas;

//  onMouseDown={this.onMouseDown}
