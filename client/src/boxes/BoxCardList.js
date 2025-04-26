import React, { useState, useEffect } from "react";
import BoxCard from "./BoxCard";
import QRBoxerApi from "../api/api";

function BoxCardList({ id, location, date }) {
  console.log("line 6 boxcardlist", typeof(id));

  let [boxes, setBoxes] = useState(null);

  useEffect(() => {
    async function getMoveBoxes() {
      let boxes = await QRBoxerApi.getBoxesbyMove(id);
      console.log(boxes);
      setBoxes(boxes);
    }

    getMoveBoxes();
  }, [id]);

  if (!boxes) return;

  let contain = boxes;
    
    boxes = contain.boxes;
    


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

export default BoxCardList;