import {useEffect, useState} from "react";
import "./App.css";

function App({gameController}) {
  const [speedUser1, setSpeedUser1] = useState(gameController.user1.speed);
  const [speedUser2, setSpeedUser2] = useState(gameController.user2.speed);
  const [spellSpeedUser1, setSpellSpeedUser1] = useState(
    gameController.user1.spell.intensive
  );
  const [spellSpeedUser2, setSpellSpeedUser2] = useState(
    gameController.user2.spell.intensive
  );

  const [hitsUser1, setHitsUser1] = useState(gameController.user1.hits);
   const [hitsUser2, setHitsUser2] = useState(gameController.user2.hits);

  useEffect(() => {
    gameController.setSpeedUser(speedUser1, "one");
    gameController.setSpeedUser(speedUser2, "two");
    gameController.setSpellSpeedUser(spellSpeedUser1, "one");
    gameController.setSpellSpeedUser(spellSpeedUser2, "two");
    gameController.setHits = ()=>{
      setHitsUser1(gameController.user1.hits)
      setHitsUser2(gameController.user2.hits);
    }
  }, [speedUser1, speedUser2, spellSpeedUser1, spellSpeedUser2, hitsUser1, hitsUser2]);

  return (
    <div className="App">
      <div className="player_account">
        <p>Счет</p>{hitsUser2} : {hitsUser1}
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
              onChange={(e) => {
                setSpeedUser1(e.target.value);
              }}

            ></input>
          </div>
          <div>
            <p>Intensive spell</p>
            <input
              type="range"
              min={1}
              max={3}
              step={0.2}
              onChange={(e) => {
                setSpellSpeedUser1(e.target.value);
              }}
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
              value={speedUser2}
              onChange={(e) => {
                setSpeedUser2(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <p>Intensive spell</p>
            <input
              type="range"
              min={1}
              max={3}
              step={0.2}
              onChange={(e) => {
                setSpellSpeedUser2(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
