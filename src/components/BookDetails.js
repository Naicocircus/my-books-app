import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CommentArea from './CommentArea';
import booksData from '../data/horror.json';

function BookDetails({ theme }) {
  const { asin } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const foundBook = booksData.find(b => b.asin === asin);
    setBook(foundBook);
  }, [asin]);

  if (!book) {
    return <div>Libro non trovato</div>;
  }

  return (
    <Container className="my-5">
      <Button 
        variant={theme.text === 'light' ? 'light' : 'dark'}
        onClick={() => navigate('/')}
        className="mb-3"
      >
        ← Torna alla lista
      </Button>
      
      <Card className={`bg-${theme.card} text-${theme.text}`}>
        <Card.Img 
          variant="top" 
          src={book.img} 
          style={{ maxHeight: '400px', objectFit: 'contain' }} 
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            <strong>Autore:</strong> {book.author}<br />
            <strong>ASIN:</strong> {book.asin}<br />
            <strong>Prezzo:</strong> {book.price} €<br />
            <strong>Categoria:</strong> {book.category}
          </Card.Text>
        </Card.Body>
      </Card>

      <div className={`mt-4 text-${theme.text}`}>
        <h3>Commenti</h3>
        <CommentArea 
          asin={asin} 
          selected={true} 
          theme={theme}
        />
      </div>
    </Container>
  );
}

export default BookDetails;