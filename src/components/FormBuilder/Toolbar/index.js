import React from "react";
import ToolbarItem from "../ToolbarItem/ToolbarItem";

const Toolbar = ({ items }) => (
  <React.Fragment>
    <h3
      className="text-center mt-3"
      style={{ height: "50px", margin: 0 }}
    >
      Toolbox
    </h3>
    <ul className="list-group">
      {items.map(item => (
        <ToolbarItem data={item} key={item.key} />
      ))}
    </ul>
  </React.Fragment>
);

export default Toolbar;
