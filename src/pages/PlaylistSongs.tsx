import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { getPlaylist } from "../utils";
import PlaylistSongCard from "../components/PlaylistSongCard.tsx";

const PlaylistSongs = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<null | string[]>(null);
  const [isRefetch, setRefetch] = useState(false);

  const handlePlaylistSong: any = (sid: string) => {
    const playlist = getPlaylist();
    const findIndex = playlist.findIndex((elem) => elem.id === id);
    playlist[findIndex].songs.splice(playlist[findIndex].songs.indexOf(sid), 1);

    localStorage.setItem("playlist", JSON.stringify(playlist));
    toast.error("Song has been removed from playlist!");
    setRefetch(!isRefetch);
  };

  useEffect(() => {
    const playlist = getPlaylist();
    const findIndex = playlist.findIndex((elem) => elem.id === id);

    (async () => {
      if (playlist[findIndex].songs?.length) {
        await axios
          .get(`https://spotify23.p.rapidapi.com/tracks/`, {
            params: {
              ids: playlist[findIndex].songs.join(","),
            },
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
          })
          .then((response: any) => {
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
                <PlaylistSongCard
                  song={song}
                  setRefetch={setRefetch}
                  handlePlaylistSong={handlePlaylistSong}
                />
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

export default PlaylistSongs;
