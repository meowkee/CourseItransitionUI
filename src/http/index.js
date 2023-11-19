import axios from "axios";

const $host = axios.create({
    //baseURL: "https://course-itransition-api.vercel.app/",
    baseURL: "http://localhost:3001/",
});

const $authHost = axios.create({
    //baseURL: "https://course-itransition-api.vercel.app/",
    baseURL: "http://localhost:3001/",
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
