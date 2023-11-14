const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(2023, 11, date).getDay();

  return dayOfWeek;
};

const thousandsComma = (price) => {
  const comma = Number(price.toFixed(1)).toLocaleString();

  return comma;
};

export { getDayOfWeek, thousandsComma };
