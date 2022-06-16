import { IAction } from "./../models/IAction";
import { createSlice } from "@reduxjs/toolkit";
import { IAnimal } from "../../models/IAnimal";
import { saveList } from "../../services/storageService";

let defaultValue: IAnimal[] = [];

const animalSlice = createSlice({
  name: "animal",
  initialState: { value: defaultValue },
  reducers: {
    add: (state, action: IAction<IAnimal[]>) => {
      state.value = action.payload;
      saveList(action.payload);
    },
    feedAnimal: (state, action: IAction<number>) => {
      state.value[action.payload].isFed = !state.value[action.payload].isFed;
      state.value[action.payload].lastFed = Date.now().toString();
      saveList(state.value);
    },
    makeAnimalHungry: (state, action: IAction<number>) => {
      state.value[action.payload].isFed = false;
      saveList(state.value);
    },
  },
});

export const { add, feedAnimal, makeAnimalHungry } = animalSlice.actions;

export default animalSlice.reducer;
