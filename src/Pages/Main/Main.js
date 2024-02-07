import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { useDispatch } from "react-redux";
import { getCountryMeals, getLatestMeal, getPopular, getRandomMeal } from "../../Redux-toolkit/MealSlice/MealSlice";
import InfoIngredient from "../../Components/Info-ingredient";
import PopularInfoingredients from "../../Components/Popular-infoIngredients";
import SearchInfo from './../../Components/Search-info/Search-info';
import CountryInfo from "../../Components/Country-info";
import AlfavitInfo from "../../Components/Alfavit-info";

const Main = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getLatestMeal());
    dispatch(getPopular());
    dispatch(getRandomMeal());
    dispatch(getCountryMeals());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:idMeal/:title" element={<InfoIngredient />} />
        <Route path="/ingredient/:title" element={<PopularInfoingredients/>}/>
        <Route path="/meals/:country" element={<CountryInfo/>} />
        <Route path="/alfavit/:meals" element={<AlfavitInfo/>} />
        <Route path="/search/:text" element={<SearchInfo/>}/>
      </Routes>
    </div>
  );
};

export default Main;
