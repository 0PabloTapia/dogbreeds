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

  export { handleTreeData }