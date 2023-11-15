import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/consts";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CustomNavbar = () => {
    const location = useLocation();
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to={MAIN_ROUTE}
                                    className={classNames(
                                        location.pathname === MAIN_ROUTE
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                >
                                    Main page
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="bg-gray-900 text-gray-300 hover:bg-green-900 hover:text-white px-3 py-2 text-sm font-medium rounded-md"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/registration"
                            className="bg-gray-900 text-gray-300 hover:bg-green-900 hover:text-white px-3 py-2 text-sm font-medium rounded-md"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};

export default CustomNavbar;
