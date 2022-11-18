export const getGrowth = (current, last) => {
  const growth = ((current - last) / last) * 100;
  return ` ${growth.toFixed(2)}% `;
};

export const toCurrency = (data) => {
  const locale = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 9,
  });
  return locale.format(data);
};
