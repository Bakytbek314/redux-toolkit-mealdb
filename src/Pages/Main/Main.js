import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { useDispatch } from "react-redux";
import { getLatestMeal, getPopular, getRandomMeal } from "../../Redux-toolkit/MealSlice/MealSlice";
import InfoIngredient from "../../Components/Info-ingredient";
import PopularInfoingredients from "../../Components/Popular-infoIngredients";
import SearchInfo from './../../Components/Search-info/Search-info';

const Main = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getLatestMeal());
    dispatch(getPopular());
    dispatch(getRandomMeal());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:idMeal/:title" element={<InfoIngredient />} />
        <Route path="/ingredient/:title" element={<PopularInfoingredients/>}/>
        <Route path="/search/:text" element={<SearchInfo/>}/>
      </Routes>
    </div>
  );
};

export default Main;
