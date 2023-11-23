import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { Roles, Routes } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const CustomNavbar = observer(() => {
    const location = useLocation();
    const { user, items } = useContext(Context);

    const searchHandler = (e) => {
        items.setSearch(e.target.value);
    }

    const logoutHandler = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem("token");
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to={Routes.MAIN}
                                    className={classNames(
                                        location.pathname === Routes.MAIN
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                >
                                    Main page
                                </Link>
                                {user.isAuth && (
                                    <Link
                                        to={Routes.USER + `/${user.user.id}`}
                                        className={classNames(
                                            location.pathname ===
                                                Routes.USER + `/${user.user.id}`
                                                ? "bg-gray-700 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        My collections
                                    </Link>
                                )}
                                {user.user.role === Roles.ADMIN && (
                                    <Link
                                        to={Routes.ADMIN}
                                        className={classNames(
                                            location.pathname === Routes.ADMIN
                                                ? "bg-gray-700 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Admin page
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex ml-auto items-center pl-4">
                            <input
                                className="px-2 py-1 bg-gray-700 text-white rounded-md"
                                type="text"
                                placeholder="Search"
                                onChange={searchHandler}
                            />
                        </div>
                    </div>
                    {user.isAuth ? (
                        <div className="flex items-center space-x-4 text-gray-300">
                            <p>Hello {user.user.name}!</p>
                            <button
                                onClick={logoutHandler}
                                className="bg-gray-900 text-gray-300 hover:bg-red-900 hover:text-white px-3 py-2 text-sm font-medium rounded-md"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                to={Routes.LOGIN}
                                className="bg-gray-900 text-gray-300 hover:bg-green-900 hover:text-white px-3 py-2 text-sm font-medium rounded-md"
                            >
                                Log In
                            </Link>
                            <Link
                                to={Routes.REGISTRATION}
                                className="bg-gray-900 text-gray-300 hover:bg-green-900 hover:text-white px-3 py-2 text-sm font-medium rounded-md"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Disclosure>
    );
});
