import { useEffect, useState } from "react";
import EmptyValues from "./EmptyValues";
import { TreeSelect, Card } from "antd";
import { baseURL, allBreedsURL } from "../utils/endpoints";
import { handleTreeData, handleDelete } from "../utils/handlers";
import { gridStyle } from "./styles";
import axios from "axios";
import { v1 } from "uuid";

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

  const handleOnChange = (breeds) => {
    console.log("onChange ", breeds);
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
            breedPics.push({ id: v1(), dog: image, breed: lastSelectedBreed.toString(), typeof: 'subBreed' });
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
            breedPics.push({ id: v1(), dog: image, breed: lastSelectedBreed.toString(), typeof: 'breed' });
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
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Search or select a breed",
    style: {
      width: "30%",
    },
  };

  return (
    <>
      <TreeSelect size="large" style={{ color: 'red' }} dropdownStyle={{ colorRendering: "revert" }} {...tProps} onChange={(dogBreed) => {handleOnChange(dogBreed); handleDelete(dogBreed, setValuesByBreed, valuesByBreed)}}  treeData={handleTreeData(allBreeds)} />
      <Card style={{ backgroundColor: '#F5F5F5' }}>
      { valuesByBreed.length === 0 ?
      <EmptyValues /> :
        valuesByBreed.map((x, i) => {
          return (
            <Card.Grid style={{...gridStyle, background: x.typeof === "breed" ? 'linear-gradient(to right top, #00a3ed, #50b3ef, #77c2f0, #99d1f2, #bae0f5)' : 'linear-gradient(to top, #d8f79a, #e3e885, #edd973, #f7c867, #ffb760)'}} key={i}>
              <p style={{ color: 'white', fontWeight: '100', marginTop: '-2em', fontSize: '20px'}}>{x.breed}</p> 
              <Card cover={<img src={x.dog} alt={'dog_image'}/>} /> 
            </Card.Grid>
          );
        })

      }
      </Card>
    </>
  );
};

export default DogList;

