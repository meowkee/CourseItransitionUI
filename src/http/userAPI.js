import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, password) => {
    const { data } = await $host.post("api/user/registration", {
        name,
        email,
        password,
    });
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", {
        email,
        password,
    });
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
};

export const checkAuthorization = async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
};

export const fetchUserById = async (id) => {
    const { data } = await $host.get("api/user/" + id);
    return data;
}
