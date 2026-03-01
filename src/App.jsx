import React from 'react'
import * as tf from '@tensorflow/tfjs'

import Canvas from './Canvas';
import Button from './Button';
import PredBar from './PredBar';
import './App.css';


const BunkenInstance = [
  {page: '【初心者】HTMLのcanvasとJavaScriptでお絵かきアプリ作る【ベース作り編】',
   source: "https://tsuyopon.xyz/2018/09/14/how-to-create-drawing-app-part1/"},
  {page: 'Retrain MobileNet for the web',
   source: "https://github.com/woudsma/retrain-mobilenet-for-the-web"},
  {page: '【React】Tensorflow.js を使用してフロントエンドだけで手書き文字推測アプリケーションを作成する',
   source: "https://qiita.com/nemutas/items/7826389f7b58bc22607c"},
];

function Bunken(props) {
  return (
    <div className="Bunken">
      <p>○{props.page}</p>
      <p>　<a href={props.source} target="_blank" rel="noopener noreferrer">{props.source}</a></p>
    </div>
  );
}

const BarInstance = [
  {label: 0, ref: React.createRef()},
  {label: 1, ref: React.createRef()},
  {label: 2, ref: React.createRef()},
  {label: 3, ref: React.createRef()},
  {label: 4, ref: React.createRef()},
  {label: 5, ref: React.createRef()},
  {label: 6, ref: React.createRef()},
  {label: 7, ref: React.createRef()},
  {label: 8, ref: React.createRef()},
  {label: 9, ref: React.createRef()}
];

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
        is_loaded: true,
        error: "なんか書いてね"
      });
      //model.summary();
    });
  }

  resetCanvas(event){
    //console.log('parent func');
    this.CanvasRef.current.resetCanvas();
    // this.setState({
    //   error: "なんか書いてね"
    // });
  }

  predict(event){
    if (!this.state.is_loaded) {
      this.setState({
        error: "ロードをミスったのでリロードしてね"
      });
      return 0;
    }
    if (this.CanvasRef.current.state.reseted) {
      this.setState({
        error: "なんか書いてね"
      });
      return 0;
    }

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

    const predarr = tf.tidy(() => {
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

    for (const ins of BarInstance) {
      //console.log(ins);
      var pred = predarr[ins.label];
      ins.ref.current.visualizePred(pred);
    }

    var maxindex = tf.argMax(predarr).arraySync()
    console.log(maxindex);

    this.setState({
      error: "確率が出たね " + maxindex + "っぽいらしいです"
    });
  }



  render(){
    const canvas = <Canvas ref={this.CanvasRef}/>
    const bars = BarInstance.map((ins) => <PredBar label={ins.label} ref={ins.ref} key={ins.label + 'bar'}/>)

    return (
      <div className="App">
        <h1>したいわね、手書き数字認識(倒置法)</h1>
        <div className="Step2">
          <div className="AppHalf">
            <div className="ButtonWrap">
              <Button label='リセット' parentFunc={(e)=>this.resetCanvas(e)} />
              <Button label='認識' parentFunc={(e)=>this.predict(e)} />
            </div>

            {canvas}
          </div>
          <div className="AppHalf">
            <p>{this.state.error}</p>
            {bars}
          </div>
        </div>
        <div className="Step3">
          <h3>参考にしたページとか</h3>
          {
            BunkenInstance.map((ins) => <Bunken page={ins.page} source={ins.source}/>)
          }
        </div>
      </div>
    );
  }
}

// <div className=""> </div>

export default App;
