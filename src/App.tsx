import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
      children: []
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;