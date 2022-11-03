import { useEffect, useState } from "react";
import axios from "axios";

const DogList = () => {
  const [allBreeds, setAllBreeds] = useState([]);

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

  

  return (
    <>
      {Object.keys(allBreeds).map((x, i) => {
        return <p key={i}>{x}</p>;
      })}
    </>
  );
};

export default DogList;
