import React from "react";

class RightInnerComponent extends React.Component {
  render() {
    return <li> {this.props.item.title} </li>;
  }
}

export default RightInnerComponent;
