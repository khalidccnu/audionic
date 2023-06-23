export const addFavourite = (id: string) => {
  const favourite: string[] = getFavourite();

  favourite.push(id);
  localStorage.setItem("favourite", JSON.stringify(favourite));
};

export const removeFavourite = (id: string) => {
  const favourite: string[] = getFavourite();

  favourite.splice(favourite.indexOf(id), 1);
  localStorage.setItem("favourite", JSON.stringify(favourite));
};

export const getFavourite = () => {
  let favourite: string[] = [];
  const getFavourite: null | string = localStorage.getItem("favourite");

  if (getFavourite) favourite = JSON.parse(getFavourite);

  return favourite;
};
