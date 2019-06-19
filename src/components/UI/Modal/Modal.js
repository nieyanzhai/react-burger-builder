import React, { Component } from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Axiliary";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    let show = {};

    if (this.props.show) {
      show = {
        transform: "translateY(0)",
        opacity: 1
      };
    } else {
      show = {
        transform: "translateY(-100%)",
        opacity: 0
      };
    }

    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div className={classes.Modal} style={show}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
