import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { MantineProvider } from '@mantine/core';
import CardVac from '../components/CardVac';
import { BrowserRouter } from 'react-router-dom';

// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

const dummyProps = {
  id: "1",
  title: 'Frontend Developer',
  salary: '100000 - 150000 ₽',
  experience: 'Без опыта',
  company: 'Компания',
  work_format: [{ id: 1, name: 'Удалённо' }],
  location: 'Москва',
  url: 'https://google.com',
};

describe('CardVac', () => {
  it('Рендер вакансии, зп и компании', () => {
    render(
      <MantineProvider>
      <BrowserRouter>
      <CardVac {...dummyProps} />
      </BrowserRouter>
        
      </MantineProvider>
    );
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
    expect(screen.getByText(/100000 - 150000/i)).toBeInTheDocument();
    expect(screen.getByText(/компания/i)).toBeInTheDocument();
  });

  it('Рендер формата работы', () => {
    render(
      <MantineProvider>
       <BrowserRouter>
      <CardVac {...dummyProps} />
      </BrowserRouter>
      </MantineProvider>
    );
    expect(screen.getByText(/удалённо/i)).toBeInTheDocument();
  });

  it('Рендер кнопки откликнуться', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
      <CardVac {...dummyProps} />
      </BrowserRouter>
      </MantineProvider>
    );
    expect(screen.getByRole('link', { name: /откликнуться/i })).toHaveAttribute(
      'href',
      dummyProps.url
    );
  });
});
