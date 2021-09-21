import './App.css'
import React from 'react'
//
// const PredBarWrap = React.forwardRef((props, ref) => (
//   <div ref={ref} className="PredBar">
//     {props.children}
//   </div>
// ));
// return (
//
//   <PredBarWrap>
//     <p className='PredBarLabel'>{this.props.label}</p>
//     <p className='PredBarValue'>{this.state.percent}%</p>
//     <div className='PercentBar' ref={this.state.barRef}></div>
//   </PredBarWrap>
// );


class PredBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: (0).toFixed(2),
      barRef: React.createRef()
    };

    this.visualizePred = this.visualizePred.bind(this);
  }

  visualizePred(prob){ //probability value is 0~1
    const bar = this.state.barRef.current;
    const barW = bar.clientWidth;

    const minW = bar.clientHeight; //
    const maxW = bar.parentNode.clientWidth;

    const targetW = minW * (1.0 - prob) + maxW * prob;

    const barAnim = bar.animate([
      {width: barW + 'px'},
      {width: targetW + 'px'},
    ], {
      duration: 1000,
      fill: 'forwards',
      easing: 'cubic-bezier(.44,.01,0,1)'
    })

    barAnim.onfinish = () => {
      this.setState({
        percent: (prob * 100).toFixed(2)
      })
    }
  }

  render() {
    return (
      <div className='PredBar'>
        <div className='PredBarLabel'>
          <p>{this.props.label}</p>
        </div>
        <div className='PercentBarWrap'>
          <div className='PercentBar' ref={this.state.barRef}></div>
            <p className='PredBarValue'>{this.state.percent}%</p>
        </div>
      </div>
    );

  }
}

export default PredBar;
