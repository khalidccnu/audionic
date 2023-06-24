import { useEffect, useState } from "react";
import { getPlaylist } from "../utils";
import Playlist from "./Playlist.tsx";

const HomePlaylists = () => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<null | object[]>(null);

  useEffect(() => {
    const playlist = getPlaylist();
    setPlaylists(playlist);
    setLoading(false);
  }, []);

  return (
    <section className="py-3">
      <div className="container">
        <h3 className="mb-3">Playlists</h3>
        <div>
          {!loading ? (
            playlists?.length ? (
              <div className="playlists">
                {playlists?.map((pl) => (
                  <Playlist playlist={pl} />
                ))}
              </div>
            ) : (
              <div className="playlists-alert alert alert-info" role="alert">
                You have not added any playlist yet!
              </div>
            )
          ) : (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePlaylists;
