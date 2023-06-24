import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { addToPlaylist, getFavourite, getPlaylist } from "../utils";
import FavouritesSongCard from "../components/FavouritesSongCard.tsx";

type Song = {}[];

const Favourites = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<null | Song>(null);
  const [playlists, setPlaylists] = useState<
    null | { id: string; name: string; songs: string[] }[]
  >(null);
  const [plSong, setPLSong] = useState("");
  const [isRefetch, setRefetch] = useState(false);

  const handleAddToPlaylist: any = (pid: string) => {
    const exist = addToPlaylist(plSong, pid);

    if (exist) toast.error("Song is already exist in this playlist!");
    else toast.success("Song has been added in playlist!");
  };

  useEffect(() => {
    const playlist = getPlaylist();
    setPlaylists(playlist);
  }, []);

  useEffect(() => {
    (async () => {
      const favourite: string[] = getFavourite();

      if (favourite.length) {
        await axios
          .get(`https://spotify23.p.rapidapi.com/tracks/`, {
            params: {
              ids: favourite.join(","),
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          })
          .then((response) => {
            setSongs(response.data.tracks);
            setRefetch(false);
          });
      } else {
        setSongs(null);
      }

      setLoading(false);
    })();
  }, [isRefetch]);

  return (
    <section className="py-5">
      <div className="container">
        {!loading ? (
          songs?.length ? (
            <>
              <div className="songs">
                {songs?.map((song) => (
                  <FavouritesSongCard
                    song={song}
                    setRefetch={setRefetch}
                    setPLSong={setPLSong}
                  />
                ))}
              </div>
              <div className="modal fade" id="modalAlt" tabIndex={-1}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Playlists</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {playlists?.length ? (
                        <div className="list-group">
                          {playlists?.map((pl) => {
                            return (
                              <span
                                style={{ cursor: "pointer" }}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleAddToPlaylist(pl.id)}
                              >
                                {pl.name}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <h6>You have not any playlist!</h6>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="favourites-alert alert alert-info" role="alert">
              You have not added any song yet!
            </div>
          )
        ) : (
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favourites;
