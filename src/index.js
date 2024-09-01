import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GameController } from "./GameController";


const canvas = document.getElementById("game-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gameController = new GameController(canvas);

const DELTA_TIME = 1000 / 60;

document.getElementById("game-container").onmousemove = (e) => {
  gameController.positionMouse = [e.pageX, e.pageY];
};

function render() {
  gameController.render();
  requestAnimationFrame(render);
}

render();

setInterval(() => {
  gameController.gameState(DELTA_TIME);
}, DELTA_TIME);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App gameController={gameController} />
  </React.StrictMode>
);
