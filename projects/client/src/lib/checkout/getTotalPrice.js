const getTotalPrice = (cartItems, setTotalPrice) => {
  const totalPrice = cartItems.reduce(
    (accumulator, current) =>
      accumulator + current.quantity * current.Product.price,
    0
  );

  setTotalPrice(totalPrice);
};

export default getTotalPrice;
