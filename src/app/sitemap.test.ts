import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists the home page without retired blog URLs', () => {
    expect(sitemap()).toEqual([
      ...(['pl', 'en'] as const).map(locale => ({ url: `https://www.codestorybro.com/${locale === 'en' ? '?lang=en' : ''}`, changeFrequency: 'monthly', priority: locale === 'pl' ? 1.0 : 0.8, alternates: { languages: { pl: 'https://www.codestorybro.com/', en: 'https://www.codestorybro.com/?lang=en' } } })),
    ]);
  });
});
