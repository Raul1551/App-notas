import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Index from '../pages/Index';

// Mock de la función fetch
const fetchMock = jest.fn(() => Promise.resolve({ json: () => [] }));

beforeEach(() => {
  fetchMock.mockClear();
});

test('renders Index component', () => {
  render(<Index />);
  // Verifica que el componente Index se renderice correctamente
  expect(screen.getByText('Agregar Nota')).toBeInTheDocument();
});

test('fetches notas on component mount', async () => {
  render(<Index />);

  // Verifica que la función fetch haya sido llamada con la URL correcta
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/notas');
  });
});

test('renders notas from API response', async () => {
  fetchMock.mockResolvedValueOnce({
    json: () => [
      { _id: '1', title: 'Nota 1', content: 'Contenido 1' },
      { _id: '2', title: 'Nota 2', content: 'Contenido 2' }
    ]
  });

  render(<Index />);

  // Verifica que las notas se rendericen correctamente en el componente Notas
  expect(await screen.findByText('Nota 1')).toBeInTheDocument();
  expect(screen.getByText('Nota 2')).toBeInTheDocument();
});

test('calls deleteNota function on Notas component delete button click', async () => {
  fetchMock.mockResolvedValueOnce({ json: () => [] });

  const deleteNotaMock = jest.fn();
  render(
    <Index>
      <Notas id="1" deleteNota={deleteNotaMock} title="Título" content="Contenido" />
    </Index>
  );

  // Simula el clic en el botón de eliminar en el componente Notas
  fireEvent.click(screen.getByText('Eliminar'));

  // Verifica que la función deleteNota haya sido llamada con el ID correcto
  expect(deleteNotaMock).toHaveBeenCalledTimes(1);
  expect(deleteNotaMock).toHaveBeenCalledWith('1');
});

test('calls getNota function on Notas component edit button click', async () => {
  fetchMock.mockResolvedValueOnce({ json: () => [] });

  const getNotaMock = jest.fn();
  render(
    <Index>
      <Notas id="1" getNota={getNotaMock} title="Título" content="Contenido" />
    </Index>
  );

  // Simula el clic en el botón de editar en el componente Notas
  fireEvent.click(screen.getByText('Editar'));

  // Verifica que la función getNota haya sido llamada con el ID correcto
  expect(getNotaMock).toHaveBeenCalledTimes(1);
  expect(getNotaMock).toHaveBeenCalledWith('1');
});
