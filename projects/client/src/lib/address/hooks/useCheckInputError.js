import { useEffect } from "react";

const useCheckInputError = (triggers) => {
  const [name, phone, label, city, address] = triggers;

  useEffect(() => {
    if (!name.trigger) {
      name.callback(false);
      return;
    }
    name.callback(true);
  }, [name.trigger]);

  useEffect(() => {
    if (!phone.trigger) {
      phone.callback(false);
      return;
    }
    phone.callback(true);
  }, [phone.trigger]);

  useEffect(() => {
    if (!label.trigger) {
      label.callback(false);
      return;
    }
    label.callback(true);
  }, [label.trigger]);

  useEffect(() => {
    if (!city.trigger) {
      city.callback(false);
      return;
    }
    city.callback(true);
  }, [city.trigger]);

  useEffect(() => {
    if (!address.trigger) {
      address.callback(false);
      return;
    }
    address.callback(true);
  }, [address.trigger]);
};

export default useCheckInputError;
