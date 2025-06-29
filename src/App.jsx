import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { mainRoutes } from "./Routes/mainRoutes";

const router = createBrowserRouter([mainRoutes]);

export default function App() {


  return <RouterProvider router={router} />;
}
