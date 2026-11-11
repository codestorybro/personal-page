'use client';

import { LanguageSelect } from './LanguageSelect';
import { useLocale } from './Locale';

export function Footer() {
  const { pick } = useLocale();
  return (
    <footer className="csb-footer">
      <p>
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        CodeStoryBro
      </p>
      <p>{pick('Software • Engineering Leadership • Public Speaking', 'Software • Prowadzenie zespołów • Wystąpienia publiczne')}</p>
      <div className="csb-footer-controls">
        <LanguageSelect />
      </div>
    </footer>
  );
}
