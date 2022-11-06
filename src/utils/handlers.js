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

  export { handleTreeData, handleDelete }