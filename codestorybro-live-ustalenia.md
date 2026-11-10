# CodeStoryBro Live — ustalenia i stan prac

## Cel

CodeStoryBro Live to narzędzie do głosowań A/B podczas wystąpień konferencyjnych. MVP ma działać bez płatnego abonamentu i obsługiwać do 200 uczestników w jednej sesji. Pierwsze użycie dotyczy konferencji, na których właściciel projektu nie zarabia. Na głównej stronie CodeStoryBro może w przyszłości pojawić się oferta płatnych kursów.

## Zatwierdzone decyzje

- Aplikacja Live powstaje jako osobna aplikacja w `apps/live` wewnątrz istniejącego repozytorium `personal-page`.
- Pracę wykonujemy bezpośrednio w `/Users/marcin.kolodziej/Documents/Projects/personal-page`, na osobnej gałęzi. Użytkownik wybrał pracę w oryginalnym repozytorium.
- Chronimy istniejące zmiany użytkownika. Przed zmianami sprawdzamy stan Git, aktywną gałąź i lokalne instrukcje. Nazwa `feat/codestorybro-live` jest propozycją.
- Rozważana domena produkcyjna Live to `vote.codestorybro.com`. Hosting, konfiguracja DNS i publikacja są osobnymi krokami.

## Zakres MVP

1. Prezenter przed wydarzeniem tworzy sesję, wgrywa PDF i przypisuje kolejne pytania A/B do numerów slajdów. Używa własnego przeglądarkowego odtwarzacza PDF na stanowisku prezentera i projektorze. PDF zastępuje wcześniejszy pomysł bezpośredniej integracji z PowerPointem.
2. Jeden QR i jeden adres służą uczestnikom przez całą sesję. Dołączają telefonem bez logowania i czekają na kolejne pytania.
3. Po wybranym slajdzie prezenter ręcznie otwiera pytanie. W danym momencie otwarte jest najwyżej jedno pytanie. Uczestnik może zmieniać wybór do chwili zamknięcia. Do wyniku liczy się ostatni przyjęty głos. Ponowienie zapisu nie tworzy dodatkowego głosu.
4. Prezenter widzi liczby i procenty na żywo. Uczestnikom proponujemy pokazywać wynik po zamknięciu pytania. Odświeżenie lub powrót po utracie sieci powinny odtworzyć stan sesji i zapisany głos. Anonimowa tożsamość dotyczy przeglądarki.
5. Po wydarzeniu prezenter ma prywatne archiwum wyników sesji i pytań. Eksport CSV, jedno konto prezentera i dostęp do PDF wyłącznie dla prezentera to proponowane uproszczenia MVP.

Inspiracja dla sposobu dołączania i prowadzenia sesji to [ASKUP](https://askup.aitesters.pl/).

## Hosting i technologie

**Pierwotny wariant z audytu:** osobna aplikacja Next.js na Vercel Hobby, Supabase Free do bazy, logowania i prywatnych PDF-ów, PDF.js do odtwarzacza oraz krótkie odpytywanie przez HTTP. Pełna obsada 200 uczestników wykorzystałaby limit 200 równoczesnych połączeń Supabase Realtime jeszcze przed doliczeniem prezentera. Osobno trzeba uwzględnić limity transferu i uśpienie nieaktywnego projektu. [Supabase Realtime](https://supabase.com/docs/guides/realtime/limits) · [Supabase Free](https://supabase.com/pricing)

**Nowsza rekomendacja, do uzgodnienia przed implementacją zależną od stosu:** dla Live rozważyć React + Vite, PDF.js oraz Cloudflare Workers z WebSocketami i Durable Objects opartymi na SQLite. Jeden obiekt na sesję koordynowałby głosy i stan pytania. Trzeba doprecyzować logowanie prezentera, prywatne przechowywanie PDF-ów, archiwum i eksport oraz zmierzyć działanie darmowego planu przy 200 uczestnikach. Vite jest warstwą przeglądarkową, a backend nadal obsługuje autoryzację i dane. [Durable Objects i limity](https://developers.cloudflare.com/durable-objects/platform/pricing/) · [PDF.js](https://mozilla.github.io/pdf.js/examples/index.html)

**Główna strona:** rekomendacja to zachować Next.js. W razie migracji warto najpierw sprawdzić zgodność z Cloudflare Workers przez OpenNext, szczególnie blog z Notion, obrazy, weryfikację certyfikatów i middleware. Migracja hostingu strony głównej oraz przepisanie jej na Vite nie zostały zatwierdzone. Netlify Free również rozważano. Dopuszcza projekty komercyjne, ale limit kredytów wymaga osobnego oszacowania ruchu i wdrożeń. [OpenNext](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/) · [Netlify Free i użytek komercyjny](https://www.netlify.com/blog/introducing-netlify-free-plan/) · [Limity Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)

Vercel Hobby jest przeznaczony do osobistego użytku niekomercyjnego. Zasady wymieniają reklamowanie sprzedaży, nawet zanim pojawi się płatność. Jeśli Live będzie służył promocji kursów, należy ocenić hosting również dla Live. Osobna subdomena sama nie przesądza o kwalifikacji. Przed wyborem dostawcy sprawdzić aktualne warunki i limity. [Zasady Vercel Hobby](https://vercel.com/docs/limits/fair-use-guidelines)

## Stan repozytorium po audycie

- Faktyczna ścieżka to `/Users/marcin.kolodziej/Documents/Projects/personal-page`. Poprzedni czat miał wyłącznie odczyt. Nie utworzono gałęzi i nie rozpoczęto implementacji.
- Audyt potwierdził Next.js 15.1.9 z App Routerem, React 19.2.1, TypeScript, Tailwind i Yarn Classic. Główne funkcje to strona osobista, blog z Notion i weryfikacja certyfikatów. Główna konfiguracja TypeScript i ESLint może obejmować pliki nowej aplikacji, więc należy sprawdzić zakres obu projektów. Wersje i stan plików są danymi z audytu.
- Przy ostatnim sprawdzeniu `main` był czysty i o jeden commit przed lokalnym `origin/main`. Ponownie sprawdzić przed utworzeniem gałęzi. Nie resetować lokalnych zmian.
- Publiczna strona odpowiadała z Vercel i przekierowywała na `www.codestorybro.com`. Subdomena `vote.codestorybro.com` nie rozwiązywała się podczas audytu. Plan konta i ustawienia projektu Vercel nie zostały sprawdzone w panelu.
- W kopii audytowej przeszło 8 testów Vitest. Nie wykonano pełnego buildu produkcyjnego ani testów Playwright.

## Kolejność prac i weryfikacja

1. Otworzyć repozytorium jako projekt Codexa z zapisem. Sprawdzić dostęp i stan Git, następnie utworzyć osobną lokalną gałąź z aktualnego stanu repozytorium. Jeśli zapis nadal jest zablokowany, podać konkretny komunikat i pozostać przy wskazanym repozytorium.
2. Potwierdzić wybór stosu dla Live i darmowy wariant wdrożenia. Decyzja dotyczy sposobu dostarczenia aplikacji, a zakres MVP i lokalizacja `apps/live` są już ustalone.
3. Zbudować rdzeń sesji i głosowania od QR do wyniku. Sprawdzić limit miejsc, odrzucenie 201. zgłoszenia, jednoczesne głosy, zmianę A → B, ponowienie zapisu oraz wyścig głosowania z zamknięciem pytania.
4. Dodać odtwarzacz PDF, przypisanie pytań do slajdów, ekran prezentera i archiwum. Zweryfikować cały przebieg na komputerze i telefonie, odtworzenie stanu po utracie sieci oraz dostęp do prywatnych danych i plików.
5. Przed użyciem na wydarzeniu wykonać próbę godzinną z 200 symulowanymi uczestnikami i 10 pytaniami w środowisku testowym. Oczekiwane są zgodne wyniki w sesji i archiwum, zero utraconych potwierdzonych głosów i zapas w darmowych limitach. Wcześniej proponowane cele to 95% aktualizacji do 3 s na projektorze i do 7 s na telefonie.
