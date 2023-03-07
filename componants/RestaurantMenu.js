import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CON_URL } from "../contants";
import useRestaurant from "../utils/useRestaurant";
import Shimmer from "./Shimmer";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurants=useRestaurant(resId);
  const dispatch=useDispatch();
const addFoodItem=(item)=>{
    dispatch(addItem(item));
  }
  
  return !restaurants ? (
    <Shimmer />
  ) : (
    <div className="grid-flow-col flex">
      <div className="col-span-4 p-2">
        <h2 className="px-10 text-xl font-bold my-2 border border-black text-center bg-green-100">Restaurants Id:--{resId}</h2>       
        <img src={IMG_CON_URL + restaurants.cloudinaryImageId} />
        <h2 className="px-2 text-xl my-2" >{restaurants.name}</h2>
        <h2 className="px-2 text-xl my-2">{restaurants.area}</h2>
        <h2 className="px-2 text-xl my-2">{restaurants.city}</h2>
        <h2 className="px-2 text-xl my-2">{restaurants.avgRating}</h2>
        <h2 className="px-2 text-xl my-2">{restaurants.costForTwoMsg}</h2> 
      </div>
      
      <div className="col-span-8 flex">
        <h1 className="px-10 text-xl font-bold my-5">Menu:------</h1>
        <ul>
          {Object.values(restaurants?.menu?.items).map((item) => (
            <li className="px-2 text-xl my-2" key={item.id}>{item.name} - 
             <button className="p-1 text-xs font-bold bg-green-100"
        onClick={()=>addFoodItem(item)}>Add Item</button></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
