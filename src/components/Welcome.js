import { Container, Alert } from 'react-bootstrap';

function Welcome() {
  return (
    <Container className="my-5">
      <h1 className="text-danger mb-4">Horror Books Store</h1>
      <Alert variant="dark" className="border border-purple">
        <Alert.Heading style={{ color: '#8A2BE2' }}>Preparati a rabbrividire!</Alert.Heading>
        <p>
          Esplora la nostra vasta collezione di libri horror. 
          Dalle storie di fantasmi ai thriller psicologici, 
          troverai tutto ciò che serve per una notte insonne.
        </p>
      </Alert>
    </Container>
  );
}

export default Welcome; 