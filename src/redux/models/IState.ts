import { IAnimal } from "./../../models/IAnimal";
export interface IState {
  animals: IValue;
}

export interface IValue {
  value: IAnimal[];
}
