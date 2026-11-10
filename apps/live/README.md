# CodeStoryBro Live

Osobna aplikacja MVP: React + Vite, Cloudflare Workers, Durable Objects (SQLite), prywatne R2, Cloudflare Access dla prezentera. Główna strona Next.js pozostaje w katalogu głównym repozytorium.

## Uruchomienie lokalne

Wymagany Node.js 22.12+ i Yarn Classic. Nie potrzeba konta Cloudflare do lokalnego uruchomienia.

```sh
cd apps/live
yarn install --frozen-lockfile
yarn dev
```

Otwórz http://127.0.0.1:8787/presenter. Tryb `local` celowo dopuszcza prezentera bez Access wyłącznie na loopback. Domyślna konfiguracja produkcyjna nie ma tego obejścia. Lokalne SQLite i R2 trafiają do ignorowanego `.wrangler/`. `yarn dev` buduje frontend przy starcie; po edycji frontendu uruchom `yarn build` lub opcjonalnie `yarn dev:web` w drugim terminalu (Vite na 5173, proxy API do 8787).

QR z adresem loopback służy testowaniu na tym samym komputerze. Telefon wymaga później środowiska testowego pod HTTPS. Nie wystawiaj lokalnego panelu przez tunel z obejściem Access.

## Przebieg

1. Utwórz sesję. Wgraj PDF (do 50 MB i 2000 slajdów), dodaj pytania A/B i numery slajdów. Zapisz pytania przed rozpoczęciem.
2. Otwórz ekran projektora w osobnym oknie i przenieś go na drugi ekran. Pełny ekran: przycisk, `F` lub `F5`. Ustaw fokus na oknie projektora (kliknij w nie). Slajdy przełączysz jego strzałkami albo klikaczem wysyłającym `Page Down` / `Page Up`. Następny slajd: `→`, `↓`, spacja lub `N`; poprzedni: `←`, `↑`, Backspace lub `P`. Zmiana synchronizuje się z panelem prezentera. Liczniki slajdów są ukryte; przypisanie pytań do slajdów pozostaje w edytorze.
3. Uczestnicy używają jednego QR `/s/:id` przez całe wystąpienie, bez konta.
4. Rozpocznij sesję. Nawiguj PDF-em z panelu. Przejście dalej po przypisanym slajdzie automatycznie otwiera pytanie. Kilka pytań po tym samym slajdzie pojawia się w kolejności z edytora.
5. Jedno pytanie może być otwarte. Uczestnik zmienia głos do zamknięcia. Liczy się ostatni głos potwierdzony przez serwer. Prezenter i projektor widzą wyniki na żywo, telefony po zamknięciu. Dokładne liczby głosów są wyświetlane wyłącznie w panelu prezentera. Projektor i telefony pokazują procenty; publiczny stan uczestnika nie zawiera surowych liczników.
6. Klikacz przechodzi kolejno przez slajd, pytanie, wynik i następny slajd. „Dalej” przy otwartym pytaniu zamyka je; kolejne „Dalej” pokazuje następne pytanie przypisane do tego slajdu albo kolejny slajd. Pytania są stałymi pozycjami między slajdami PDF. Cofanie wraca do ich aktualnego stanu i wyniku, bez uruchamiania nowej rundy. Cofnięcie z otwartego pytania nie zamyka go; „Dalej” na jego ekranie zamyka głosowanie. Panel ma oddzielny przycisk „Pokaż pytanie na ekranie”, który nie resetuje głosów. QR na projektorze jest widoczny przed startem oraz przy pytaniu/wyniku, a pod samym PDF pozostaje ukryty. Zakończenie sesji zamyka aktywne głosowanie i zachowuje prywatne archiwum. Dostępny jest CSV. PDF można usunąć z archiwum bez usuwania wyników. Przycisk „Usuń sesję” na liście usuwa po potwierdzeniu całą zakończoną sesję (lub szkic): PDF-y pod jej prefiksem, wszystkie rundy wyników, głosy, pytania, uczestników i wpis w katalogu; zwalnia też przydział plików. Aktywna sesja wymaga wcześniejszego zakończenia. Przerwany proces usuwania można ponowić.

## Dane i spójność

- Jeden `LiveSession` na sesję: metadane, pytania, uczestnicy i głosy w trwałym SQLite. `Catalog` indeksuje sesje i rezerwuje limit PDF.
- Unikalny klucz głosu `(question_id, participant_id)`, rosnący numer `seq`, brak asynchronicznej przerwy między sprawdzeniem otwarcia i zapisem. `storage.sync()` przed ACK; wyścig głosu z zamknięciem rozstrzyga kolejność operacji w obiekcie.
- Ponowienie już przyjętego głosu otrzymuje ACK również po zamknięciu. Starszy numer nie nadpisuje nowszego. Przycisk „Uruchom ponownie od zera” rozpoczyna nową rundę z zerowymi licznikami. Poprzednie wyniki pozostają w archiwum i CSV; opóźnione głosy poprzedniej rundy są odrzucane.
- Serwer wydaje losową tożsamość w ciasteczku HttpOnly/SameSite=Strict/Secure na HTTPS. Limit to 200 jednocześnie połączonych przeglądarek. Licznik online maleje po opuszczeniu strony; kilka kart tej samej przeglądarki liczy się raz. Powrót odtwarza głos, jeżeli jest wolne miejsce. Rezerwacja miejsca między dołączeniem HTTP a WebSocketem trwa do 30 s. Heartbeat co 20 s i kontrola serwera co 30 s usuwają nieme połączenia po 60–90 s; szybkie zamknięcie karty nie czeka na ten timeout. W archiwum osobno widoczna jest łączna liczba tożsamości, które dołączyły. Usunięcie cookies/inna przeglądarka tworzy nową tożsamość. Nie jest to weryfikacja fizycznych osób.
- WebSocket Hibernation API, automatyczny ping/pong, odtwarzanie stanu po reconnect. Niepotwierdzony głos jest zachowany w sessionStorage i ponawiany; UI rozróżnia oczekiwanie i potwierdzenie.
- Uczestnik nie dostaje listy przyszłych pytań, bieżących zbiorczych wyników ani adresu PDF. Osobne endpointy prezentera weryfikują podpis, issuer, audience, ważność JWT i allowlistę e-mail. Nagłówek z samym adresem e-mail nie wystarcza.
- Limity MVP: 100 sesji, 100 pytań/sesję, 2000 slajdów/PDF, 50 MB/PDF, 1 GB PDF łącznie, do 2 socketów/przeglądarkę i 4 socketów prezentera/sesję. Wiadomości do 2 KB, limit 2/s z krótkim zapasem 4 wiadomości na socket. Limity aplikacji ograniczają normalne zużycie; nie stanowią gwarancji braku kosztów ani pełnej ochrony przed atakiem.

## Weryfikacja

```sh
yarn build                 # TypeScript + produkcyjny frontend
yarn test                  # walidacja wejścia
yarn test:integration      # prawdziwe lokalne workerd/SQLite/R2, 200 klientów WS
yarn test:presence         # wykrywanie cichej utraty połączenia, ok. 60–90 s
yarn test:e2e              # lokalny Chrome, desktop + emulacja telefonu
yarn check:worker          # pakowanie Workera bez publikacji
DURATION_SECONDS=60 yarn test:load  # krótka próba
yarn test:load             # godzina, 200 klientów, 10 pytań, 4000 potwierdzonych zapisów
```

Testy integracyjne uruchamiają własny lokalny serwer na 8791 i 8792, a test obciążeniowy na 8793; każdy używa osobnego tymczasowego magazynu i usuwa go po zakończeniu. Testy nie uderzają w produkcję. Sprawdzają limit 201. uczestnika, zmianę A→B, ponowienie, reconnect, późny głos, wyścig z zamknięciem, prywatność PDF, CSRF, CSV i odmowę dostępu przy braku Access. `load-results.json` jest ignorowany.

Próba lokalna nie potwierdza opóźnień przez sieć konferencyjną ani zużycia limitów konta Cloudflare. Przed wydarzeniem potrzebna jest osobno uzgodniona publikacja testowa, rzeczywiste logowanie Access, test telefonu oraz godzinna próba 200 klientów w tym środowisku. Cele: p95 aktualizacji na projektorze ≤3 s i na telefonie ≤7 s, zero utraconych potwierdzonych głosów, zapas w limitach.

## Konfiguracja wdrożenia — do osobnego uzgodnienia

Nie utworzono zasobów chmurowych, nie wdrożono aplikacji i nie zmieniono DNS. Brak automatycznego skryptu publikacji.

Po osobnej zgodzie:

- Utworzyć prywatny bucket `codestorybro-live-private-pdfs` klasy Standard. Nie włączać publicznego `r2.dev` ani publicznej domeny dla bucketa.
- Ustawić `APP_ORIGIN` na dokładny origin HTTPS Live, `ACCESS_TEAM_DOMAIN` (np. `team.cloudflareaccess.com`), `ACCESS_AUD` i `PRESENTER_EMAIL`. Te wartości nie są kluczami API. Nie umieszczać tokenów Cloudflare w repozytorium.
- Skonfigurować Access dla `/presenter`, `/presenter/*`, `/api/presenter/*`, z tym samym audience i allowlistą jednego adresu e-mail. OTP lub własny IdP. Nie chronić Access ścieżek `/s/*` i `/api/sessions/*`.
- Skonfigurować domenę/route dla Workera. `workers_dev` i preview URLs są wyłączone. Nie wdrażać środowiska `local`.
- Wdrożyć migrację `v1` tworzącą klasy DO z SQLite. Zweryfikować odmowę dostępu bez logowania, wygaśnięcie JWT, PDF Range, odtwarzanie stanu i izolację uczestnika od operacji prezentera.
- Workers Free/DO Free zatrzymują operacje po wyczerpaniu limitów. R2 ma darmowy przydział, ale nalicza opłaty za nadwyżki. Włączyć monitoring zużycia; limit 1 GB dotyczy plików tej aplikacji, nie całego konta. Zasoby innych projektów mogą korzystać ze wspólnych przydziałów.
- Kopia wyników: eksport CSV po wydarzeniu. Nie usuwać namespaces ani wykonywać destrukcyjnych migracji. Rezerwacje PDF pozostawione przez przerwanie procesu mogą wymagać administracyjnego uzgodnienia z R2; są zachowane konserwatywnie, aby nie zaniżać limitu.

Źródła architektury: [DO SQLite](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), [hibernacja WebSocket](https://developers.cloudflare.com/durable-objects/best-practices/websockets/), [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/), [DO pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/), [R2 pricing](https://developers.cloudflare.com/r2/pricing/).

## Udostępnianie prezentacji

Po zakończeniu sesji wejdź do jej archiwum i wybierz **Udostępnij**. Dopiero ta akcja dodaje prezentację do publicznej listy na stronie głównej Live. **Wycofaj udostępnienie** usuwa ją z listy i blokuje kolejne pobrania. Usunięcie całej sesji usuwa także udostępniony plik. Przed usunięciem samego oryginalnego PDF-u trzeba wycofać udostępnienie.

Przeglądarka prezentera przygotowuje jedną kopię PDF: oryginalne strony pozostają w oryginalnej jakości, a pytania są wstawiane po przypisanych slajdach w kolejności prezentacji. Pytania zawierają końcowe procenty ostatniej rundy, bez liczby głosów, identyfikatorów uczestników i wcześniejszych rund. Pytania bez uruchomionego głosowania pozostają pytaniami do refleksji. Strony pytań są obrazami wysokiej rozdzielczości (1920×1080); oryginalne strony nie są rasteryzowane. Zaszyfrowany/uszkodzony PDF nie zostanie udostępniony.

Gotowa kopia (do 75 MB) trafia do tego samego prywatnego bucketa R2 i jest liczona do limitu 1 GB razem z oryginałami (do 50 MB). Pobieranie nie generuje ponownie PDF-u. Publiczne endpointy to `GET /api/presentations` (tylko tytuł, ID, data udostępnienia i liczba stron) oraz `GET /api/presentations/:id/pdf` (tylko udostępniona kopia zakończonej sesji). Modyfikacje wymagają dostępu prezentera i poprawnego Origin. R2 pozostaje prywatne; nie trzeba włączać publicznego bucketa.

Pełny ekran ukrywa nagłówek, status, przycisk i strzałki. Skróty klawiaturowe, klikacz i wyjście z pełnego ekranu pozostają takie jak wcześniej. QR przy pytaniu ma 300 px zamiast 150 px. Obie aplikacje importują wspólny `packages/ui/Footer.tsx` oraz `packages/ui/footer.css`; Vite używa automatycznej transformacji JSX i jednej kopii Reacta również dla tego komponentu.
