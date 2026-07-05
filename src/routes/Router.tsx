import { Outlet, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";

const Layout = () => {
return (
<>
<Navbar />
<main className="app-main">
<Outlet />
</main>
<Footer />
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
path: "profile/:username/:tab",
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