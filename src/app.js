import React from "react";
import "./index.scss";

const onClickEvent = (e) => {
  e.preventDefault();
  alert("You Clicked Me!");
};

const App = () => {
  return (
    <div className="content">
      <div className="label">Create React App Without CRA😊</div>
      <button className="btn" onClick={onClickEvent}>
        Click Me 😎
      </button>
    </div>
  );
};

export default App;
