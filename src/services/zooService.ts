import { IAnimal } from "../models/Animal";
import { get } from "./handleRequests";
const baseUrl = "https://animals.azurewebsites.net/api/animals";

export async function getAllAnimals(): Promise<IAnimal[]> {
  return (await get<IAnimal[]>(baseUrl)).data;
}
