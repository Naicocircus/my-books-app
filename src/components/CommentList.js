import { ListGroup } from 'react-bootstrap';
import SingleComment from './SingleComment';

function CommentList({ comments, onCommentDeleted, onCommentEdited, theme }) {
  return (
    <ListGroup className="mt-2" data-testid="comments-list">
      {comments.map((comment) => (
        <ListGroup.Item key={comment._id} className={`bg-${theme.card} text-${theme.text}`}>
          <SingleComment 
            comment={comment} 
            onCommentDeleted={onCommentDeleted}
            onCommentEdited={onCommentEdited}
            theme={theme}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentList; 