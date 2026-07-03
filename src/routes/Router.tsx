import { Outlet, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Navbar from "../components/layout/Navbar";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "home",
        element: <SearchPage />,
      },
      {
        path: "profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;