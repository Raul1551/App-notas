import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../components/Form';

// Mock de la función fetch
const fetchMock = jest.fn(() => Promise.resolve());

beforeEach(() => {
  fetchMock.mockClear();
});

test('renders Form component', () => {
  render(<Form oldNota={{}} />);
  // Verifica que el componente Form se renderice correctamente
  expect(screen.getByText('Agregar Nota')).toBeInTheDocument();
});

test('updates input values on change', () => {
  render(<Form oldNota={{}} />);

  // Ingresa valores en los campos del formulario
  fireEvent.change(screen.getByPlaceholderText('Titulo'), { target: { value: 'Título de la nota' } });
  fireEvent.change(screen.getByPlaceholderText('Contenido de la tarea'), { target: { value: 'Contenido de la nota' } });

  // Verifica que los valores ingresados se reflejen en los campos
  expect(screen.getByPlaceholderText('Titulo')).toHaveValue('Título de la nota');
  expect(screen.getByPlaceholderText('Contenido de la tarea')).toHaveValue('Contenido de la nota');
});

test('saves nota on form submit', async () => {
  render(<Form oldNota={{}} />);

  // Ingresa valores en los campos del formulario
  fireEvent.change(screen.getByPlaceholderText('Titulo'), { target: { value: 'Título de la nota' } });
  fireEvent.change(screen.getByPlaceholderText('Contenido de la tarea'), { target: { value: 'Contenido de la nota' } });

  // Envía el formulario
  fireEvent.submit(screen.getByRole('button'));

  // Verifica que la función fetch haya sido llamada correctamente
  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5000/api/notas/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          title: 'Título de la nota',
          content: 'Contenido de la nota'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  });
});

test('resets form fields on form submit', () => {
  render(<Form oldNota={{}} />);

  // Ingresa valores en los campos del formulario
  fireEvent.change(screen.getByPlaceholderText('Titulo'), { target: { value: 'Título de la nota' } });
  fireEvent.change(screen.getByPlaceholderText('Contenido de la tarea'), { target: { value: 'Contenido de la nota' } });

  // Envía el formulario
  fireEvent.submit(screen.getByRole('button'));

  // Verifica que los campos se hayan reiniciado después del envío
  expect(screen.getByPlaceholderText('Titulo')).toHaveValue('');
  expect(screen.getByPlaceholderText('Contenido de la tarea')).toHaveValue('');
});

test('updates nota on prop change', () => {
  render(<Form oldNota={{ title: 'Título anterior', content: 'Contenido anterior' }} />);

  // Verifica que los valores iniciales se muestren en los campos
  expect(screen.getByPlaceholderText('Titulo')).toHaveValue('Título anterior');
  expect(screen.getByPlaceholderText('Contenido de la tarea')).toHaveValue('Contenido anterior');

  // Actualiza la prop oldNota
  render(<Form oldNota={{ title: 'Título actualizado', content: 'Contenido actualizado' }} />);

  // Verifica que los campos se hayan actualizado con los nuevos valores
  expect(screen.getByPlaceholderText('Titulo')).toHaveValue('Título actualizado');
  expect(screen.getByPlaceholderText('Contenido de la tarea')).toHaveValue('Contenido actualizado');
});
