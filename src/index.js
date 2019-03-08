import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import inputMask from "simple-keyboard-input-mask";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    //if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
  };

  inputStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: 20,
    border: 0
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          style={this.inputStyle}
          placeholder={"(99) 9999-9999"}
          //onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboardRef = r)}
          theme={"hg-theme-default hg-layout-numeric numeric-theme"}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          disableCaretPositioning={true}
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{//} 0 {//}", "{bksp}"],
            shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
          }}
          inputMask={"(99) 9999-9999"}
          modules={[inputMask]}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
