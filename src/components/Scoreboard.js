// src/components/Scoreboard.js
import React, { useState } from "react";
import Player from "./Player";

export default function Scoreboard () {
  const [players, set_players] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);

  const [sort_by, set_sort_by] = useState("name"); // either "score" or "name"
// src/components/Scoreboard.js
// ...

function compare_score(player_a, player_b) {
    return player_b.score - player_a.score;
  }
  
function compare_name(player_a, player_b) {
  return player_a.name.localeCompare(player_b.name);
  }  


    const players_sorted = sort_by === "score" ? [...players].sort(compare_score)
    : [...players].sort(compare_name)


  const change_sorting = event => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  const incrementScore = (id) => {
    console.log(id)
    const new_players_array = players.map(player => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1
        };
      } else {
        // else, just keep them
        return player;
      }
    });
    set_players(new_players_array);
  };

  const onClickReset = () => {
    const reset_score = players.map(player => {
      return {...player, score: 0}
    })
    set_players(reset_score);  
  }
    

  // const onClickReset = () => {
  //   const reset_player_array = players.map((score) => {
  //     const player_score = score;
  //     player_score.score = 0;
  //     return player_score;
  //   });
  // }

  // set_players(reset_player_array);

  return (
    <div className="Scoreboard">
      <h1>Scoreboard</h1>
         <button onClick={onClickReset}>Reset</button>
          <p>
      Sort order:{" "}
      <select onChange={change_sorting}>
        <option value="score">Sort by score</option>
        <option value="name">Sort by name</option>
      </select>
    </p>

      {players_sorted.map (player => (
        <Player
        id={player.id}
        name={player.name}
        score={player.score}
        incrementScore={incrementScore}
        />
      ))}
    </div>
  );
}