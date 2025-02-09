import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentArea from './CommentArea';

function SingleBook({ book, theme, selected, onSelect }) {
  return (
    <article>
      <Link 
        to={`/book/${book.asin}`} 
        className="text-decoration-none"
      >
        <Card 
          data-testid={`book-card-${book.asin}`}
          className={`h-100 bg-${theme.card} text-${theme.text} ${
            selected ? `border border-${theme.border} border-3` : ''
          }`}
          onClick={() => onSelect(book.asin)}
        >
          <Card.Img variant="top" src={book.img} alt={book.title} />
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
      {selected && (
        <CommentArea 
          asin={book.asin} 
          selected={selected}
          theme={theme}
          data-testid="comment-area"
        />
      )}
    </article>
  );
}

export default SingleBook;