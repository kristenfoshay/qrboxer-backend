import React, { useContext } from "react";
import UserContext from "../UserContext";
import BoxesList from "../boxes/BoxesList";

function Boxes() {

    const { currentUser } = useContext(UserContext);
    console.log("Boxes component - currentUser:", currentUser);

    if (!currentUser) {
        return (
            <div className="Moves col-md-8 offset-md-2">
                <h1> My Boxes </h1>
                <p className="lead">Please log in to view your boxes.</p>
            </div>
        );
    }

    let moves = currentUser.moves || [];
    console.log("Boxes component - moves:", moves);

    return (
        <div className="Moves col-md-8 offset-md-2">
            <h1> My Boxes </h1>
            <br></br>
            {moves.length
                ? (
                    <div className="Moves-list" style={{ height: 2000 }} >
                        {moves.map(m => (
                            <BoxesList key={m.id} id={m.id} location={m.location} date={m.date} />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default Boxes;