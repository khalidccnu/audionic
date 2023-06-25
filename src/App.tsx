import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./utils/keycloak.ts";
import PrivateRoute from "./routes/PrivateRoute.tsx";
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
      element: (
        <PrivateRoute>
          <Root />
        </PrivateRoute>
      ),
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

  return (
    <ReactKeycloakProvider
      initOptions={{ onLoad: "login-required" }}
      authClient={keycloak}
    >
      <RouterProvider router={router} />
    </ReactKeycloakProvider>
  );
};

export default App;
