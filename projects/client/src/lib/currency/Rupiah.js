export const Rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const IDR = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "");
};

export const formatThousand = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1.");
