# CodeStoryBro

Strona Marcina Kołodzieja o prowadzeniu zespołów inżynierskich, software i branży IT oraz aplikacja do prezentacji i głosowań podczas wystąpień.

## Dokumentacja

- [AGENTS.md](AGENTS.md): zasady marki, copy, systemu wizualnego i pracy agentów AI.
- [apps/live/README.md](apps/live/README.md): funkcje, limity, uruchamianie i testowanie Stage/Studio/Live.
- [apps/live/DEPLOYMENT.md](apps/live/DEPLOYMENT.md): instrukcja wdrożenia na `stage.codestorybro.com`, DNS OVH, Access i plany Free.

## Aplikacje i wspólne źródła

| Katalog | Odpowiedzialność |
| --- | --- |
| `src/` | Home i weryfikacja certyfikatów; Next.js na Vercel |
| `apps/live/` | Publiczne Stage, panel Studio, projektor i uczestnicy Live; React/Vite oraz Cloudflare |
| `packages/ui/` | Wspólny nagłówek, stopka, języki i animacje interakcji |
| `packages/seo/` | Wspólne treści SEO PL/EN i synchronizacja metadanych |
| `public/` | Źródłowe assety marki, zdjęcie i używany font; Vite kopiuje branding podczas buildu |

Polski jest domyślny, EN wybiera się w stopce. `?lang=en` pozwala otworzyć angielską wersję z właściwym HTML, treścią i metadanymi od serwera. Next.js renderuje strony zależne od języka na żądanie; Worker przetwarza metadane HTML Stage. Home i Stage mają canonical, hreflang oraz wpisy PL/EN w sitemapach. Widoki prywatne i uczestnika mają noindex.

Home pozostaje na Vercel. Docelowy adres Stage to `https://stage.codestorybro.com`. `NEXT_PUBLIC_STAGE_URL` ustala odnośnik z Home, `VITE_HOME_URL` odnośnik z aplikacji Live do Home. Po commicie/merge/pushu na produkcyjną gałąź Vercel landing wdraża się automatycznie, o ile integracja Git jest aktywna; ustawienia konta trzeba potwierdzić w panelu. Stage publikuje się osobno. Nie wykonano jego wdrożenia ani zmian DNS w ramach dotychczasowych prac lokalnych.

YouTube jest głównym medium, LinkedIn kanałem kontaktowym. Blog jest wycofany: `/blog` i potomne adresy, także dawne `/en/blog` oraz `/pl/blog`, przekierowują trwale na Home. Sitemapy nie zawierają bloga.

## Uruchomienie Home

Wymagane Node.js 22.12+ i Yarn Classic 1.22. Z katalogu głównego:

```sh
yarn install --frozen-lockfile
yarn dev:next
```

Domyślny adres: `http://localhost:3000`. `yarn dev` uruchamia również skonfigurowany proces Spotlight. Zachowaj istniejące lokalne zmienne środowiskowe; nie commituj sekretów.

Aplikacja Live ma własny `package.json` i osobną instalację zależności. Instrukcja znajduje się w jej README.

## Weryfikacja zmian

| Zakres | Polecenie w katalogu głównym |
| --- | --- |
| Testy jednostkowe Home | `yarn test` |
| TypeScript Home i współdzielonych komponentów | `yarn check-types` |
| ESLint | `yarn lint` |
| Build produkcyjny Home | `yarn build` |

Dla podglądu produkcyjnego obok działającego Next dev użyj osobnego katalogu, aby nie mieszać manifestów:

```sh
CODESTORYBRO_DIST_DIR=.next-qa yarn build
CODESTORYBRO_DIST_DIR=.next-qa yarn start --hostname 127.0.0.1 --port 3008
```

Na Vercel pozostaw `CODESTORYBRO_DIST_DIR` nieustawione. Testy Live uruchamiaj w `apps/live`, zgodnie z jego README. Dla zmian UI sprawdź obie wersje językowe, desktop, telefon i obsługę klawiatury. Dla SEO sprawdź HTML przed uruchomieniem JS oraz URL-e obrazów i ikon.

## Stan ostatniej walidacji

Ostatnia pełna walidacja lokalna: 2026-11-11. Przeszły buildy obu aplikacji, 10 testów Home, 7 testów Live, pełny scenariusz Chrome oraz sprawdzenie początkowego HTML PL/EN. Obejrzano mobilne Home/Stage/Studio, nowy obraz OG i favicon. Szczegóły próby 1000 uczestników oraz ograniczenia pomiaru są w README Live. Nie jest to potwierdzenie działania produkcji.
