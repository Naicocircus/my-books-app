import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { authorizationHeader } from '../utils/auth';

function SingleComment({ comment, onCommentDeleted, onCommentEdited, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [editedRate, setEditedRate] = useState(comment.rate);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: 'DELETE',
          headers: authorizationHeader
        }
      );
      if (response.ok) {
        onCommentDeleted();
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione del commento:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: 'PUT',
          headers: {
            ...authorizationHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            comment: editedComment,
            rate: parseInt(editedRate),
            elementId: comment.elementId
          })
        }
      );
      if (response.ok) {
        setIsEditing(false);
        onCommentEdited();
      }
    } catch (error) {
      console.error('Errore durante la modifica del commento:', error);
    }
  };

  return (
    <div 
      className={`bg-${theme.card} text-${theme.text} d-flex justify-content-between align-items-center list-group-item`}
      data-testid="single-comment"
    >
      {isEditing ? (
        <div className="w-100">
          <textarea
            className={`form-control bg-${theme.card} text-${theme.text} mb-2`}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <select
            className={`form-select bg-${theme.card} text-${theme.text} mb-2`}
            value={editedRate}
            onChange={(e) => setEditedRate(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <Button variant="success" onClick={handleEdit} className="me-2">
            Salva
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Annulla
          </Button>
        </div>
      ) : (
        <>
          <div>
            <p className="mb-1">{comment.comment}</p>
            <small>Voto: {comment.rate}/5</small>
          </div>
          <div>
            <Button 
              variant="primary" 
              onClick={() => setIsEditing(true)} 
              className="btn-sm me-2"
            >
              Modifica
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete} 
              className="btn-sm"
            >
              Elimina
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleComment; 