import { useEffect, useState } from "react";
import { TreeSelect } from "antd";
import { Card } from "antd";
import axios from "axios";

const DogList = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [valuesByBreed, setValuesByBreed] = useState([]);

  useEffect(() => {
    const url = "https://dog.ceo/api/breeds/list/all";
    axios
      .get(url)
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
      axios
        .get(`https://dog.ceo/api/breed/${lastSelectedBreed}/images`)
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
      const breedsURL = `https://dog.ceo/api/breed/${lastSelectedBreed}/images`;
      axios
        .get(breedsURL)
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

  console.log("values", allBreeds);

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

  const gridStyle = {
    width: "20%",
    padding: "4rem 2rem 4rem 2rem",
    marginTop: "1rem",
    marginLeft: "4.5rem",
    textAlign: "center",
    backgroundColor: "#DE2151",
  };

  const handleTreeData = () => {
    return Object.entries(allBreeds).map(([breed, subBreed], i) => ({
      title: breed,
      value: breed,
      children: subBreed.map((x, i) => {
        return {
          title: x,
          value: x,
        };
      }),
    }));
  };

  console.log('byBreed', valuesByBreed)

  return (
    <>
      <TreeSelect {...tProps} treeData={handleTreeData()} />
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
