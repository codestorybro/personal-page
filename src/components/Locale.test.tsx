import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Footer } from '../../packages/ui/Footer';
import { LocaleProvider, useLocale } from '../../packages/ui/Locale';
import { translate } from '../../packages/ui/translations';

function Example() {
  const { pick, link } = useLocale();
  return (
    <>
      <h1>{pick('Presentations', 'Prezentacje')}</h1>
      <a href={link('https://stage.example.com')}>Stage</a>
      <Footer />
    </>
  );
}

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, '', '/');
});

describe('language preference', () => {
  it('defaults to Polish, supports keyboard selection and persists the choice', async () => {
    render(<LocaleProvider><Example /></LocaleProvider>);

    expect(screen.getByRole('heading')).toHaveTextContent('Prezentacje');

    fireEvent.keyDown(screen.getByRole('combobox', { name: 'Język' }), { key: 'Enter' });

    expect(screen.getByRole('listbox')).toBeVisible();

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(screen.getByRole('heading')).toHaveTextContent('Presentations');

    fireEvent.keyDown(screen.getByRole('combobox'), { key: ' ' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(screen.getByRole('heading')).toHaveTextContent('Prezentacje');
    expect(document.documentElement.lang).toBe('pl');
    expect(localStorage.getItem('codestorybro-language')).toBe('pl');
    expect(screen.getByRole('link', { name: 'Stage' })).toHaveAttribute('href', 'https://stage.example.com?lang=pl');
    expect(screen.queryByRole('link', { name: 'Panel prezentera' })).not.toBeInTheDocument();

    await waitFor(() => expect(window.location.search).toBe('?lang=pl'));
  });

  it('restores the preference and gives an explicit cross-app language priority', () => {
    localStorage.setItem('codestorybro-language', 'pl');
    window.history.replaceState({}, '', '/?lang=en');
    render(<LocaleProvider><Example /></LocaleProvider>);

    expect(screen.getByRole('heading')).toHaveTextContent('Presentations');
    expect(localStorage.getItem('codestorybro-language')).toBe('en');
  });
});

describe('live messages', () => {
  it('translates parameters and keeps source text intact in Polish', () => {
    expect(translate('en', '✓ Przyjęto odpowiedź B')).toBe('✓ Answer B received');
    expect(translate('en', 'Przygotowuję stronę 12 z 20…')).toBe('Preparing page 12 of 20…');
    expect(translate('pl', 'Przygotowuję stronę 12 z 20…')).toBe('Przygotowuję stronę 12 z 20…');
    expect(translate('en', 'Nie udało się otworzyć PDF: Invalid PDF.')).toBe('Could not open the PDF: Invalid PDF.');
  });
});
