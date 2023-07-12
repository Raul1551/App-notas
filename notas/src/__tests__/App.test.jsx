import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import Index from '../pages/Index';

test('renders App component', () => {
  render(<App />);
  // Verifica que el componente App se renderice correctamente
  expect(screen.getByText('Agregar Nota')).toBeInTheDocument();
});

test('renders Index component within App', () => {
  render(<App />);
  // Verifica que el componente Index se renderice dentro del componente App
  expect(screen.getByText('Agregar Nota')).toBeInTheDocument();
});
jest.mock('../components/Form', () => () => <div data-testid="mock-form" />);
jest.mock('../components/Notas', () => () => <div data-testid="mock-notas" />);

test('renders Index component', () => {
  render(<Index />);
  expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  expect(screen.getByTestId('mock-notas')).toBeInTheDocument();
});
