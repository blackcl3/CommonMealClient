/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { getFoodCategories } from '../../api/categoryData';
import { createFoodItem, updateFoodItem } from '../../api/foodItemData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  location: '',
  name: '',
  photoURL: '',
  description: '',
  date: '',
  category: '',
};

function FoodItemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setFoodCategories] = useState([]);
  const [optionsForSelect, setOptions] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  function optionsMap(cat) {
    const options = cat.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    return options;
  }

  function getPageContent() {
    getFoodCategories().then(setFoodCategories).then(() => { setOptions(optionsMap(categories)); });
    console.warn(optionsForSelect);
  }

  useEffect(() => {
    getPageContent();
    if (obj.id) {
      const categoryArr = [];
      setFormInput(obj);
      obj.foodItemCategory.map((foodItemCat) => categoryArr.push(foodItemCat.category));
      const category = optionsMap(categoryArr);
      setFormInput((prevState) => ({
        ...prevState,
        category,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, initialState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    const category = e;
    setFormInput((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const date = () => {
    const rawDate = new Date();
    const dateString = new Date(rawDate.getTime() - rawDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return dateString;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = {
        ...formInput,
        status: 'unavailable',
      };
      console.warn(payload);
    //   updateFoodItem(payload)
    //     .then(() => { router.push('/food/myFood'); });
    } else {
      const payload = {
        ...formInput, date: date(), uid: user.uid, status: 'unavailable',
      };
      createFoodItem(payload).then(() => {
        router.push('/food/myFood');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="food-item-form">
      <h1 className="food-item-form-h1">{obj.id ? 'Edit' : 'Add'} Food Item</h1>
      <FormGroup controlId="floatingSelect" className="food-item-form-input">
        <FloatingLabel label="Location">
          <Form.Select aria-label="Location Select" name="location" onChange={handleChange} required>
            <option value={formInput.location || ''}>{obj.id ? formInput.location : 'Select a Location'}</option>
            <option value="fridge">Fridge</option>
            <option value="freezer">Freezer</option>
            <option value="pantry">Pantry</option>
          </Form.Select>
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input1" className="food-item-form-input">
        <FloatingLabel label="Food Item Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name.toLocaleLowerCase()} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup>
        <FloatingLabel controlId="floatingInput2" label="Food Item Description" className="mb-3 food-item-form-input">
          <Form.Control type="text" placeholder="Enter Description" name="description" value={formInput.description} onChange={handleChange} />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="floatingSelect" className="food-item-form-input">
        <Select aria-label="category select" name="category" value={formInput.category} isMulti options={optionsForSelect} onChange={handleSelect} />
      </FormGroup>
      <FormGroup className="food-item-form-input">
        <FloatingLabel label="Date You Got This Item">
          <Form.Control type="date" name="date" onChange={handleChange} value={formInput.date} />
        </FloatingLabel>
      </FormGroup>
      <FormGroup className="food-item-form-input">
        <FloatingLabel label="Photo of Your Food">
          <Form.Control type="text" name="photoURL" onChange={handleChange} value={formInput.photoURL} />
        </FloatingLabel>
      </FormGroup>
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Food Item</Button>
      </div>
    </Form>
  );
}

FoodItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    photoURL: PropTypes.string,
    id: PropTypes.number,
    foodItemCategory: PropTypes.arrayOf(PropTypes.shape),
    location: PropTypes.string,
    date: PropTypes.string,
  }),
};

FoodItemForm.defaultProps = {
  obj: initialState,
};

export default FoodItemForm;
