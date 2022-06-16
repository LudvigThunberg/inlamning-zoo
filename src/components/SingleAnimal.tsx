import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import {
  add,
  feedAnimal,
  makeAnimalHungry,
} from "../redux/features/animalSlice";
import { IState } from "../redux/models/IState";

type IParamsId = {
  id: string;
};

export const SingleAnimal = () => {
  const dispatch = useDispatch();
  const animals = useSelector((state: IState) => state.animals.value);
  const params = useParams<IParamsId>();
  const animal = animals[parseInt(params.id!) - 1];
  useEffect(() => {
    const time = Date.now();
    if (animal) {
      if (time > parseInt(animal.lastFed) + 10800000) {
        dispatch(makeAnimalHungry(parseInt(params.id!) - 1));
      }
    }
  }, [params.id, animal, dispatch]);

  /* const index = animals.findIndex(
    (animal) => animal.id.toString() === params.id!
  ); */

  //const numb = parseInt(animals[index].lastFed);
  //console.log("numb: ", numb);

  return (
    animal && (
      <>
        <p>{animal.name}</p>
        {animal.isFed ? (
          <p>{animal.name} är mätt</p>
        ) : (
          <button
            onClick={() => {
              dispatch(feedAnimal(parseInt(params.id!) - 1));
            }}
          >
            Mata {animal.name}
          </button>
        )}
      </>
    )

    /* <p>{animals[parseInt(params.id!) - 1].name}</p>
      {animals[parseInt(params.id!) - 1].isFed ? (
        <p>{animals[parseInt(params.id!) - 1].name} är mätt.</p>
      ) : (
        <button
          onClick={() => {
            dispatch(feedAnimal(parseInt(params.id!) - 1));
          }}
        >
          Mata {animals[parseInt(params.id!) - 1].name}
        </button>
      )} */
  );
};
