const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(2023, 11, date).getDay();

  return dayOfWeek;
};
export default getDayOfWeek;
