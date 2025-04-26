import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import QRBoxerApi from "../api/api";
import ItemListBoxes from "../boxes/ItemListBoxes";
import Button from "react-bootstrap/Button";
import RemoveaBox from "../boxes/RemoveaBox.js";
import Form from "react-bootstrap/Form";



function Box({ createitem, removebox }) {
  const history = useHistory();
  let { id } = useParams();
  const [box, setBox] = useState(null);
  

  const INITIAL_STATE = {
    description: "",
    image: "",
    box: parseInt(id)
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
 
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "createanitem",
    "createitem=", typeof createitem,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  useEffect(() => {
    async function acquireBox() {
      let box = await QRBoxerApi.getBox(id);
      setBox(box);
    }

    acquireBox();
  }, [id]);

  if (!box) return <p> Loading ... </p>;
 
  id = Object(id);
  console.log("line 48", typeof(id));

  console.log( "line 44 box", typeof(box.id));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  async function handleSubmit(event) {

    event.preventDefault();
    let result = await createitem(formData);
    console.log(result);
    setFormData(INITIAL_STATE);
    if (result.success) {
      history.push('/');
    } else {
      setFormErrors(result.errors);
    }

  }

  return (
    <div >
            <RemoveaBox id={box.id} removebox={removebox} />
      <br></br>
      <br></br>
      <Link to={`/boxes/${id}/print`}>
        <Button block="true" size="md" type="submit">Print Box Label</Button>
      </Link>
      <br></br>
      <br></br>
      <Form className="CreateBox" onSubmit={handleSubmit}>
        <Form.Label><h1>Create a new Item for this Box</h1></Form.Label>
        <br></br>
        <Form.Group size="md" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoFocus
            type="description"
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            name="image"
            id="image"
            value={formData.image}
            placeholder="Image URL"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="ml-3">
          <Form.Control
            type="hidden"
            name="box"
            id="box"
            value={box.id}
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Button block="true" size="lg" type="submit" >
          Submit
        </Button>
      </Form>
<br></br>
<h1>Items in this box</h1>
<br></br>
<br></br>
<ItemListBoxes id={id}/>
    </div>
  );
}

export default Box;

