import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddComment from './AddComment';

describe('AddComment Component', () => {
  const theme = {
    text: 'light',
    card: 'dark'
  };

  test('renderizza correttamente tutti gli elementi base', () => {
    render(
      <AddComment 
        asin="test123" 
        onCommentAdded={() => {}} 
        theme={theme}
      />
    );

    // Verifica la presenza del form
    const form = screen.getByTestId('add-comment-form');
    expect(form).toBeInTheDocument();

    // Verifica la presenza dei campi del form con htmlFor
    const commentLabel = screen.getByLabelText('Commento');
    expect(commentLabel).toBeInTheDocument();

    const ratingLabel = screen.getByLabelText('Voto');
    expect(ratingLabel).toBeInTheDocument();

    // Verifica la presenza del pulsante di invio
    const submitButton = screen.getByRole('button', { name: /aggiungi commento/i });
    expect(submitButton).toBeInTheDocument();
  });
}); 