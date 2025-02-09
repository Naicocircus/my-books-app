import { Form } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  return (
    <Form className="mb-4">
      <Form.Control
        type="text"
        placeholder="Cerca un libro..."
        onChange={(e) => onSearch(e.target.value)}
        className="bg-dark text-light border-secondary"
      />
    </Form>
  );
}

export default SearchBar;