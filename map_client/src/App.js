import React, { Component, ReactDOM } from 'react';
import './App.css';
import { ReactComponent as MapSvg } from './map.svg'

class App extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      rangeOptions: [
        { value: 'range1', visitRange: '0 - 250', statesInRange: [] },
        { value: 'range2', visitRange: '250 - 500', statesInRange: [] },
        { value: 'range3', visitRange: '500 - 1000', statesInRange: [] },
        { value: 'range4', visitRange: '1000+', statesInRange: [] }
      ],
      selectedVal: 'placeholder'
    }
    this.handleSelect = this.handleSelect.bind(this);
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
    })
  }

  handleSelect(event){
    const selectedOpt = event.target.value;
    console.log(selectedOpt)
    this.setState({'selectedVal': selectedOpt});
    const selectedRange = this.state.rangeOptions.find(range => range.value === selectedOpt)
    const mapDomElement = this.mapRef.current;
    selectedRange.statesInRange.map(stateCode => {
      const statePathDomNode = mapDomElement.getElementsByClassName(stateCode);
      if(statePathDomNode && statePathDomNode[0] && statePathDomNode[0].setAttribute){
        statePathDomNode[0].setAttribute('class', 'active')
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>States</h1>
        <select onChange={this.handleSelect} value={this.state.selectedVal}>
            <option key="placeholder" value="placeholder">Select an option</option>
            {this.state.rangeOptions.map((option, i) =>(
              <option key={i + 1} value={option.value}>{option.visitRange}</option>
            ))}
        </select>
        <div>
          <MapSvg ref={this.mapRef}/>
        </div>
      </div>
    );
  }
}

export default App;
