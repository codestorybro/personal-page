import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists the home page without retired blog URLs', () => {
    expect(sitemap()).toEqual([
      { url: 'https://www.codestorybro.com', changeFrequency: 'monthly', priority: 1.0 },
    ]);
  });
});
