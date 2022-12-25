const getTotalQuantity = (cartItems, setTotalQuantity) => {
  const totalQuantity = cartItems.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );

  setTotalQuantity(totalQuantity);
};

export default getTotalQuantity;
