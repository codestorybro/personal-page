# Lokalna weryfikacja — 9 listopada 2026

Implementacja znajduje się na lokalnej gałęzi `feat/codestorybro-live`, utworzonej z `ed1587e`. Nie wykonano wdrożenia ani zmian DNS. Plik użytkownika `codestorybro-live-ustalenia.md` pozostaje bez zmian.

## Wyniki

- `yarn build`: TypeScript i produkcyjny build Vite przechodzą. PDF.js jest ładowany osobno od widoku uczestnika; fonty, CMap i WASM są lokalnymi assetami.
- `yarn test`: 4 testy przechodzą. Walidacja pytań, podpisany JWT Access, błędne audience/issuer/e-mail, wygasły lub podrobiony token, odmowa dostępu bez konfiguracji, ograniczenie lokalnego obejścia i dokładny Origin.
- `yarn test:integration`: lokalne workerd, SQLite i R2. 200 uczestników przyjętych równocześnie, 201. odrzucony, powrót tej samej tożsamości nie zajmuje miejsca. 200 głosów A, zmiana A→B, ponowienie, reconnect, zamknięcie i spóźniony głos. Wyścig z zamknięciem zachowuje wszystkie potwierdzone głosy. Prywatność PDF, zakresy bajtów, odrzucenie błędnego PDF, CSRF, archiwum i CSV. Konfiguracja produkcyjna bez Access odmawia dostępu.
- `yarn test:e2e`: lokalny Google Chrome przez Playwright. Pełny przebieg w panelu i osobnym kontekście telefonu 390×844: sesja, PDF, pytanie, A→B, odświeżenie, zamknięcie, projektor, kolejny slajd, zakończenie i archiwum. Brak błędów JavaScript i poziomego przepełnienia telefonu. Obejrzano zrzuty panelu, telefonu i projektora.
- `yarn check:worker`: pakowanie Workera w trybie `--dry-run` przechodzi, bez publikacji.
- Główna strona: kontrola TypeScript oraz 8 istniejących testów Vitest przeszły. Nie wykonywano pełnego buildu Next.js ani jego testów Playwright.
- Próba obciążeniowa: 60 sekund, 200 klientów, 10 pytań, 4000 potwierdzonych zapisów (głosy i zmiany), 100 reconnectów; poprawne końcowe wyniki każdego pytania. Szczegóły ostatniego uruchomienia w ignorowanym `load-results.json`.

## Ograniczenia pomiarów

To lokalny workerd na komputerze deweloperskim. Wynik nie potwierdza limitów CPU i rozliczeń konta Cloudflare, opóźnień w rzeczywistej sieci ani dostarczania e-maili Access. Test JWT używa lokalnie wygenerowanych kluczy i kontrolowanego JWKS; integracja z kontem właściciela nastąpi przy konfiguracji środowiska.

Wbudowane narzędzie podglądu było niedostępne z powodu wersji Node; test przeglądarkowy wykonano zamiast tego lokalnym Playwrightem. Przejściowy błąd automatycznego przeglądu uprawnień został rozwiązany po wznowieniu pracy; testy przeglądarkowe zostały następnie wykonane pomyślnie.

Godzinny scenariusz jest dostępny przez `yarn test:load`, ale nie wykonano jeszcze godzinnej próby w chmurze. Przed wydarzeniem należy osobno uzgodnić wdrożenie testowe, skonfigurować Access i prywatne R2, sprawdzić fizyczny telefon oraz wykonać pomiar aktualizacji na projektorze i telefonach z zapasem darmowych limitów.

## Automatyczne pytania, kolejne rundy i niebieska paleta

Dodatkowe testy integracyjne potwierdzają automatyczną kolejność kilku pytań po jednym slajdzie, pytanie po ostatnim slajdzie, przejście pytanie → wynik → slajd, cofanie bez ponownego otwierania zakończonych pytań i odrzucanie powtórzonej nawigacji. Ponowne otwarcie rozpoczyna rundę od zera; wcześniejsze wyniki pozostają w archiwum i CSV, a spóźnione głosy starej rundy są odrzucane.

Test Chrome potwierdził Page Down/Page Up, automatyczne pytanie, zamknięcie klikaczem, nową rundę bez starego zaznaczenia, powrót z wyniku do PDF, brak QR pod slajdami i większy obszar PDF. Obejrzano zrzuty projektora i głównej strony Next.js z nowym niebieskim akcentem `#a9c9ef`. Nie wykonywano publikacji.

## Usuwanie sesji, obecność i prywatne liczniki głosów

Build i testy integracyjne/Chrome potwierdzają usuwanie sesji po potwierdzeniu, ponowienie DELETE, blokadę usuwania aktywnej sesji, brak wpisu w archiwum i brak dostępu do PDF/CSV/stanu po usunięciu. Proces usuwa wszystkie pliki z prefiksu sesji, rekordy SQLite oraz rezerwację pojemności w katalogu. W razie przerwania pozostaje możliwość dokończenia operacji.

Sprawdzono 200 połączeń, dwie karty jednej tożsamości, spadek 200→199, zwolnienie miejsca, powrót i odtworzenie głosu. Dodatkowy `yarn test:presence` potwierdził automatyczne odłączenie klienta bez heartbeat oraz aktualizację licznika prezentera przy zachowaniu drugiego, odpowiadającego klienta. Liczba historycznych tożsamości pozostaje oddzielna od obecności online.

Chrome potwierdził zmianę 1→0→1 po opuszczeniu strony i powrocie, anulowanie oraz potwierdzenie usuwania w archiwum i komunikat dla uczestnika usuniętej sesji. Projektor i telefony pokazują procenty bez surowych liczb i sumy głosów; dokładne liczniki pozostają w panelu. Publiczny stan uczestnika zawiera wyłącznie procentowy wynik zamkniętego pytania.

## Pytania jako stałe pozycje prezentacji

Testy integracyjne potwierdzają cofanie przez wiele zakończonych pytań po jednym slajdzie, zachowanie ostatniego pytania na końcu prezentacji oraz powrót do otwartego pytania bez zmiany rundy. Test Chrome przechodzi przez dwa pytania z różnymi wynikami i wraca do starszego pytania, sprawdzając jego właściwy wynik (nie wynik ostatniego głosowania). Zweryfikowano też przycisk „Pokaż pytanie na ekranie”, który nie zeruje głosów. Build przechodzi.

## 2026-11-10 — czysty pełny ekran i publiczne materiały

- Build Live (TypeScript + Vite), 4 testy jednostkowe i pakowanie Workera `--dry-run` przechodzą. Bez wdrożenia.
- Test integracyjny nadal przechodzi dla 200 uczestników. Dodatkowo sprawdza odmowę udostępnienia szkicu i aktywnej sesji, brak dostępu do prywatnej prezentacji, minimalny publiczny indeks, blokadę powtórnego udostępnienia, wycofanie, ponowne udostępnienie i usunięcie sesji wraz z kopią publiczną. Niezalogowane żądanie udostępnienia w konfiguracji produkcyjnej jest odrzucane.
- Chrome: rzeczywiste wejście do Fullscreen API ukrywa nagłówek i przyciski dla PDF oraz pytania, PDF zajmuje wysokość okna, QR ma 300 px. Page Down/Page Up nadal działają, wyjście przywraca sterowanie. Podgląd prezentera nadal odpowiada projektorowi.
- Chrome: zakończenie → Udostępnij → lista publiczna → pobranie → wycofanie → ponowne udostępnienie → usunięcie sesji. Pobrany plik zawiera cztery strony (PDF 1, pytanie 1, PDF 2, pytanie 2), tytuł sesji i oryginalne wymiary stron źródłowych. Wyrenderowano i obejrzano strony pytań z tego pliku: procenty ostatniej rundy, polskie znaki, bez surowych liczników. Biblioteka na telefonie 390 px nie wychodzi poza ekran.
- Next.js: pełny build (wraz z ESLint i TypeScript) oraz 7 testów Vitest przechodzą. Chrome potwierdził desktop/mobile, jeden profil YouTube, LinkedIn w kontakcie i wspólną stopkę. Sprawdzono HTTP 308 na `/blog`, starym wpisie, zagnieżdżonej ścieżce z query oraz dawnych adresach `/en/blog` i `/pl/blog/...`. Sitemap nie zawiera bloga.
