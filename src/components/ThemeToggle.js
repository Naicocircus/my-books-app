import { Button } from 'react-bootstrap';
import { BsSun, BsMoon } from 'react-icons/bs';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <Button
      variant={isDark ? "light" : "dark"}
      onClick={onToggle}
      className="rounded-circle p-2 ms-2"
    >
      {isDark ? <BsSun /> : <BsMoon />}
    </Button>
  );
}

export default ThemeToggle;