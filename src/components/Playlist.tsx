import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Playlist = ({ playlist, handleRemovePlaylist }: any) => {
  return (
    <div className="playlist position-relative d-flex align-items-center justify-content-center border rounded text-center">
      <span
        style={{ fontSize: "0.8rem", cursor: "pointer" }}
        className="delete-button d-none position-absolute top-0 start-100 translate-middle px-2 py-1 me-2 rounded-pill text-danger"
        onClick={(_) => handleRemovePlaylist(playlist.id)}
      >
        <FaTrash />
      </span>
      <Link
        to={playlist.id}
        className="d-inline-block w-100 py-2 fw-bold text-dark text-decoration-none"
      >
        {playlist.name}
      </Link>
    </div>
  );
};

export default Playlist;
