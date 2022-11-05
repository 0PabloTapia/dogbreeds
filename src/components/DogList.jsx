import { useEffect, useState } from "react";
import { TreeSelect } from "antd";
import { Card } from "antd";
import { baseURL, allBreedsURL } from "../utils/endpoints";
import { handleTreeData } from "../utils/handlers";
import { gridStyle } from "./styles";
import axios from "axios";

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
      });
  }, []);

  const onChange = (breeds) => {
    console.log("onChange ", breeds);
    const randomId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    const lastSelectedBreed = breeds.slice(-1);
    const subBreedValues = [].concat(...Object.values(allBreeds));
    const itsSubBreed = subBreedValues.includes(lastSelectedBreed.toString());
    const breedPics = [];

    if (itsSubBreed) {
      const originalBreed = Object.entries(allBreeds).find(([key, value]) => value.includes(lastSelectedBreed.toString()));
      const subBreedsEndpoint = `${originalBreed[0]}/${lastSelectedBreed.toString()}/images`
      axios
        .get(baseURL + subBreedsEndpoint)
        .then((res) => {
          const breedImages = res.data.message;
          for (let image of breedImages) {
            breedPics.push({ id: randomId, dog: image });
          }
          setValuesByBreed((prevBreedPics) => [...prevBreedPics, ...breedPics]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const breedEndpoint = `${lastSelectedBreed}/images`
      axios
        .get(baseURL + breedEndpoint)
        .then((res) => {
          const breedImages = res.data.message;
          for (let image of breedImages) {
            breedPics.push({ id: randomId, dog: image });
          }
          setValuesByBreed((prevBreedPics) => [...prevBreedPics, ...breedPics]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { SHOW_PARENT } = TreeSelect;

  const tProps = {
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "30%",
    },
  };
  

  return (
    <>
      <TreeSelect {...tProps} treeData={handleTreeData(allBreeds)} />
      <Card>
        {valuesByBreed.map((x, i) => {
          return (
            <Card.Grid style={gridStyle} key={i}>
              <Card cover={<img src={x.dog} alt={"dog_image"} />}></Card>
            </Card.Grid>
          );
        })}
      </Card>
    </>
  );
};

export default DogList;
