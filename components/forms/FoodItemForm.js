import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialState = {
  location: '',
  name: '',
  category: '',
  photoURL: '',
  description: '',
};

function FoodItemForm({ obj }) {
  const [formInput, setFormInput] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [categories, setFoodCategories] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.warn('input entered', e);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.foodItemFirebaseKey ? 'Edit' : 'Create New'} Food Item</h2>
      <FloatingLabel controlId="floatingSelect" label="Location">
        <Form.Select aria-label="Location Select" name="location" onChange={handleChange} required>
          <option>Select a Location</option>
          <option value="fridge">Fridge</option>
          <option value="freezer">Freezer</option>
          <option value="pantry">Pantry</option>
        </Form.Select>
      </FloatingLabel>
      <Form.Group>
        <Form.Label controlId="form.Input1" label="Food Item Name" className="mb-3">
          Food Item Name
        </Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label controlId="floatingInput2" label="Food Item Description" className="mb-3">Food Item Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" name="description" value={formInput.description} onChange={handleChange} />
      </Form.Group>

      <FloatingLabel>
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>
    </Form>
  );
}

FoodItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    photoURL: PropTypes.string,
    foodItemFirebaseKey: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
  }),
};

FoodItemForm.defaultProps = {
  obj: initialState,
};

export default FoodItemForm;
