import AdminPage from "./pages/AdminPage"
import AuthPage from "./pages/AuthPage"
import CollectionPage from "./pages/CollectionPage"
import ItemPage from "./pages/ItemPage"
import MainPage from "./pages/MainPage"
import UserPage from "./pages/UserPage"
import { ADMIN_ROUTE, COLLECTION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE, ITEM_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: COLLECTION_ROUTE + '/:id',
        Component: CollectionPage
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: ItemPage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    }
]