import {useEffect, useState} from "react";
import "./App.css";

function App({gameController}) {
  useEffect(()=>{
    
  },[gameController])

  return (
    <div className="App">
      <div className="player_account">
        <p>Счет</p>1 : 3
      </div>
      <div className="container_slider">
        <div>
          <div>
            <p>Speed user</p>
            <input
              type="range"
              min={0.3}
              max={0.8}
              step={0.05}
              onChange={()=>{}}
              id="myRange"
            ></input>{" "}
          </div>
          <div>
            <p>Intensive spell</p>
            <input
              type="range"
              min={0.3}
              max={0.8}
              step={0.05}

              id="myRange"
            ></input>
          </div>
        </div>
        <div>
          <div>
            <p>Speed user</p>
            <input
              type="range"
              min={0.3}
              max={0.8}
              step={0.05}
              class="custom-slider"
              id="myRange"
            ></input>{" "}
          </div>
          <div>
            <p>Intensive spell</p>
            <input
              type="range"
              min={0.3}
              max={0.8}
              step={0.05}
              class="custom-slider"
              id="myRange"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
