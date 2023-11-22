import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { toast } from "react-toastify";
import { validateFields } from "../utils/validation/authPageValidation.js";

const AuthPage = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === Routes.LOGIN;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const signUpOrIn = async () => {
        try {
            if (!validateFields(name, email, password)) {
                toast.error("All fields are required");
                return;
            }
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(Routes.MAIN);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    };

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
                            to={isLogin ? Routes.REGISTRATION : Routes.LOGIN}
                            className="font-medium text-green-700 hover:text-green-500"
                        >
                            {isLogin
                                ? "create an account"
                                : "log in to your account"}
                        </Link>
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    {isLogin ? (
                        <>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-2">
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-t-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="py-1">
                                    <input
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-t-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="py-1">
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="py-1">
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full
                                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                            rounded-b-md focus:outline-none focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                            onClick={signUpOrIn}
                        >
                            {isLogin ? "Log in" : "Register"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AuthPage;
