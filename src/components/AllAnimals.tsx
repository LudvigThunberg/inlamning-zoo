import { useEffect, useState } from "react";
import { IAnimal } from "../models/Animal";
import { getAllAnimals } from "../services/zooService";
import { ShowAnimal } from "./ShowAnimal";

export const AllAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    let animalsLS = localStorage.getItem("animals");
    if (animalsLS) {
      let allAnimals = JSON.parse(animalsLS);
      setAnimals(allAnimals);
    }
  }, []);

  useEffect(() => {
    if (animals.length !== 0) return;
    getAllAnimals()
      .then((data) => {
        setAnimals(data);
        localStorage.setItem("animals", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [animals]);

  console.log(animals);

  let showAnimal = animals.map((animal) => {
    return <ShowAnimal animal={animal} key={animal.id}></ShowAnimal>;
  });

  return <>{showAnimal}</>;
};
