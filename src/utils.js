export const getTime = (value) => {
  const date = new Date(value);

  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const getDate = (value) => {
  const date = new Date(value);

  return `${date.getDate()}.${date.getMonth() + 1}`;
};

export const isEmptyObject = (object) => Object.keys(object).length ? false : true;