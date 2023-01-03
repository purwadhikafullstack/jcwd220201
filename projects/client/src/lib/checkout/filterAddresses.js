const filterAddresses = (input, addresses, setAddressList) => {
  const filteredAddresses = addresses.filter((element) => {
    return (
      element.address.toLowerCase().includes(input) ||
      element.recipient.toLowerCase().includes(input)
    );
  });

  setAddressList(filteredAddresses);
};

export default filterAddresses;
