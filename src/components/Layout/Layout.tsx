import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IAnimal } from "../../models/IAnimal";
import { add } from "../../redux/features/animalSlice";
import { getList } from "../../services/storageService";
import { getAllAnimals } from "../../services/zooService";

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let allAnimals = getList<IAnimal>();
    if (allAnimals) {
      dispatch(add(allAnimals));
      console.log("gick in i första ", allAnimals);
    }
    if (allAnimals.length === 0) {
      getAllAnimals()
        .then((data) => {
          dispatch(add(data));
          console.log("gick in i andra ", data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return <></>;
};
