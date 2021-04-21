import React, { Component } from 'react';
import './App.css';
import { ReactComponent as MapSvg } from './map.svg'

class App extends Component {
  state = {
    rangeOptions: [
      { visitRange: '0 - 250', statesInRange: [] },
      { visitRange: '250 - 500', statesInRange: [] },
      { visitRange: '500 - 1000', statesInRange: [] },
      { visitRange: '1000+', statesInRange: [] }
    ]
  }

  componentDidMount() {
    fetch('/states')
      .then(res => res.json())
      .then(states => {
        this.mapVisitsToRange(states);
      })
  };

  mapVisitsToRange(states = []){
    const stateSet = new Set();
    states.map((state) =>{
      const stateCode = state.id.toLowerCase();
      if(!stateSet.has(stateCode)){
        stateSet.add(stateCode);
        switch(true){
          case (state.visits <= 250):
            this.state.rangeOptions[0].statesInRange.push(stateCode);
            break;
          case (state.visits > 250 && state.visits <= 500):
            this.state.rangeOptions[1].statesInRange.push(stateCode);
            break;
          case (state.visits > 500 && state.visits <= 1000):
            this.state.rangeOptions[2].statesInRange.push(stateCode);
            break;
          case (state.visits > 1000):
            this.state.rangeOptions[3].statesInRange.push(stateCode);
            break;
          default:
            break;
        }
      }
      console.log(this.state.rangeOptions)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>States</h1>
        <select>
            <option key="placeholder">Select an option</option>
            {this.state.rangeOptions.map((option, i) =>(
              <option key={i + 1}>{option.visitRange}</option>
            ))}
        </select>
        <div>
          <MapSvg />
        </div>
      </div>
    );
  }
}

export default App;
