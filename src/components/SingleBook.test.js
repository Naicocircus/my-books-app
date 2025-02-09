import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SingleBook from './SingleBook';

const theme = {
  text: 'light',
  card: 'dark',
  border: 'secondary'
};

const mockBook = {
  asin: 'test123',
  title: 'Test Book',
  img: 'test.jpg',
  author: 'Test Author',
  price: 9.99,
  category: 'horror'
};

const wrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('SingleBook Component', () => {
  jest.setTimeout(15000);

  beforeEach(() => {
    // Reset dei mock
    jest.resetAllMocks();
    
    // Mock della fetch per i commenti
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('/comments/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { 
              _id: '1',
              comment: 'Ottimo libro!',
              rate: 5,
              elementId: 'test123'
            },
            {
              _id: '2',
              comment: 'Molto interessante',
              rate: 4,
              elementId: 'test123'
            }
          ])
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders book information correctly', () => {
    render(
      <SingleBook 
        book={mockBook}
        theme={theme}
        selected={false}
        onSelect={() => {}}
      />, 
      { wrapper }
    );
    
    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockBook.img);
    expect(screen.getByText(/9.99/)).toBeInTheDocument();
  });

  test('shows comment area when selected', async () => {
    render(
      <SingleBook 
        book={mockBook}
        theme={theme}
        selected={true}
        onSelect={() => {}}
      />, 
      { wrapper }
    );
    
    await waitFor(() => {
      const commentArea = screen.getByTestId('comment-area');
      expect(commentArea).toBeInTheDocument();
    });
  });

  test('cambia il bordo quando viene cliccato', async () => {
    const mockOnSelect = jest.fn();
    
    render(
      <BrowserRouter>
        <SingleBook 
          book={mockBook} 
          theme={theme}
          selected={false}
          onSelect={mockOnSelect}
        />
      </BrowserRouter>
    );

    const bookCard = screen.getByTestId(`book-card-${mockBook.asin}`);
    
    expect(bookCard).not.toHaveClass(`border-${theme.border}`);
    
    fireEvent.click(bookCard);
    expect(mockOnSelect).toHaveBeenCalledWith(mockBook.asin);
  });

  test('cambia il bordo correttamente quando si selezionano libri diversi', async () => {
    const mockBook2 = {
      asin: 'test456',
      title: 'Another Test Book',
      img: 'test2.jpg',
      author: 'Another Author',
      price: 19.99,
      category: 'horror'
    };

    const { rerender } = render(
      <BrowserRouter>
        <div>
          <SingleBook 
            book={mockBook} 
            theme={theme}
            selected={false}
            onSelect={() => {}}
          />
          <SingleBook 
            book={mockBook2} 
            theme={theme}
            selected={false}
            onSelect={() => {}}
          />
        </div>
      </BrowserRouter>
    );

    const firstBookCard = screen.getByTestId(`book-card-${mockBook.asin}`);
    const secondBookCard = screen.getByTestId(`book-card-${mockBook2.asin}`);
    
    // Verifica stato iniziale
    expect(firstBookCard).not.toHaveClass(`border-${theme.border}`);
    expect(secondBookCard).not.toHaveClass(`border-${theme.border}`);
    
    // Seleziona primo libro
    rerender(
      <BrowserRouter>
        <div>
          <SingleBook 
            book={mockBook} 
            theme={theme}
            selected={true}
            onSelect={() => {}}
          />
          <SingleBook 
            book={mockBook2} 
            theme={theme}
            selected={false}
            onSelect={() => {}}
          />
        </div>
      </BrowserRouter>
    );

    expect(firstBookCard).toHaveClass(`border-${theme.border}`);
    expect(secondBookCard).not.toHaveClass(`border-${theme.border}`);
    
    // Seleziona secondo libro
    rerender(
      <BrowserRouter>
        <div>
          <SingleBook 
            book={mockBook} 
            theme={theme}
            selected={false}
            onSelect={() => {}}
          />
          <SingleBook 
            book={mockBook2} 
            theme={theme}
            selected={true}
            onSelect={() => {}}
          />
        </div>
      </BrowserRouter>
    );

    expect(firstBookCard).not.toHaveClass(`border-${theme.border}`);
    expect(secondBookCard).toHaveClass(`border-${theme.border}`);
  });

  test('mostra le recensioni quando viene selezionato il libro', async () => {
    // Mock della fetch per i commenti
    const mockComments = [
      { 
        _id: '1',
        comment: 'Ottimo libro!',
        rate: 5,
        elementId: 'test123'
      },
      {
        _id: '2',
        comment: 'Molto interessante',
        rate: 4,
        elementId: 'test123'
      }
    ];

    // Mock della fetch solo per le chiamate ai commenti
    global.fetch = jest.fn((url) => {
      if (url.includes('/comments/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockComments)
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      });
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <SingleBook 
            book={mockBook} 
            theme={theme}
            selected={true}
            onSelect={() => {}}
          />
        </BrowserRouter>
      );
    });

    // Aspetta che l'area commenti sia visibile
    const commentArea = await screen.findByTestId('comment-area');
    expect(commentArea).toBeInTheDocument();

    // Aspetta che la lista commenti sia visibile
    const commentsList = await screen.findByTestId('comments-list');
    expect(commentsList).toBeInTheDocument();

    // Aspetta che i commenti siano caricati
    const comments = await screen.findAllByText(/Ottimo libro!|Molto interessante/);
    expect(comments).toHaveLength(2);

    // Verifica i rating
    const ratings = await screen.findAllByText(/Voto: [4-5]\/5/);
    expect(ratings).toHaveLength(2);
  });
});
