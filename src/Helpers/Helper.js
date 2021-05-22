export const users = [
  {
    id: 1,
    name: "Mathews W.",
  },
  {
    id: 2,
    name: "Arthur",
  },
  {
    id: 3,
    name: "Nickolas",
  },
];

export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
