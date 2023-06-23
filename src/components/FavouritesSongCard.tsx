import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { FaClock, FaUser } from "react-icons/fa";
import { removeFavourite } from "../utils";

const FavouritesSongCard = ({ song, setRefetch }: any) => {
  const [play, setPlay] = useState("");
  const songTime: any = new Date(song.duration_ms);

  const handleRemoveFavourite: any = (name: string, id: string) => {
    removeFavourite(id);
    toast.success(name + " has been removed from Favourites!");
    setRefetch(true);
  };

  useEffect(() => {
    axios
      .get(`https://spotify23.p.rapidapi.com/tracks/`, {
        params: {
          ids: song.id,
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      })
      .then((response) => setPlay(response.data.tracks[0].preview_url));
  }, []);

  return (
    <div className="card">
      <div className="position-relative">
        <img src={song.album.images[0].url} className="card-img-top" alt="" />
        <span className="position-absolute top-0 end-0 bg-primary text-white px-2 mt-2 me-2 rounded-circle fs-3">
          <AiFillHeart
            style={{ cursor: "pointer" }}
            onClick={() => handleRemoveFavourite(song.name, song.id)}
          />
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{song.name}</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="card-text d-flex align-items-center gap-1">
            <FaUser />
            <span>{song.artists[0].name}</span>
          </span>
          <span className="card-text d-flex align-items-center gap-1">
            <FaClock />
            <span>{songTime.getMinutes() + ":" + songTime.getSeconds()}</span>
          </span>
        </div>
        <audio src={play} className="player w-100 mt-auto rounded" controls />
      </div>
    </div>
  );
};

export default FavouritesSongCard;
