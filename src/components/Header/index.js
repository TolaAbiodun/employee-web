import React, {useContext, useCallback} from 'react';
import { Container, Navbar, Button} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useUserRequired } from 'utils/hooks';
import { UserContext } from 'components';
import { logout } from 'pages/Home/sdk';
import { LOGIN_URL } from 'config/urls';

const Navigation = () => {
    useUserRequired();
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = useCallback(() => {
    logout().then(() => {
        setUser(null);
        history.push(LOGIN_URL);
    });
    }, [setUser, history]);

    if (!user) {
    return null;
    }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Employee Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end">
            <Navbar.Text>
              Signed in as: <span>{user.email}</span>
            </Navbar.Text>
            <Button
              variant="danger"
              style={{ marginLeft: 15 }}
              onClick={handleLogout}>
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;