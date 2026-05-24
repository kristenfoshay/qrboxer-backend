import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRBoxerApi from "../api/api";
import BoxCardList from "../boxes/BoxCardList";
import CreateaBox from "../boxes/CreateaBox";


function Move({ createbox }) {
  let { id } = useParams();
  const [move, setMove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMoveBoxes() {
      try {
        setLoading(true);
        let move = await QRBoxerApi.getMove(id);
        console.log(move);
        setMove(move);
      } catch (err) {
        console.error("Error loading move:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getMoveBoxes();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading move: {error.toString()}</p>;
  if (!move) return <p>Move not found</p>;

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