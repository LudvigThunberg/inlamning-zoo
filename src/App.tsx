import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ShowAnimals } from "./components/ShowAnimals";
import { SingleAnimal } from "./components/SingleAnimal";
import { IAnimal } from "./models/IAnimal";
import { add } from "./redux/features/animalSlice";
import { getList } from "./services/storageService";
import { getAllAnimals } from "./services/zooService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let allAnimals = getList<IAnimal>();
    if (allAnimals.length > 0) {
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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowAnimals />} />
          <Route path="/animal/:id" element={<SingleAnimal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
