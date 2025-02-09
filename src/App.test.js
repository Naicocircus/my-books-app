import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock di react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <a href="/">{children}</a>
}));

describe('App Component', () => {
  test('renders basic app elements', () => {
    render(<App />);

    // Verifica il titolo nella navbar usando getAllByText per gestire più occorrenze
    const titleElements = screen.getAllByText(/horror books/i);
    expect(titleElements.length).toBeGreaterThan(0);

    // Verifica la barra di ricerca
    const searchInput = screen.getByPlaceholderText(/cerca un libro/i);
    expect(searchInput).toBeInTheDocument();

    // Verifica il pulsante del tema
    const themeButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(themeButton).toBeInTheDocument();
  });
}); 