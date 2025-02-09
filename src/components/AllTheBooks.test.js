import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllTheBooks from './AllTheBooks';
import horror from '../data/horror.json';

// Creiamo un wrapper con BrowserRouter per i test
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('AllTheBooks Component', () => {
  // Cleanup dopo ogni test
  afterEach(() => {
    cleanup();
  });

  const mockTheme = {
    body: 'light',
    text: 'dark',
    card: 'light',
    border: 'secondary'
  };

  test('renderizza una card per ogni libro nel file json', () => {
    render(
      <TestWrapper>
        <AllTheBooks 
          books={horror} 
          theme={mockTheme} 
          searchQuery=""
        />
      </TestWrapper>
    );
    
    // Verifica che il numero di cards corrisponda al numero di libri
    const cards = screen.getAllByTestId('book-card');
    expect(cards).toHaveLength(horror.length);
  });

  test('filtra correttamente i libri in base alla ricerca', () => {
    const searchQuery = 'it'; // Cerchiamo libri che contengono "it" nel titolo
    
    render(
      <TestWrapper>
        <AllTheBooks 
          books={horror} 
          theme={mockTheme} 
          searchQuery={searchQuery}
        />
      </TestWrapper>
    );
    
    // Prendiamo tutti i libri visualizzati
    const displayedBooks = screen.getAllByTestId('book-card');
    
    // Filtriamo manualmente i libri che dovrebbero corrispondere alla ricerca
    const expectedBooks = horror.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Verifichiamo che il numero di libri visualizzati corrisponda
    expect(displayedBooks).toHaveLength(expectedBooks.length);
    
    // Verifichiamo che i titoli dei libri visualizzati siano quelli corretti
    expectedBooks.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test('mostra tutti i libri quando la ricerca è vuota', () => {
    render(
      <TestWrapper>
        <AllTheBooks 
          books={horror} 
          theme={mockTheme} 
          searchQuery=""
        />
      </TestWrapper>
    );
    
    const displayedBooks = screen.getAllByTestId('book-card');
    expect(displayedBooks).toHaveLength(horror.length);
  });

  test('il filtro è case-insensitive', () => {
    const searchQuery = 'IT'; // Cerchiamo con lettere maiuscole
    
    render(
      <TestWrapper>
        <AllTheBooks 
          books={horror} 
          theme={mockTheme} 
          searchQuery={searchQuery}
        />
      </TestWrapper>
    );
    
    const displayedBooks = screen.getAllByTestId('book-card');
    const expectedBooks = horror.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    expect(displayedBooks).toHaveLength(expectedBooks.length);
  });

  test('non mostra commenti al caricamento iniziale', () => {
    render(
      <TestWrapper>
        <AllTheBooks 
          books={horror} 
          theme={mockTheme} 
          searchQuery=""
        />
      </TestWrapper>
    );
    
    // Verifica che non ci siano elementi comment-area nel DOM
    const commentAreas = screen.queryAllByTestId('comment-area');
    expect(commentAreas).toHaveLength(0);

    // Verifica che non ci siano SingleComment nel DOM
    const comments = screen.queryAllByTestId('single-comment');
    expect(comments).toHaveLength(0);

    // Verifica che non ci siano form per aggiungere commenti
    const commentForms = screen.queryAllByTestId('add-comment-form');
    expect(commentForms).toHaveLength(0);
  });
});