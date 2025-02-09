import { useState, useMemo } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentArea from './CommentArea';
import booksData from '../data/horror.json';

function AllTheBooks({ theme, searchQuery }) {
  const [books] = useState(booksData);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (asin) => {
    setSelectedBook(asin === selectedBook ? null : asin);
  };

  // Filtra i libri in base alla ricerca
  const filteredBooks = useMemo(() => {
    return books.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  return (
    <Container>
      <Row className="g-4" data-testid="books-container">
        {filteredBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3}>
            <Link 
              to={`/book/${book.asin}`} 
              className="text-decoration-none"
            >
              <Card 
                className={`h-100 bg-${theme.card} text-${theme.text} book-card ${
                  selectedBook === book.asin ? `border border-${theme.border} border-3` : ''
                }`}
                onClick={() => handleSelectBook(book.asin)}
                style={{ cursor: 'pointer' }}
                data-testid="book-card"
              >
                <Card.Img 
                  variant="top" 
                  src={book.img} 
                  alt={book.title} 
                  className="book-card-image"
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    Autore: {book.author}
                    <br />
                    Prezzo: {book.price} €
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <CommentArea asin={book.asin} selected={selectedBook === book.asin} theme={theme} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllTheBooks;