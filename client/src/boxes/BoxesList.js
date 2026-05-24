import React, { useState, useEffect } from "react";
import BoxCard from "./BoxCard";
import QRBoxerApi from "../api/api";

function BoxesList({ id, location, date }) {

  let [boxes, setBoxes] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    async function getMoveBoxes() {
      try {
        setLoading(true);
        let boxes = await QRBoxerApi.getBoxesbyMove(id);
        console.log("line 13, boxeslist", boxes);
        setBoxes(boxes);
      } catch (err) {
        console.error("Error fetching boxes:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getMoveBoxes();
  }, [id]);

  if (loading) return <div>Loading boxes...</div>;
  if (error) return <div>Error loading boxes: {String(error)}</div>;
  if (!boxes || boxes.length === 0) return null;

  console.log("line 21 boxeslist", boxes);

  return (
    <div className="BoxCardList">
      {boxes.map(box => (
        <BoxCard
          key={box.id}
          id={box.id}
          room={box.room}
          move={box.move}
          location={location}
          date={date}
        />
      ))}
    </div>
  );
}

export default BoxesList;