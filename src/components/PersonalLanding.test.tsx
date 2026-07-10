import { render, screen, within } from '@testing-library/react';
import { PersonalLanding } from './PersonalLanding';

describe('PersonalLanding', () => {
  it('renders the professional positioning and only the active profile cards', () => {
    render(<PersonalLanding />);

    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Software Developer. Engineering Manager. Conference Speaker.',
    })).toBeInTheDocument();

    const profiles = screen.getByRole('navigation', { name: 'Professional profiles' });
    const links = within(profiles).getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://x.com/codestorybro');
    expect(links[1]).toHaveAttribute('href', 'https://www.linkedin.com/in/codestorybro');

    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }

    expect(screen.queryByText('YouTube')).not.toBeInTheDocument();
  });

  it('provides the configured email as a mail link', () => {
    render(<PersonalLanding />);

    expect(screen.getByRole('link', { name: 'Email hello@codestorybro.com' }))
      .toHaveAttribute('href', 'mailto:hello@codestorybro.com');
  });
});
