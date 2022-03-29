export const getDate = (date) => {
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = newDate.getMonth() + 1;
  const dd = newDate.getDate();
  return `${yyyy}.${mm}.${dd}`;
};
