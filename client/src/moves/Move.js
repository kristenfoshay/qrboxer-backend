import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRBoxerApi from "../api/api";
import BoxCardList from "../boxes/BoxCardList";
import CreateaBox from "../boxes/CreateaBox";


function Move({ createbox }) {
  let { id } = useParams();
  const [move, setMove] = useState(null);

  useEffect(() => {
    async function getMoveBoxes() {
      let move = await QRBoxerApi.getMove(id);
      console.log(move);
      setMove(move);
    }

    getMoveBoxes();
  }, [id]);

  if (!move) return;

  id = Object(id);

  return (
    <div className="Move col-md-8 offset-md-2">
      <h4>Destination: {move.location}</h4>
      <p>Move Date: {move.date}</p>
      <CreateaBox move={parseInt(id)} createbox={createbox} />
      <br></br>
      <BoxCardList id={id} location={move.location} date={move.date} />
    </div>
  );
}

export default Move;