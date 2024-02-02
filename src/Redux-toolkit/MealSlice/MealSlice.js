import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../http/settings";

const initialState = {
  latest: [],
  infoMeal: [],
  popular: [],
  randomIngredient: [],
  popularInfo: [],
  text: "",
  randomMeal: [],
  search: [],
};

export const getLatestMeal = createAsyncThunk(
  "latest/getLatestMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const mealNumber = [
        53075, 53074, 53073, 53072, 53071, 53070, 53069, 53068,
      ];
      const results = await Promise.all(
        mealNumber.map(async (number) => {
          const result = await instance.get(`lookup.php?i=${number}`)
          return result.data.meals
        })

      )
      const combinedMeals = results.flat()
      dispatch(latestMeal(combinedMeals))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const getInfoMeal = createAsyncThunk(
  "infoMeal/getInfoMeal",
  async (elem, { rejectWithValue, dispatch }) => {
    const result = await instance.get(`lookup.php?i=${elem}`)
    dispatch(infoIngredients(result.data.meals))
  }
)

export const getPopular = createAsyncThunk(
  "popular/getPopular",
  async (_, { rejectWithValue, dispatch }) => {
    const result = await instance.get(`list.php?i=list`);
    dispatch(popularMeal(result.data.meals));
    dispatch(getRandomIngredients(result.data.meals));
  }
)

export const getPopularInfo = createAsyncThunk(
  "PopularInfo/getPopularInfo",
  async (elem, { rejectWithValue, dispatch }) => {
    const result = await instance.get(`filter.php?i=${elem}`)
    dispatch(popularInfoMeal(result.data.meals))
  }
)

export const getRandomMeal = createAsyncThunk(
  "randomeMeal/getRandomMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const randome = [1, 2, 3, 4, 5, 6, 7, 8];
      const responses = await Promise.all(
        randome.map(() => instance.get("random.php"))
      );
      const randomeMealsData = responses.map(
        (response) => response.data.meals[0]
      )
      // console.log(randomeMealsData);
      dispatch(getRandom(randomeMealsData))
    } catch (error) {
      rejectWithValue("Error fetching random Meal", error)
    }
  }
)

export const getSearchMeals = createAsyncThunk(
  "search/getSearchMeals",
  async(elem, {dispatch}) => {
    const result = await instance.get(`search.php?s=${elem}`)
    dispatch(getSearchMeal(result.data.meals))
  }
)

const mealSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    latestMeal: (state, action) => {
      state.latest = action.payload;
    },
    infoIngredients: (state, action) => {
      state.infoMeal = action.payload;
    },
    popularMeal: (state, action) => {
      state.popular = action.payload;
    },
    getRandomIngredients: (state, action) => {
      state.randomIngredient = action.payload;
    },
    popularInfoMeal: (state, action) => {
      state.popularInfo = action.payload
    },
    onDescription: (state, action) => {
      state.text = action.payload
    },
    getRandom: (state, action) => {
      state.randomMeal = action.payload;
    },
    getSearchMeal: (state, action) => {
      state.search = action.payload
    }
  },
});

export const { latestMeal,
                infoIngredients,
                popularMeal,
                getRandomIngredients,
                popularInfoMeal,
                onDescription,
                getRandom,
                getSearchMeal } = mealSlice.actions;

export default mealSlice.reducer;
