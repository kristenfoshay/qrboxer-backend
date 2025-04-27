import React from "react";
import MoveCard from "./MoveCard";
import "../index.css";

function MoveCardList({ moves }) {
  return (
    <div className="container">
      <div className="card-grid MoveCardList">
        {moves.map(move => (
          <MoveCard
            key={move.id}
            id={move.id}
            location={move.location}
            date={move.date}
          />
        ))}
      </div>
    </div>
  );
}

export default MoveCardList;