/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getFoodCategories } from '../../api/categoryData';
import { getUserFoodItems } from '../../api/foodItemData';
import { getFoodItemandCategories } from '../../api/mergedData';
import MyFoodItemCard from '../../components/MyFoodItemCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyFoodPage() {
  // eslint-disable-next-line no-unused-vars
  const [foodObject, setFoodObject] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  // const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  console.warn(user);

  const getPageContent = () => {
    // getFoodItemandCategories(user.uid).then((response) => {
    //   setFoodObject(response);
    //   setFilteredFood(response);
    // }).then(getFoodCategories().then(setCategories));
    getUserFoodItems(user.uid).then((response) => {
      setFoodObject(response);
      setFilteredFood(response);
    });
  };

  const handleClick = (e) => {
    const location = e.target.innerText;
    const newFilter = foodObject.filter((foodObj) => foodObj.location === location);
    setFilteredFood(newFilter);
  };

  const resetPage = () => {
    setFilteredFood(foodObject);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    const category = e.target.value;
    const newFilter = foodObject.filter((foodObj) => foodObj.categoryFirebaseKey === category);
    setFilteredFood(newFilter);
    if ((category === '')) {
      resetPage();
    }
  };

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <div className="my-food-page-title-div">
          <h1 className="my-food-page-title">{user.name}&apos;s Kitchen</h1>
        </div>
        {/* <div className="food-category-dropdown">
          <Form.Select aria-label="category select" name="categoryFirebaseKey" onChange={handleChange}>
            <option value="">Select a Category</option>
            {categories?.map((category) => (
              <option key={category.categoryFirebaseKey} value={category.categoryFirebaseKey}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </div> */}
        <div className="button-container container">
          <div className="addFoodButtonDiv">
            <Button href="newFoodItem">Add New Food</Button>
          </div>
          <div className="filter-button-div">
            <Button onClick={handleClick} className="food-filter-button">
              freezer
            </Button>
            <Button onClick={handleClick} className="food-filter-button">
              fridge
            </Button>
            <Button onClick={handleClick} className="food-filter-button">
              pantry
            </Button>
            <Button onClick={resetPage} className="food-filter-button">
              clear
            </Button>
          </div>
        </div>
        <div className="food-card-container container">
          {/* {filteredFood
            ?.filter((foodObj) => foodObj.status === 'unavailable')
            .map((foodItem) => (
              <MyFoodItemCard key={foodItem.id} obj={foodItem} photoURL={foodItem.photo_url} onChange={getFoodItemandCategories} onUpdate={getPageContent} />
            ))} */}
          {filteredFood?.map((foodItem) => (
            <MyFoodItemCard key={foodItem.id} obj={foodItem} photoURL={foodItem.photo_url} onChange={getFoodItemandCategories} onUpdate={getPageContent} />
          ))}
        </div>
      </div>
    </>
  );
}
