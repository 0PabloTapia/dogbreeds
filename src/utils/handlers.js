import { gridStyle } from "../components/styles";

const handleTreeData = (allBreeds) => {
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

  const handleDelete = (breeds, setValuesByBreed, valuesByBreed) => {
    setValuesByBreed(valuesByBreed.filter(x => {
       return breeds.includes(x.breed.toString())     
   }))
  }

  const handleCardStyle = (value) => {
    return {
      ...gridStyle,
      background:
        value.typeof === "breed"
          ? "linear-gradient(to right top, #00a3ed, #50b3ef, #77c2f0, #99d1f2, #bae0f5)"
          : "linear-gradient(to top, #d8f79a, #e3e885, #edd973, #f7c867, #ffb760)",
    };
  };

  export { handleTreeData, handleDelete, handleCardStyle}