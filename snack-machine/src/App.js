import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Keypad from "./components/Keypad";
import MoneySlots from "./components/MoneySlots";
import SnackSlots from "./components/SnackSlots";
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact key="1" element={<SnackSlots />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
