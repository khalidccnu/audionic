import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CgMenuLeft } from "react-icons/cg";
import {
  FaAngleLeft,
  FaHeart,
  FaHome,
  FaPlay,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import keycloak from "./utils/keycloak.ts";

const Root = () => {
  const [hbMenu, setHbMenu] = useState(true);

  const handleResize: any = () => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="root">
      <div
        className={`sidebar position-fixed ${
          hbMenu ? "inactive" : "start-0"
        } top-0 h-100 p-5 bg-white overflow-auto`}
      >
        <FaAngleLeft
          style={{ cursor: "pointer" }}
          className="d-md-none fs-3 mb-5"
          onClick={() => setHbMenu(true)}
        />
        <div className="sidebar-content">
          <ul className="list-unstyled d-flex flex-column gap-3 px-3 px-md-5 py-5 bg-light rounded">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link d-flex gap-1 px-3 pt-2 pb-1 rounded text-dark fw-bold " +
                  (isActive ? "active" : "inactive")
                }
              >
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="search"
                className={({ isActive }) =>
                  "nav-link d-flex gap-1 px-3 pt-2 pb-1 rounded text-dark fw-bold " +
                  (isActive ? "active" : "inactive")
                }
              >
                <FaSearch />
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  "nav-link d-flex gap-1 px-3 pt-2 pb-1 rounded text-dark fw-bold " +
                  (isActive ? "active" : "inactive")
                }
              >
                <FaHeart />
                <span>Favourites</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="playlists"
                className={({ isActive }) =>
                  "nav-link d-flex gap-1 px-3 pt-2 pb-1 rounded text-dark fw-bold " +
                  (isActive ? "active" : "inactive")
                }
              >
                <FaPlay />
                <span>Playlists</span>
              </NavLink>
            </li>
            {keycloak.authenticated ? (
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  className="nav-link d-flex gap-1 px-3 pt-2 pb-1 rounded text-dark fw-bold inactive"
                  onClick={() => keycloak.logout()}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div>
        <div className="container">
          <CgMenuLeft
            style={{ cursor: "pointer" }}
            className="d-md-none fs-3 mt-3"
            onClick={() => setHbMenu(false)}
          />
        </div>
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default Root;
