import React from 'react'
import * as tf from '@tensorflow/tfjs'

import Ttt from './Ttt';
import Canvas from './Canvas';
import './App.css';

const item = ["こんにちは！！！", "おい！！！React初心者がよ！！！", "頑張れ！！！バカが！！！！！！"];


class App extends React.Component {
  constructor(props) {
    super(props);

    this.loadModel();
  }

  async loadModel(){
    console.log(__filename);
    console.log(__dirname);

    const model = await tf.loadLayersModel('js_tegaki_class_model/model.json');
  }

  render(){
    return (
      <div className="App">
        {
          item.map((string)=> <Ttt message={string} />)
        }
        <Canvas />
      </div>
    );
  }
}

export default App;
