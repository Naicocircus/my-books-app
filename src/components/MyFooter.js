import { Container } from 'react-bootstrap';

function MyFooter() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <div className="text-center">
          <p>© 2024 Horror Books - Tutti i diritti riservati</p>
          <p className="mb-0" style={{ color: '#8A2BE2' }}>La tua libreria dell'orrore</p>
        </div>
      </Container>
    </footer>
  );
}

export default MyFooter; 