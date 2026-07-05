import { Outlet, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import NotFoundPage from "@pages/NotFound/NotFoundPage";
import ProfilePage from "@pages/Profile/ProfilePage";
import SearchPage from "@pages/Search/SearchPage";
import FollowersPage from "@pages/Followers/FollowersPage";
import FollowingPage from "@pages/Following/FollowingPage";

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
path: "profile/:username/followers",
element: <FollowersPage />,
},
{
path: "profile/:username/following",
element: <FollowingPage />,
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