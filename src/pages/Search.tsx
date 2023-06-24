import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import axios from "axios";
import { addToPlaylist, getPlaylist } from "../utils";
import SongCard from "../components/SongCard.tsx";
import anmViolinMusic from "../assets/violin-music.json";

type Song = {}[];

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<null | Song>(null);
  const [playlists, setPlaylists] = useState<
    null | { id: string; name: string; songs: string[] }[]
  >(null);
  const [keywords, setKeywords] = useState<null | { data: { name: string } }[]>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState<null | string>(null);
  const [input, setInput] = useState("");
  const [plSong, setPLSong] = useState("");
  const [isDropdown, setDropdown] = useState(false);

  const handleSubmit: any = (e: any) => {
    e.preventDefault();
    setSearchKeyword(e.target.search.value);
    setDropdown(false);
  };

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
    if (input) {
      setDropdown(true);

      axios
        .get(`https://spotify23.p.rapidapi.com/search/`, {
          params: {
            q: input,
            type: "tracks",
            offset: "0",
            limit: "3",
            numberOfTopResults: "3",
          },
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          },
        })
        .then((response) => setKeywords(response.data.tracks.items));
    } else {
      setDropdown(false);
    }
  }, [input]);

  useEffect(() => {
    if (searchKeyword) {
      (async () => {
        setLoading(true);

        await axios
          .get(`https://spotify23.p.rapidapi.com/search/`, {
            params: {
              q: searchKeyword,
              type: "tracks",
              offset: "0",
              limit: "6",
              numberOfTopResults: "6",
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          })
          .then((response) => setSongs(response.data.tracks.items));

        setLoading(false);
      })();
    }
  }, [searchKeyword]);

  useEffect(() => {
    document.addEventListener("click", () => setDropdown(false));

    return () =>
      document.removeEventListener("click", () => setDropdown(false));
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <div className="search-form position-relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Type your song name..."
              className="form-control form-control-sm"
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
            />
          </form>
          <ul className={`${isDropdown ? "d-block " : ""}dropdown-menu w-100`}>
            {keywords?.map((keyword) => (
              <li>
                <span
                  className="dropdown-item"
                  onClick={() => {
                    setInput(keyword.data.name);
                    setSearchKeyword(keyword.data.name);
                  }}
                >
                  {keyword.data.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : songs?.length ? (
          <>
            <div className="songs mt-5">
              {songs?.map((song) => (
                <SongCard setPLSong={setPLSong} song={song} />
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
          <div className="animation mt-5">
            <Lottie
              className="w-full"
              animationData={anmViolinMusic}
              loop={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
