import React, { Component } from "react";
import "../css components/moneySlots.css";
export default class MoneySlots extends Component {
  constructor() {
    super();
    this.state = {
      coinsType: ["10c", "20c", "50c", "1$"],
      notesType: ["20$", "50$"],
      enteredMoney: 0,
      changedMoney: 0,
      changedMoneyState: 0,
      changeMoneyTemp: 0,
    };
  }

  enteredMoney = (e) => {
    if (this.state.changedMoneyState == 1) {
      alert(
        "The money you entered is enough (No need for more)! Press On purchase  Please"
      );
      return 0;
    }
    let price = this.props.price;

    let tempNum = parseInt(e.target.innerHTML);

    let typeOfCoin = e.target.innerHTML[e.target.innerHTML.length - 1];

    if (typeOfCoin == "c") {
      tempNum /= 100;
    }
    tempNum = tempNum + this.state.enteredMoney;
    if (tempNum >= price) {
      this.setState({
        enteredMoney: tempNum,
        changedMoney: tempNum - price,
        changedMoneyState: 1,
      });
    } else {
      this.setState({
        enteredMoney: tempNum,
        changedMoneyState: -1,
      });
    }
  };
  enteredCredit = () => {
    let price = this.props.price;

    if (this.state.changedMoneyState == 1) {
      alert(
        "The money you entered is enough (No need for more)! Press On purchase  Please"
      );
      return 0;
    }
    this.setState({
      enteredMoney: price,
      changedMoney: 0,
      changedMoneyState: 1,
    });
  };
  returnMoney = () => {
    let changedMoney = this.state.changedMoney;
    let changeMoneyTemp = changedMoney;
    let changeMoneyStringTemp = "";
    let newCoins = [50, 20, 1, 0.5, 0.2, 0.1];
    for (let i = 0; i < newCoins.length; i++) {
      if (changeMoneyTemp - newCoins[i] >= 0) {
        if (changeMoneyStringTemp.length == 0)
          changeMoneyStringTemp += newCoins[i] + " ";
        else changeMoneyStringTemp += "+ " + newCoins[i];
        changeMoneyTemp -= newCoins[i];
        i--;
      }
    }
    return changeMoneyStringTemp;
  };

  purchase = () => {
    let changeMoney = this.state.changedMoney;
    let changeMoneyString = this.returnMoney();
    this.returnMoney();
    if (changeMoney != 0)
      alert(
        "Thanks, Here's your change : " +
          changeMoneyString +
          " = " +
          changeMoney
      );
    else alert("Enjoy <3");
    this.clear();
  };
  clear = () => {
    this.setState({ enteredMoney: 0, changedMoney: 0, changedMoneyState: 0 });
    this.props.clear();
  };
  render() {
    return (
      <div className="MoneySlots">
        <div className="container-money">
          <div className="moneySlots-head">
            <h3>Enter the Amount of Money</h3>
            <h3>: {this.state.enteredMoney}</h3>
          </div>
          <div className="coins">
            {this.state.coinsType.map((c) => {
              {
                return (
                  <div className={c} onClick={this.enteredMoney}>
                    {c}
                  </div>
                );
              }
            })}
          </div>
          <div className="notes">
            {this.state.notesType.map((n) => {
              return (
                <div className={n} onClick={this.enteredMoney}>
                  {n}
                </div>
              );
            })}
          </div>
          <div className="credit" onClick={this.enteredCredit}>
            Credit
          </div>
        </div>
        <div className="sellState">
          {this.state.changedMoneyState < 0 ? (
            <p>The Money you entered is not enough</p>
          ) : (
            <p>Changed Money = {this.state.changedMoney}</p>
          )}
          {this.state.changedMoneyState == 0 ? <p></p> : <p></p>}
        </div>
        {this.state.changedMoneyState > 0 ? (
          <div className="purchaseState">
            <button className="purchase" onClick={this.purchase}>
              Purchase
            </button>
            <button className="clear" onClick={this.clear}>
              Cancel
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
