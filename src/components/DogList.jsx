import { useEffect, useState } from "react";
import { TreeSelect, message } from "antd";
import { baseURL, allBreedsURL } from "../utils/endpoints";
import { handleTreeData, handleDelete } from "../utils/handlers";
import axios from "axios";
import { v1 } from "uuid";
import DogCards from "./DogCards";

const DogList = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [valuesByBreed, setValuesByBreed] = useState([]);

  useEffect(() => {
    axios
      .get(allBreedsURL)
      .then((res) => {
        setAllBreeds(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }, []);

  const handleOnChange = async (breeds) => {
    const lastSelectedBreed = breeds.slice(-1);
    const subBreedValues = [].concat(...Object.values(allBreeds));
    const itsSubBreed = subBreedValues.includes(lastSelectedBreed.toString());
    const breedPics = [];
    
    if (itsSubBreed) {
      const originalBreed = Object.entries(allBreeds).find(([key, value]) =>
        value.includes(lastSelectedBreed.toString())
      );
      const subBreedsEndpoint = `${originalBreed[0]}/${lastSelectedBreed.toString()}/images`;
      return axios
        .get(baseURL + subBreedsEndpoint)
        .then((res) => {
          const breedImages = res.data.message;
          for (let image of breedImages) {
            breedPics.push({
              id: v1(),
              dog: image,
              breed: lastSelectedBreed.toString(),
              typeof: "subBreed",
            });
          }
          setValuesByBreed((prevBreedPics) => [...prevBreedPics, ...breedPics]);
        })
        .catch((err) => {
          console.log(err);
          message.error(err);
        });
    } else {
      const breedEndpoint = `${lastSelectedBreed}/images`;
      return axios
        .get(baseURL + breedEndpoint)
        .then((res) => {
          const breedImages = res.data.message;
          for (let image of breedImages) {
            breedPics.push({
              id: v1(),
              dog: image,
              breed: lastSelectedBreed.toString(),
              typeof: "breed",
            });
          }
          setValuesByBreed((prevBreedPics) => [...prevBreedPics, ...breedPics]);
        })
        .catch((err) => {
          console.log(err);
          message.error(err);
        });
    }
  };

  const { SHOW_PARENT } = TreeSelect;

  const tProps = {
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Search or select a breed",
    style: {
      width: "30%"
    },
  };

  return (
    <>
      <TreeSelect
        size="large"
        {...tProps}
        onChange={(dogBreed) => {
          handleOnChange(dogBreed);
          handleDelete(dogBreed, setValuesByBreed, valuesByBreed);
        }}
        treeData={handleTreeData(allBreeds)}
      />
      <div>
        <DogCards breedVals={valuesByBreed} />
      </div>
    </>
  );
};

export default DogList;
