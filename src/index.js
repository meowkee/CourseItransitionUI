import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import "./index.css";
import CollectionStore from "./store/CollectionStore";
import ThemeStore from "./store/ThemeStore";
import ItemStore from "./store/ItemStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                collections: new CollectionStore(),
                themes: new ThemeStore(),
                items: new ItemStore(),
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>
);
