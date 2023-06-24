import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getPlaylist } from "../utils";
import Playlist from "../components/Playlist.tsx";
import toast from "react-hot-toast";

const Playlists = () => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [playlists, setPlaylists] = useState<null | object[]>(null);
  const [isRefetch, setRefetch] = useState(false);

  const handleAddPlaylist: any = () => {
    if (!input) return false;

    const playlist = getPlaylist();

    playlist.push({
      id: Math.random().toString(36).substring(2, 7),
      name: input,
      songs: [],
    });
    localStorage.setItem("playlist", JSON.stringify(playlist));

    setInput("");
    setRefetch(!isRefetch);
    toast.success("New playlist has been created!");
  };

  const handleRemovePlaylist: any = (id: string) => {
    const playlist = getPlaylist();
    const filterPL = playlist.filter((pl) => pl.id !== id);
    localStorage.setItem("playlist", JSON.stringify(filterPL));

    setRefetch(!isRefetch);
    toast.success("Playlist has been deleted!");
  };

  useEffect(() => {
    const playlist = getPlaylist();
    setPlaylists(playlist);
    setLoading(false);
  }, [isRefetch]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-end mb-5">
          <button
            type="button"
            className="d-inline-flex align-items-center gap-1 btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          >
            <span>New</span>
            <FaPlus />
          </button>
        </div>
        <div>
          {!loading ? (
            playlists?.length ? (
              <div className="playlists">
                {playlists?.map((pl) => (
                  <Playlist
                    playlist={pl}
                    handleRemovePlaylist={handleRemovePlaylist}
                  />
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
      <div className="modal fade" id="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Playlist</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Type your playlist name..."
                className="form-control form-control-sm"
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAddPlaylist}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playlists;
