import { IAnimal } from "../models/Animal";

interface IShowAnimalProps {
  animal: IAnimal;
}

export const ShowAnimal = (props: IShowAnimalProps) => {
  return (
    <>
      <p>{props.animal.name}</p>
      <p>{props.animal.shortDescription}</p>
    </>
  );
};
