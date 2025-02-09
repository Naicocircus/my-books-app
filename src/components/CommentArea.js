import { useState, useEffect, useCallback } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import CommentList from './CommentList';
import AddComment from './AddComment';
import { authorizationHeader } from '../utils/auth';

function CommentArea({ asin, selected, theme }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!selected) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: authorizationHeader
        }
      );
      
      if (!response.ok) throw new Error('Errore nel caricamento dei commenti');
      const data = await response.json();
      
      // Raggruppiamo gli aggiornamenti di stato
      Promise.resolve().then(() => {
        setComments(data);
        setError(null);
        setIsLoading(false);
      });
    } catch (error) {
      Promise.resolve().then(() => {
        setError(error.message);
        setIsLoading(false);
      });
    }
  }, [asin, selected]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!selected) return null;

  return (
    <div className={`mt-3 text-${theme.text}`} data-testid="comment-area">
      {isLoading && (
        <Spinner 
          animation="border" 
          variant={theme.text} 
          data-testid="loading-spinner"
        />
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoading && !error && (
        <>
          <h3 data-testid="comments-title">Recensioni</h3>
          <CommentList 
            comments={comments} 
            onCommentDeleted={fetchComments}
            onCommentEdited={fetchComments}
            theme={theme}
          />
          <AddComment 
            asin={asin} 
            onCommentAdded={fetchComments} 
            theme={theme}
          />
        </>
      )}
    </div>
  );
}

export default CommentArea; 