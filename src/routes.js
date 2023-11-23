import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/AuthPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ItemPage } from "./pages/ItemPage";
import { MainPage } from "./pages/MainPage";
import { UserPage } from "./pages/UserPage";
import { Routes } from "./utils/consts";

export const authRoutes = [
    {
        path: Routes.ADMIN,
        Component: AdminPage,
    },
];

export const publicRoutes = [
    {
        path: Routes.LOGIN,
        Component: AuthPage,
    },
    {
        path: Routes.REGISTRATION,
        Component: AuthPage,
    },
    {
        path: Routes.MAIN,
        Component: MainPage,
    },
    {
        path: Routes.COLLECTION + "/:id",
        Component: CollectionPage,
    },
    {
        path: Routes.ITEM + "/:id",
        Component: ItemPage,
    },
    {
        path: Routes.USER + "/:id",
        Component: UserPage,
    },
];
