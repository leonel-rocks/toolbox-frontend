const createKey = (input) => {
  return input ? input.toLowerCase().split(" ").join("_") : "no_key";
};

export { createKey };
