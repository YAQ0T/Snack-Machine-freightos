import React, { Component } from "react";
import "../css components/SnackSlots.css";
import Keypad from "./Keypad";

export default class SnackSlots extends Component {
  constructor() {
    super();
    this.state = {
      snackItems: [],
    };
  }

  fillSnackItem = (col, row, maxPrice) => {
    //max price in dolar.
    let snackArr = [];
    let snackItems = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let snackObj = {
          name: String.fromCharCode("A".charCodeAt(0) + i) + j,
          price: Math.floor(Math.random() * maxPrice) + 1,
        };
        snackArr.push(snackObj);
      }
      snackItems.push(snackArr);
      snackArr = [];
    }
    this.setState({ snackItems: snackItems });
  };
  componentDidMount() {
    this.fillSnackItem(5, 5, 10);
  }
  render() {
    return (
      <div className="container">
        <h2 id="snacks-head">Snaks :</h2>

        <div className="snacksItem">
          {this.state.snackItems.map((S) => {
            return S.map((s) => {
              return <div className="item">{s.name}</div>;
            });
          })}
          <Keypad snackItems={this.state.snackItems} key="2" />
        </div>
      </div>
    );
  }
}
