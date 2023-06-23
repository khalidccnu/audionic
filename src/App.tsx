import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";
import Search from "./pages/Search.tsx";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
