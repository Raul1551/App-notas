import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Notas from '../components/Notas';

test('renders Notas component', () => {
  render(<Notas title="Título" content="Contenido" />);
  // Verifica que el componente Notas se renderice correctamente
  expect(screen.getByText('Título')).toBeInTheDocument();
  expect(screen.getByText('Contenido')).toBeInTheDocument();
});

test('calls deleteNota function on delete button click', () => {
  const deleteNotaMock = jest.fn();
  render(<Notas title="Título" content="Contenido" id="1" deleteNota={deleteNotaMock} />);

  // Simula el clic en el botón de eliminar
  fireEvent.click(screen.getByText('Eliminar'));

  // Verifica que la función deleteNota haya sido llamada con el ID correcto
  expect(deleteNotaMock).toHaveBeenCalledTimes(1);
  expect(deleteNotaMock).toHaveBeenCalledWith('1');
});

test('calls getNota function on edit button click', () => {
  const getNotaMock = jest.fn();
  render(<Notas title="Título" content="Contenido" id="1" getNota={getNotaMock} />);

  // Simula el clic en el botón de editar
  fireEvent.click(screen.getByText('Editar'));

  // Verifica que la función getNota haya sido llamada con el ID correcto
  expect(getNotaMock).toHaveBeenCalledTimes(1);
  expect(getNotaMock).toHaveBeenCalledWith('1');
});
