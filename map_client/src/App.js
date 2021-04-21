import React, { Component } from 'react';
import './App.css';
import { ReactComponent as MapSvg } from './map.svg'

class App extends Component {
  state = {
    states: {},
    rangeOptions: [
      { key: 1, visitRange: '0 - 250', statesInRange: [] },
      { key: 2, visitRange: '250 - 500', statesInRange: [] },
      { key: 3, visitRange: '500 - 1000', statesInRange: [] },
      { key: 4, visitRange: '1000+', statesInRange: [] }
    ]
  }

  componentDidMount() {
    fetch('/states')
      .then(res => res.json())
      .then(states => {
        const cleanedStates = this.cleanData(states);
        this.setState({ states: cleanedStates });
      })
  };

  cleanData(states = []){
    const aggregateData = {}
    states.map((state, i) =>{
      const stateCode = state.id;
      if(Object.keys(aggregateData).indexOf(stateCode) === -1){
        aggregateData[stateCode] = {
          name: state.name,
          visits: state.visits,
        }
      }
    })
    return aggregateData;
  }

  render() {
    return (
      <div className="App">
        <h1>States</h1>
        <select>
            <option key="placeholder">Select an option</option>
            {this.state.rangeOptions.map(option =>(
              <option key={option.key}>{option.visitRange}</option>
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
