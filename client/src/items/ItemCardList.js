import React, { useState, useEffect } from "react";
import QRBoxerApi from "../api/api";
import ItemCard from "./ItemCard";
import "../index.css";

function ItemCardList() {
  let [items, setItems] = useState(null);

  useEffect(() => {
    async function acquireItems() {
      let items = await QRBoxerApi.getItems();
      setItems(items);
    }
    acquireItems();
  }, []);

  if (!items) return <p className="text-center"> Loading ...</p>;

  return (
    <div className="container">
      {items.length ? (
        <div className="card-grid Items-list">
          {items.map(i => (
            <ItemCard
              key={i.id}
              id={i.id}
              description={i.description}
              image={i.image}
              box={i.box}
            />
          ))}
        </div>
      ) : (
        <p className="lead text-center">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default ItemCardList;