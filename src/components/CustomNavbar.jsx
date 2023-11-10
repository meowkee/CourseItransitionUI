import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import StyledNavLink from "../styles/CustomNavbarStyles";

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <StyledNavLink
                    to="/"
                    style={{
                        color: "white",
                        fontSize: "3vh",
                        textDecoration: "none",
                    }}
                    className="me-4"
                >
                    Main page
                </StyledNavLink>
                <NavLink to="/" style={{ color: "white" }}>
                    Main page
                </NavLink>
                <Form className="d-flex ms-auto">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
