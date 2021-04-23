import React, { Component, ReactDOM } from "react";
import "./App.css";
import { ReactComponent as MapSvg } from "./map.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      rangeOptions: [
        {
          value: "placeholder",
          visitRange: "Select an option",
          statesInRange: [],
        },
        { value: "range1", visitRange: "0 - 250", statesInRange: [] },
        { value: "range2", visitRange: "250 - 500", statesInRange: [] },
        { value: "range3", visitRange: "500 - 1000", statesInRange: [] },
        { value: "range4", visitRange: "1000+", statesInRange: [] },
      ],
      selectedVal: "placeholder",
      prevSelectedVal: "placeholder",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    fetch("/states")
      .then((res) => res.json())
      .then((states) => {
        this.mapVisitsToRange(states);
      });
  }

  mapVisitsToRange(states = []) {
    const stateSet = new Set();
    states.map((state) => {
      const stateCode = state.id.toLowerCase();
      if (!stateSet.has(stateCode)) {
        stateSet.add(stateCode);
        switch (true) {
          case state.visits <= 250:
            this.state.rangeOptions[1].statesInRange.push(stateCode);
            break;
          case state.visits > 250 && state.visits <= 500:
            this.state.rangeOptions[2].statesInRange.push(stateCode);
            break;
          case state.visits > 500 && state.visits <= 1000:
            this.state.rangeOptions[3].statesInRange.push(stateCode);
            break;
          case state.visits > 1000:
            this.state.rangeOptions[4].statesInRange.push(stateCode);
            break;
          default:
            break;
        }
      }
    });
  }

  getRange(rangeValue) {
    return this.state.rangeOptions.find((range) => range.value === rangeValue);
  }

  changeColorOfStates(stateArray, highlightState) {
    const mapDomElement = this.mapRef.current;
    stateArray.map((stateCode) => {
      const stateDomNode = mapDomElement.getElementsByClassName(stateCode);
      if (stateDomNode[0] && highlightState) {
        stateDomNode[0].classList.add("active");
      } else if (stateDomNode[0] && !highlightState) {
        stateDomNode[0].classList.remove("active");
      }
    });
  }

  handleSelect(event) {
    const selectedOpt = event.target.value;
    const prevSelectedOpt = this.state.prevSelectedVal;
    this.setState({ selectedVal: selectedOpt, prevSelectedVal: selectedOpt });
    const selectedRange = this.getRange(selectedOpt);
    const prevSelectedRange = this.getRange(prevSelectedOpt);
    this.changeColorOfStates(prevSelectedRange.statesInRange, false);
    this.changeColorOfStates(selectedRange.statesInRange, true);
  }

  render() {
    return (
      <div className="App">
        <h4 class="visits-title">User Visits</h4>
        <select
          onChange={this.handleSelect}
          value={this.state.selectedVal}
          className="visits-select"
        >
          {this.state.rangeOptions.map((option, i) => (
            <option key={i + 1} value={option.value}>
              {option.visitRange}
            </option>
          ))}
        </select>
        <div>
          <MapSvg ref={this.mapRef} />
        </div>
      </div>
    );
  }
}

export default App;
