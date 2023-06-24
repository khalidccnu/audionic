import { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaUser } from "react-icons/fa";

const HomeFavouritesSongCard = ({ song }: any) => {
  const [play, setPlay] = useState("");
  const songTime: any = new Date(song.duration_ms);

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
    <>
      <div>
        <img src={song.album.images[0].url} className="card-img-top" alt="" />
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
    </>
  );
};

export default HomeFavouritesSongCard;
