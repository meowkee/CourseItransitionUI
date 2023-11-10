import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MainPage from "../pages/MainPage";

const AppRouter = observer(() => {
    return (
        <Routes>
            <Route path="" Component={MainPage} />
            <Route path="*" element={<Navigate />} />
        </Routes>
    );
});

export default AppRouter;
