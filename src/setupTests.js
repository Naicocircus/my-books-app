// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure, act } from '@testing-library/react';

// Aumenta il timeout per le query asincrone
configure({ asyncUtilTimeout: 5000 });

// Sopprime i warning di act() nei test
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  // Mock delle funzioni del browser
  global.fetch = jest.fn();
  
  // Imposta un timeout più lungo per i test asincroni
  jest.setTimeout(10000);
});

afterEach(() => {
  // Pulisci i mock dopo ogni test
  jest.clearAllMocks();
});

afterAll(() => {
  console.error = originalError;
});

// Funzione globale per aspettare gli aggiornamenti di stato
global.waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};
