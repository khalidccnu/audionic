import { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaUser } from "react-icons/fa";

const SongCard = ({ song }: any) => {
  const [play, setPlay] = useState("");
  const songTime: any = new Date(song.data.duration.totalMilliseconds);

  useEffect(() => {
    axios
      .get(`https://spotify23.p.rapidapi.com/tracks/`, {
        params: {
          ids: song.data.id,
        },
        headers: {
          "X-RapidAPI-Key":
            "8b607cdf84msh77456c866487bb2p1ad813jsn73415d8a0ced",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      })
      .then((response) => setPlay(response.data.tracks[0].preview_url));
  }, []);

  return (
    <div className="card">
      <img
        src={song.data.albumOfTrack.coverArt.sources[2].url}
        className="card-img-top"
        alt=""
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{song.data.albumOfTrack.name}</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="card-text d-flex align-items-center gap-1">
            <FaUser />
            <span>{song.data.artists.items[0].profile.name}</span>
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

export default SongCard;
