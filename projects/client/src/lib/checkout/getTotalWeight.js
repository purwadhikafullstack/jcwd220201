const getTotalWeight = (cartItems, setTotalWeight) => {
  const totalWeight = cartItems.reduce(
    (accumulator, current) =>
      accumulator + current.quantity * current.Product.weight,
    0
  );

  setTotalWeight(totalWeight);
};

export default getTotalWeight;
