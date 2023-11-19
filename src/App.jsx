import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import CustomNavbar from "./components/CustomNavbar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { checkAuthorization } from "./http/userAPI";

const App = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const userData = await checkAuthorization();
            user.setUser(userData);
            user.setIsAuth(true);
          } catch (e) {
            console.error("Error checking authorization:", e);
          }
        };
    
        const token = localStorage.getItem("token");
        if (token) {
          checkAuth();
        }
      }, [user]);

    return (
        <BrowserRouter>
            <CustomNavbar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
