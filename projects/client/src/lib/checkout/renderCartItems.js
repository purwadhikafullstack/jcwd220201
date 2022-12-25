import CartItem from "../../components/checkout/CartItem";

const renderCartItems = (cartItems) => {
  return cartItems.map((cartItem, index) => {
    if (cartItems.length === 1) {
      return (
        <CartItem
          key={cartItem.id}
          details={cartItem}
          index={index}
          solitary={true}
        />
      );
    }

    return <CartItem key={cartItem.id} details={cartItem} index={index} />;
  });
};

export default renderCartItems;
