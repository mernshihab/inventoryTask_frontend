import MainLayout from "@/Layout/MainLayout";
import Home from "@/pages/main/Home";
import AddProduct from "../pages/main/AddProduct";
import Categories from "../pages/main/Categories";
import AddCategory from "../pages/main/AddCategory";
import EditCategory from "../pages/main/EditCategory";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/add-category",
      element: <AddCategory />,
    },
    {
      path: "/edit-category/:id",
      element: <EditCategory />,
    },
  ],
};
