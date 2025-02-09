import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './components/MyNav';          
import MyFooter from './components/MyFooter';    
import Welcome from './components/Welcome';      
import AllTheBooks from './components/AllTheBooks';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const themeStyles = {
    dark: {
      background: 'black',
      text: 'light',
      card: 'dark',
      border: 'secondary'
    },
    light: {
      background: '#f8f9fa',
      text: 'dark',
      card: 'light',
      border: 'primary'
    }
  };

  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;

  return (
    <BrowserRouter>
      <div className={`App bg-${currentTheme.background} min-vh-100`}>
        <MyNav 
          theme={currentTheme}
          isDarkTheme={isDarkTheme}
          onThemeToggle={() => setIsDarkTheme(!isDarkTheme)}
          onSearchChange={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={
            <>
              <Welcome theme={currentTheme} />
              <AllTheBooks theme={currentTheme} searchQuery={searchQuery} />
            </>
          } />
          <Route path="/book/:asin" element={<BookDetails theme={currentTheme} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MyFooter theme={currentTheme} />
      </div>
    </BrowserRouter>
  );
}

export default App;