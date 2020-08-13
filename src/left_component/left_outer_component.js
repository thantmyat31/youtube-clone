import React from "react";
import AllDataLists from ".././services/data_lists";
import LeftInnerComponent from "./left_inner_component";

class LeftOuterComponent extends React.Component {
  render() {
    return (
      <div>
        {AllDataLists.map((datalist) => (
          <div key={datalist.id}>
            <h1 style={{ backgroundColor: "#00152a" }}>a</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <LeftInnerComponent item={datalist} />
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default LeftOuterComponent;
