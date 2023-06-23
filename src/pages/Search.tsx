import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import axios from "axios";
import SongCard from "../components/SongCard.tsx";
import anmViolinMusic from "../assets/violin-music.json";

type Song = {}[];

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<null | Song>(null);
  const [searchKeyword, setSearchKeyword] = useState<null | string>(null);
  const [input, setInput] = useState("");

  const handleSubmit: any = (e: any) => {
    e.preventDefault();
    setSearchKeyword(e.target.search.value);
  };

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
              "X-RapidAPI-Key":
                "8b607cdf84msh77456c866487bb2p1ad813jsn73415d8a0ced",
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          })
          .then((response) => setSongs(response.data.tracks.items));

        setLoading(false);
      })();
    }
  }, [searchKeyword]);

  return (
    <section className="py-5">
      <div className="container">
        <form onSubmit={handleSubmit} className="search-form input-group">
          <input
            type="text"
            name="search"
            placeholder="Type your song name..."
            className="form-control form-control-sm"
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
          />
          <div className="input-group-text p-0">
            <button
              type="submit"
              className="btn btn-sm btn-outline-primary px-4 mt-2 search-form-submit"
            >
              Search
            </button>
          </div>
        </form>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : songs?.length ? (
          <div className="songs mt-5">
            {songs?.map((song) => (
              <SongCard song={song} />
            ))}
          </div>
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
