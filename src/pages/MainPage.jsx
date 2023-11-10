import { Container } from "react-bootstrap";
import MostRecentlyTable from "../components/MostRecentlyTable";

const MainPage = () => {
    return (
        <Container className="mt-3">
            <h3>Most recently added items:</h3>
            <MostRecentlyTable />
        </Container>
    );
};

export default MainPage;
