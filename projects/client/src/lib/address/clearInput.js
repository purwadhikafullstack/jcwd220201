const clearInput = (inputs, touchedFields, callback) => {
  for (let input in inputs) {
    if (typeof inputs[input] === "boolean") {
      callback(input, false);
      continue;
    }
    callback(input, "");
    touchedFields[input] = false;
  }
};

export default clearInput;
