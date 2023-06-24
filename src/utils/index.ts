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

export const getPlaylist = () => {
  let playlist: { id: string; name: string; songs: string[] }[] = [];
  const getPlaylist: null | string = localStorage.getItem("playlist");

  if (getPlaylist) playlist = JSON.parse(getPlaylist);

  return playlist;
};

export const addToPlaylist = (id: string, pid: string) => {
  const playlist = getPlaylist();

  const findIndex = playlist.findIndex((elem) => elem.id === pid);
  const exist = playlist[findIndex].songs.find((elem) => elem === id);

  if (exist) return true;

  playlist[findIndex].songs.push(id);
  localStorage.setItem("playlist", JSON.stringify(playlist));
};
