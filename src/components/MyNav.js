import { Container, Nav, Navbar, Form } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';

function MyNav({ theme, isDarkTheme, onThemeToggle, onSearchChange }) {
  return (
    <Navbar bg={theme.card} variant={theme.text} expand="lg">
      <Container>
        <Navbar.Brand href="#" style={{ color: theme.text === 'dark' ? '#0d6efd' : '#8A2BE2' }}>
          Horror Books
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
          </Nav>
          <Form className="d-flex me-2">
            <Form.Control
              type="search"
              placeholder="Cerca un libro..."
              className={`me-2 bg-${theme.card} text-${theme.text} border-${theme.border}`}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form>
          <ThemeToggle isDark={isDarkTheme} onToggle={onThemeToggle} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav; 