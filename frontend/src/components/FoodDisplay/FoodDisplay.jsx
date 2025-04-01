import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list
          .filter((item) => category === "All" || category === item.category)
          .map((item) => (
            <FoodItem
              key={item._id}
              image={item.imageUrl} // Ensure this is a Cloudinary URL
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
