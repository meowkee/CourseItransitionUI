import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import CustomNavbar from "./components/CustomNavbar";

const App = () => {
    return (
        <BrowserRouter>
            <CustomNavbar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
