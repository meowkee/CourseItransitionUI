import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} Component={Component} exact />
                ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} exact />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
});

export default AppRouter;
