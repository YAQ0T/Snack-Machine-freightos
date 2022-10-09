import React, { Component } from "react";
import "../css components/keypad.css";
import MoneySlots from "./MoneySlots";
export default class Keypad extends Component {
  constructor() {
    super();
    this.state = {
      numbers: ["0", "1", "2", "3", "4"],
      letters: ["A", "B", "C", "D", "E"],
      selectedItem: "",
      price: 0,
      flagLetters: 1,
      flagNumbers: 1,
    };
  }
  fillItem = (e) => {
    if (parseInt(e.target.innerHTML) != NaN) {
      let temp = this.state.selectedItem + e.target.innerHTML;

      if (this.state.flagNumbers) {
        this.setState({
          selectedItem: temp,
          flagNumbers: 0,
        });
      } else {
        if (this.state.flagLetters) {
          this.setState({
            selectedItem: temp,
            flagLetters: 0,
          });
        }
      }
    }
  };

  clear = () => {
    this.setState({
      selectedItem: "",
      flagLetters: 1,
      flagNumbers: 1,
      price: 0,
    });
  };
  confirm = () => {
    let checkFlag = 1;
    let snackItems = this.props.snackItems;
    for (let i = 0; i < snackItems.length && checkFlag; i++)
      for (let j = 0; j < snackItems[i].length && checkFlag; j++) {
        if (this.state.selectedItem == snackItems[i][j].name) {
          console.log(snackItems[i][j]);
          this.setState({ price: snackItems[i][j].price });

          checkFlag = 0;
        }
      }

    if (checkFlag) {
      console.log("The item you select is not available ");
      this.setState({ selectedItem: "Not Available", price: 0 });
    }
  };
  render() {
    return (
      <div className="container-keypad">
        <div className="head">
          <h2>Keypad</h2>
          <div className="item-head">{this.state.selectedItem}</div>
          <div className="price">{this.state.price}$</div>
        </div>

        <div className="keypad">
          <div className="letters">
            {this.state.letters.map((l) => {
              return (
                <div className="letter" onClick={this.fillItem}>
                  {l}
                </div>
              );
            })}
          </div>
          <div className="numbers">
            {this.state.numbers.map((n) => {
              return (
                <div className="number" onClick={this.fillItem}>
                  {n}
                </div>
              );
            })}
          </div>

          <button id="confirm" onClick={this.confirm}>
            Confirm
          </button>
          <button id="clear" onClick={this.clear}>
            Clear
          </button>
        </div>
        <div className="buy">
          {this.state.price > 0 ? (
            <MoneySlots
              price={this.state.price}
              selectedItem={this.state.selectedItem}
              clear={this.clear}
              key="3"
            />
          ) : (
            <h3>Please select item to buy</h3>
          )}
        </div>
      </div>
    );
  }
}
