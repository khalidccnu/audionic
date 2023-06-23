import { useEffect, useState } from "react";
import axios from "axios";
import { getFavourite } from "../utils";
import FavouritesSongCard from "../components/FavouritesSongCard.tsx";

type Song = {}[];

const Favourites = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<null | Song>(null);
  const [isRefetch, setRefetch] = useState(false);

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
            <div className="songs">
              {songs?.map((song) => (
                <FavouritesSongCard song={song} setRefetch={setRefetch} />
              ))}
            </div>
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
