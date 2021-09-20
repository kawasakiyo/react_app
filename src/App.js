import React from 'react'
import * as tf from '@tensorflow/tfjs'

import Ttt from './Ttt';
import Canvas from './Canvas';
import Button from './Button';
import './App.css';

const item = ["こんにちは！！！", "おい！！！React初心者がよ！！！", "頑張れ！！！バカが！！！！！！"];


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: null,
      is_loaded: false
    };

    this.CanvasRef = React.createRef();

    this.resetCanvas = this.resetCanvas.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.predict = this.predict.bind(this);

    this.loadModel(`${window.location.origin}/js_tegaki_minimodel/model.json`);
  }

  async loadModel(path){
    await tf.loadLayersModel(path).then((model) => {
      console.log('model loaded!');
      this.setState({
        model: model,
        is_loaded: true
      });
      //model.summary();
    });
  }

  resetCanvas(event){
    //console.log('parent func');
    this.CanvasRef.current.resetCanvas();
  }

  predict(event){
    if (!this.state.is_loaded) return 0;

    const tmpcanvas = document.createElement('canvas');
    tmpcanvas.width = 28;
    tmpcanvas.height = 28;

    const img = this.CanvasRef.current.getCanvas();
    //console.log(this.state.tmpCanvas);
    //console.log(this.CanvasRef.current);
    //const tmp = this.state.tmpCanvas;
    const ctx = tmpcanvas.getContext('2d');
    ctx.drawImage(img, 0, 0, tmpcanvas.width, tmpcanvas.height);

    var rescaled_img = ctx.getImageData(0, 0, tmpcanvas.width, tmpcanvas.height);

    for (let i = 0; i < rescaled_img.data.length; i += 4) {
      let alpha = rescaled_img.data[i + 3];
      //r = g = b = a
      rescaled_img.data[i] = rescaled_img.data[i + 1] = rescaled_img.data[i + 2] = alpha;
    }

    tf.tidy(() => {
      // 28 * 28 * 1
      var img_tensor = tf.browser.fromPixels(rescaled_img, 1);

      //console.log(img_tensor);
      img_tensor = tf.div(img_tensor, 255.0);

      // 1 * 28 * 28 * 1
      var input = tf.expandDims(img_tensor);

      //console.log(input.arraySync());
      //console.log("prediction start");
      var ans = this.state.model.predict(input);
      //console.log(ans);
      ans = tf.squeeze(ans);
      //console.log(ans.arraySync());
      return ans.arraySync();
    });
  }



  render(){
    const canvas = <Canvas ref={this.CanvasRef}/>
    return (
      <div className="App">
        {
          item.map((string)=> <Ttt key={string} message={string} />)
        }
        <Button label='Reset' parentFunc={(e)=>this.resetCanvas(e)} />
        <Button label='Predict' parentFunc={(e)=>this.predict(e)} />
        {canvas}
      </div>
    );
  }
}

export default App;
