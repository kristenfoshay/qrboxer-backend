import React, { useState, useEffect } from "react";
import QRBoxerApi from "../api/api";
import ItemCard from "./ItemCard";


function Items() {

  let [items, setItems] = useState(null);
  
  useEffect(() => {
    async function acquireItems() {
 
    let items = await QRBoxerApi.getItems();
    setItems(items);
  }
  acquireItems();  
}, []);

  if (!items) return <p> Loading ...</p>;

  return (
      <div className="Items col-md-8 offset-md-2">
       <h1> My Items </h1>
        {items.length
            ? (
                <div className="Items-list">
                  {items.map(i => (
                      <ItemCard
                          key={i.id}
                          id={i.id}
                          description={i.description}
                          room={i.image}
                          move={i.box}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default Items;