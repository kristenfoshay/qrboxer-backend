import React, { useContext } from "react";
import UserContext from "../UserContext";
import BoxesListItems from "../boxes/BoxesListItems";

function Items() {

    const { currentUser } = useContext(UserContext);

    let moves = currentUser.moves;

    return (
        <div className="Moves col-md-8 offset-md-2">
            <h1> My Items </h1>
            <br></br>
            {moves.length
                ? (
                    <div className="Moves-list" style={{ height: 2000 }} >
                        {moves.map(m => (
                            <BoxesListItems id={Object(m.id)} location={m.location} date={m.date} />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default Items;