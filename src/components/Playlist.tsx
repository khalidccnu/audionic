import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Playlist = ({ playlist, handleRemovePlaylist }: any) => {
  const location = useLocation();

  return (
    <div className="playlist position-relative d-flex align-items-center justify-content-center border rounded text-center">
      {location.pathname.includes("/playlists") ? (
        <span
          style={{ fontSize: "0.8rem", cursor: "pointer" }}
          className="delete-button d-none position-absolute top-0 start-100 translate-middle px-2 py-1 me-2 rounded-pill text-danger"
          onClick={(_) => handleRemovePlaylist(playlist.id)}
        >
          <FaTrash />
        </span>
      ) : null}
      <Link
        to={"/playlists/" + playlist.id}
        className="d-inline-block w-100 py-2 fw-bold text-dark text-decoration-none"
      >
        {playlist.name}
      </Link>
    </div>
  );
};

export default Playlist;
