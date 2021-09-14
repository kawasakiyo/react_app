import React from 'react'
import * as tf from '@tensorflow/tfjs'

import Ttt from './Ttt';
import Canvas from './Canvas';
import './App.css';

const item = ["こんにちは！！！", "おい！！！React初心者がよ！！！", "頑張れ！！！バカが！！！！！！"];


class App extends React.Component {
  constructor(props) {
    super(props);

    localStorage.setItem('model', require('js_tegaki_class_model'));

    this.state = {
      model: null,
      is_loaded: false
    };

    this.loadModel = this.loadModel.bind(this);
    this.loadModel();
  }

  async loadModel(){
    //console.log(__filename);
    //console.log(__dirname);

    await tf.loadLayersModel('localstrage://js_tegaki_class_model').then((model) => {
      this.setState({
        model: model,
        is_loaded: true
      });
      model.summary();
    });
    
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
