import { Container, Alert } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>404 - Pagina non trovata</Alert.Heading>
        <p>
          Ci dispiace, la pagina che stai cercando non esiste.
        </p>
      </Alert>
    </Container>
  );
}

export default NotFound;