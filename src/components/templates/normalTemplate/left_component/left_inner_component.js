import React from "react";

class LeftInnerComponent extends React.Component {
  render() {
    return <li> {this.props.item.title} </li>;
  }
}

export default LeftInnerComponent;
