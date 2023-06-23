import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import Search from "./pages/Search.tsx";
import Favourites from "./pages/Favourites.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "favourites",
          element: <Favourites />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
