import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { feedAnimal, makeAnimalHungry } from "../redux/features/animalSlice";
import { IState } from "../redux/models/IState";
import { Button } from "./StyledComponents/Button";
import { ColumnContainer } from "./StyledComponents/ColumnContainer";
import { Container } from "./StyledComponents/Container";
import { Heading2 } from "./StyledComponents/Heading2";
import { Image } from "./StyledComponents/Image";
import { ImageContainer } from "./StyledComponents/ImageContaniner";
import { Paragraph } from "./StyledComponents/Paragraph";
import { SingleAnimalContainer } from "./StyledComponents/SingleAnimalContainer";

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

  return (
    animal && (
      <SingleAnimalContainer>
        <Heading2>{animal.name}</Heading2>
        <ColumnContainer>
          <Paragraph>{animal.shortDescription}</Paragraph>
          <ImageContainer>
            <Image
              src={animal.imageUrl}
              alt={animal.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://cdn.dribbble.com/users/124059/screenshots/15231994/dribbble.png";
              }}
            />
          </ImageContainer>
          <Container>
            <Paragraph>{animal.longDescription}</Paragraph>
          </Container>

          {animal.isFed ? (
            <Paragraph>
              {animal.name} är mätt. han matades senast:{" "}
              {new Date(parseInt(animal.lastFed)).toLocaleTimeString()}
            </Paragraph>
          ) : (
            <Button
              onClick={() => {
                dispatch(feedAnimal(parseInt(params.id!) - 1));
              }}
            >
              Mata {animal.name}
            </Button>
          )}
          <Heading2>Kort information om {animal.name}</Heading2>
          <Paragraph>
            {animal.name} är född {animal.yearOfBirth}
          </Paragraph>
          <Paragraph>
            {animal.name}s mediciner: {animal.medicine}
          </Paragraph>
        </ColumnContainer>
      </SingleAnimalContainer>
    )
  );
};
