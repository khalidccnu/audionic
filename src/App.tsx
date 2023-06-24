import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Favourites from "./pages/Favourites.tsx";
import Playlists from "./pages/Playlists.tsx";
import PlaylistSongs from "./pages/PlaylistSongs.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "favourites",
          element: <Favourites />,
        },
        {
          path: "playlists",
          element: <Playlists />,
        },
        {
          path: "playlists/:id",
          element: <PlaylistSongs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
