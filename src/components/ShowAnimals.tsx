import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeAnimalHungry } from "../redux/features/animalSlice";
//import { Link } from "react-router-dom";
//import { IAnimal } from "../models/IAnimal";
import { IState } from "../redux/models/IState";
import { AnimalLink } from "./StyledComponents/AnimalLink";
import { FeedParagraph } from "./StyledComponents/FeedParagraph";
import { IsHungry } from "./StyledComponents/IsHungry";
import { LinkHeading } from "./StyledComponents/LinkHeading";
import { LinkImage } from "./StyledComponents/LinkImage";
import { LinkImageContainer } from "./StyledComponents/LinkImageContaniner";
import { Food } from "@styled-icons/fluentui-system-regular";
/* interface IShowAnimalProps {
  animal: IAnimal;
} */

export const ShowAnimals = (/* props: IShowAnimalProps */) => {
  const animals = useSelector((state: IState) => state.animals.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const time = Date.now();
    for (let index = 0; index < animals.length; index++) {
      if (time > parseInt(animals[index].lastFed) + 14400000) {
        dispatch(makeAnimalHungry(index));
      }
    }
  }, [animals, dispatch]);

  return (
    <>
      {animals.map((animal) => {
        return (
          <AnimalLink to={"/animal/" + animal.id} key={animal.id}>
            <LinkHeading>{animal.name}</LinkHeading>
            {animal.isFed ? (
              <></>
            ) : (
              <IsHungry>
                <Food />
              </IsHungry>
            )}
            <LinkImageContainer>
              <LinkImage
                src={animal.imageUrl}
                alt={animal.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://cdn.dribbble.com/users/124059/screenshots/15231994/dribbble.png";
                }}
              />
            </LinkImageContainer>
          </AnimalLink>
        );
      })}
    </>
  );
};
