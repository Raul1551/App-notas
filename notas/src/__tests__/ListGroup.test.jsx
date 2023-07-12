import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListGroup from '../components/ListGroup';

test('renders ListGroup component', () => {
  render(<ListGroup />);
  // Verifica que el componente ListGroup se renderice correctamente
  expect(screen.getByRole('list')).toBeInTheDocument();
});

test('renders children within ListGroup', () => {
  render(
    <ListGroup>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ListGroup>
  );
  // Verifica que los elementos hijos se rendericen dentro del componente ListGroup
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
  expect(screen.getByText('Item 3')).toBeInTheDocument();
});
