import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { addFavourite, getFavourite, removeFavourite } from "../utils";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaClock, FaUser } from "react-icons/fa";

const SongCard = ({ song }: any) => {
  const [isFavourite, setFavourite] = useState(false);
  const [play, setPlay] = useState("");
  const songTime: any = new Date(song.data.duration.totalMilliseconds);

  const handleAddFavourite: any = (name: string, id: string) => {
    addFavourite(id);
    setFavourite(true);
    toast.success(name + " has been added in Favourites!");
  };

  const handleRemoveFavourite: any = (name: string, id: string) => {
    removeFavourite(id);
    setFavourite(false);
    toast.success(name + " has been removed from Favourites!");
  };

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

  useEffect(() => {
    const favourite: string[] = getFavourite();
    const exist: undefined | string = favourite.find(
      (elem) => elem === song.data.id
    );

    if (exist) setFavourite(true);
  }, []);

  return (
    <div className="card">
      <div className="position-relative">
        <img
          src={song.data.albumOfTrack.coverArt.sources[2].url}
          className="card-img-top"
          alt=""
        />
        <span className="position-absolute top-0 end-0 bg-primary text-white px-2 mt-2 me-2 rounded-circle fs-3">
          {isFavourite ? (
            <AiFillHeart
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleRemoveFavourite(song.data.albumOfTrack.name, song.data.id)
              }
            />
          ) : (
            <AiOutlineHeart
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleAddFavourite(song.data.albumOfTrack.name, song.data.id)
              }
            />
          )}
        </span>
      </div>
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
