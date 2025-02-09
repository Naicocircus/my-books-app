import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentArea from './CommentArea';

const theme = {
  text: 'light',
  card: 'dark',
  border: 'secondary'
};

describe('CommentArea Component', () => {
  beforeEach(() => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ comment: 'test comment', rate: 3, _id: '1' }])
      })
    );
  });

  test('shows loading state initially', async () => {
    let promise;
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => {
        promise = resolve;
      })
    );

    await act(async () => {
      render(
        <CommentArea 
          asin="test123" 
          selected={true} 
          theme={theme}
        />
      );
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await act(async () => {
      promise({
        ok: true,
        json: () => Promise.resolve([])
      });
    });
  });

  test('renderizza correttamente tutti gli elementi dopo il caricamento', async () => {
    await act(async () => {
      render(
        <CommentArea 
          asin="test123" 
          selected={true} 
          theme={theme}
        />
      );
    });

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(screen.getByTestId('comments-title')).toBeInTheDocument();
    expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    expect(screen.getByTestId('add-comment-form')).toBeInTheDocument();
  });

  test('does not render when not selected', async () => {
    await act(async () => {
      render(
        <CommentArea 
          asin="test123" 
          selected={false} 
          theme={theme}
        />
      );
    });
    
    const commentSection = screen.queryByTestId('comment-area');
    expect(commentSection).not.toBeInTheDocument();
  });
});
