import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex items-center justify-center bg-gray-50 py-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 border p-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? "Log in" : "Register"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        or{" "}
                        <Link
                            to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
                            className="font-medium text-green-700 hover:text-green-500"
                        >
                            {isLogin
                                ? "create an account"
                                : "log in to your account"}
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    {isLogin ? (
                        <>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-2">
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-t-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-1">
                                    <label htmlFor="name" className="sr-only">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-t-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="py-1">
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="py-1">
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-b-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4
                                border border-transparent text-sm font-medium rounded-md text-white
                                bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2
                                focus:ring-offset-2"
                        >
                            {isLogin ? "Log in" : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default AuthPage;
