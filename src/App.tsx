import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: []
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;