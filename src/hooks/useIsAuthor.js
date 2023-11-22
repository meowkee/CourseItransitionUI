import { useContext } from "react";
import { Context } from "..";
import { Roles } from "../utils/consts";

export const useIsAuthor = (id) => {
    const {
        user: { isAuth, user },
    } = useContext(Context);
    if (!isAuth) return false;
    return user.id.toString() === id || user.role === Roles.ADMIN;
};
