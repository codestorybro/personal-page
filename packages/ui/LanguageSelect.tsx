'use client';

// Options use aria-activedescendant; keyboard events are handled by the combobox.
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from './Locale';

const languages = ['pl', 'en'] as const;
export function LanguageSelect() {
  const { locale, setLocale, pick } = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const show = () => {
    setActive(languages.indexOf(locale));
    setOpen(true);
  };
  useEffect(() => {
    if (!open) {
      return;
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return (
    <div
      className="csb-language"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        role="combobox"
        aria-label={pick('Language', 'Język')}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-activedescendant={open ? `${id}-${languages[active]}` : undefined}
        onClick={() => open ? setOpen(false) : show()}
        onKeyDown={(event) => {
          if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(event.key)) {
            event.stopPropagation();
            event.preventDefault();
          }
          if (event.key === 'Enter' || event.key === ' ') {
            if (open) {
              setLocale(languages[active]!);
              setOpen(false);
            } else {
              show();
            }
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            if (!open) {
              show();
            } else {
              setActive(index => (index + (event.key === 'ArrowDown' ? 1 : -1) + languages.length) % languages.length);
            }
          } else if (event.key === 'Home' || event.key === 'End') {
            setOpen(true);
            setActive(event.key === 'Home' ? 0 : languages.length - 1);
          } else if (event.key === 'Escape' || event.key === 'Tab') {
            setOpen(false);
          }
        }}
      >
        {locale.toUpperCase()}
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <ul id={id} role="listbox" aria-label={pick('Language', 'Język')}>
          {languages.map((language, index) => (
            <li
              id={`${id}-${language}`}
              key={language}
              role="option"
              aria-selected={language === locale}
              className={index === active ? 'is-active' : ''}
              onPointerMove={() => setActive(index)}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setLocale(language);
                setOpen(false);
              }}
            >
              {language.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
