const storageKey = "animals";

export const getList = <T>(): T[] => {
  let valueFromLS = localStorage.getItem(storageKey) || "[]";
  return JSON.parse(valueFromLS) as T[];
};

export const saveList = <T>(data: T): void => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};
