import AddressCard from "../../components/checkout/AddressCard";

const renderAdresses = (addresses, onClose) => {
  return addresses.map((address) => {
    if (!address.is_selected) {
      return (
        <AddressCard
          address={address}
          key={address.id}
          onClose={onClose}
          variant="default"
        />
      );
    }
    return (
      <AddressCard
        address={address}
        key={address.id}
        onClose={onClose}
        variant="selected"
      />
    );
  });
};

export default renderAdresses;
