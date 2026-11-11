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

## 2026-11-10 — EN/PL, wspólna nawigacja i szczyt obecności

- Zapisano stan sprzed zmian w lokalnym commicie `8ad18ac`.
- Build Live i pełny build Next.js przechodzą. Next.js testowano w `.next-qa`, ponieważ uruchomiony równolegle serwer deweloperski nadpisywał manifesty w `.next`. Nie zatrzymano serwera użytkownika. Ostrzeżenia Fast Refresh dotyczą współdzielonych plików komponentów i hooków, nie błędów buildu.
- 10 testów Vitest przechodzi, w tym domyślny EN, zapis PL, jawny język linku między aplikacjami i komunikaty z parametrami.
- Chrome potwierdza EN domyślnie, selektor EN/PL w stopce, polskie copy, zachowanie preferencji przy odświeżeniu i przejściu na certyfikaty/404, link Stage i YouTube w nagłówku oraz panel w stopce. Brak logo kodu, odwołań do Kim Scott, półpauzy em dash w copy i dodatkowego hovera/dividerów w karcie YouTube. Obejrzano polską wersję mobilną bez poziomego przepełnienia.
- Test Chrome Live obejmuje Stage/Studio/Live, zmianę języka uczestnika podczas otwartego pytania bez modyfikacji jego treści, głosowanie, sterowanie projektorem, pełny ekran, archiwum, udostępnienie i usuwanie. Szczyt pozostaje równy 1 po odłączeniu jedynego uczestnika i po odświeżeniu zakończonej sesji. Pole nie jest renderowane u uczestnika.
- Test integracyjny 200 uczestników przechodzi. Szczyt 200 jest utrwalony po zakończeniu i w prywatnej liście sesji, nie występuje w odpowiedzi uczestnika. Endpointy stron panelu i projektora również odrzucają dostęp przy braku konfiguracji Access; ustawienie `run_worker_first` obejmuje `/presenter` i `/presenter/*`.
- Nie wykonywano publikacji, zmian DNS ani testu na fizycznym telefonie w innej sieci. Mechanizm synchronizacji przez wspólny Durable Object nie zależy od wspólnego LAN; logowanie rzeczywistym Access nadal wymaga konfiguracji środowiska wdrożenia.

## 2026-11-10: polski domyślnie i obsługa klawiatury

- Domyślny język zmieniono na PL; zapisany wybór EN i jawny parametr języka nadal mają pierwszeństwo. Przechodzą 10 testów jednostkowych oraz buildy Next.js i Live.
- Chrome potwierdził otwieranie selektora przez Enter i spację, wybór strzałkami, zatwierdzanie, Escape, Tab i zachowanie preferencji po odświeżeniu. Fokus linków animuje podkreślenie, a selektora obramowanie.
- Pełny test przeglądarkowy Live przechodzi, w tym nawigacja strzałkami i Page Up/Page Down w Studio, brak przełączania slajdu podczas obsługi selektora oraz docelowe linki nagłówków Studio i Live. Nie testowano fizycznego klikacza.
- Ujednolicono animację obramowania przycisków, pól i selektora. Build Live, ESLint zmienionych plików i pełny test Chrome przechodzą. Dodatkowy pomiar w Chrome potwierdza hover/fokus bez zmiany tła przycisku i odstęp między akcjami pytania na szerokościach 1440 i 390 px; obejrzano układ mobilny.

## 2026-11-11: wejście prezentera bez linku w stopce

Usunięto odnośnik do panelu ze wspólnej stopki obu aplikacji i jej konfiguracji. Dotychczasowa ścieżka `/presenter` oraz kontrola Access pozostają aktywne; nowa ścieżka nie została jeszcze wybrana. Przechodzą 10 testów jednostkowych Next.js, ESLint zmienionych komponentów i build Live. Nie wykonywano wdrożenia ani zmian DNS.

## 2026-11-11: limity Free, KV i przygotowanie Stage

- Wspólne limity klienta/serwera: 1000 uczestników, 5 pytań, 20 MB na każdy PDF (także eksport), 750 MB łącznie, 100 sesji. Produkcyjny binding PDFS jest KV, bez R2; namespace ID w szablonie pozostaje pustym identyfikatorem z samych zer do zastąpienia przed publikacją. APP_ORIGIN wskazuje docelowe Stage.
- Test integracyjny na rzeczywistym lokalnym workerd/KV/SQLite przechodzi dla 1000 klientów: odmowa 1001. dołączenia, spadek obecności, deduplikacja kart, ponowne połączenie, zmiana odpowiedzi, nowa runda, wyścig zamknięcia, prywatność liczb, publikacja/wycofanie/usuwanie oraz odmowa dostępu produkcyjnego bez Access.
- Minutowy scenariusz obciążeniowy: 1000 klientów, 5 pytań, 10 000 potwierdzonych głosów ze zmianami, 50 reconnectów, p95 ACK 343 ms. To wynik lokalny, nie pomiar Cloudflare ani sieci konferencyjnej. Godzinnej próby wdrożonego systemu nie wykonano.
- Przechodzi 7 testów jednostkowych Live, w tym granica 5/6 pytań, limit rozmiaru, błędne/przerwane przesyłanie, pełny PDF, Range/suffix/416 i przejściowe 503 KV. Pełny test Chrome przechodzi również po celowym pierwszym 503 PDF; podgląd automatycznie ponawia odczyt. Usunięcie dostępu sprawdza SQLite niezależnie od propagacji KV. Rozsyłanie wspólnego stanu i odczyt głosów do broadcastu nie wykonują osobnej pełnej migawki dla każdego z 1000 uczestników.
- Przechodzą buildy Live i Next.js (izolowany `.next-qa`), 10 testów głównej aplikacji, ESLint zmienionych współdzielonych plików i pakowanie Workera dry-run. Podsumowanie dry-run zawiera Assets, KV i dwa DO, bez R2. Znane ostrzeżenia Fast Refresh / ignorowania `use client` przez Vite nie blokują buildu.
- Lokalna migracja skopiowała 2 dotychczasowe PDF-y z emulatora R2 do emulatora KV, zachowując źródła i dane SQLite. Skrypt jest lokalny, ponawialny i nie korzysta ze zdalnych bindingów.
- Dodano `DEPLOYMENT.md` z pełną instrukcją OVH/DNSSEC, Vercel, Access, KV, lokalnego pliku produkcyjnego, dry-run, deployu i testów po publikacji. Nie wykonano publikacji, zmian DNS, tworzenia zasobów chmurowych ani pusha.
