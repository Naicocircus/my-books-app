import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authorizationHeader } from '../utils/auth';

function AddComment({ asin, onCommentAdded, theme }) {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('1');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          headers: {
            ...authorizationHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            comment,
            rate: parseInt(rate),
            elementId: asin
          })
        }
      );
      if (response.ok) {
        setComment('');
        setRate('1');
        onCommentAdded();
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del commento:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3" data-testid="add-comment-form">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="comment-text">Commento</Form.Label>
        <Form.Control
          id="comment-text"
          as="textarea"
          rows={3}
          className={`bg-${theme.card} text-${theme.text}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="rating-select">Voto</Form.Label>
        <Form.Select
          id="rating-select"
          className={`bg-${theme.card} text-${theme.text}`}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Aggiungi Commento
      </Button>
    </Form>
  );
}

export default AddComment; 