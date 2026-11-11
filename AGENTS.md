# CodeStoryBro: instrukcje dla agentów

Ten plik opisuje aktualne zasady projektu. Bieżące polecenia właściciela mają pierwszeństwo. Przy zmianach zachowuj zaakceptowany kierunek marki, istniejące dane i lokalne zmiany użytkownika.

## Projekt i granice zmian

- Właściciel: Marcin Kołodziej. Prowadzi zespoły inżynierskie, dzieli się wiedzą w internecie i na konferencjach, komentuje branżę IT.
- Wiedza techniczna i rozumienie ludzi są równie ważne. Tematy związane z feedbackiem czy wymaganiami opisuj konkretnie, bez coachingu i sloganów.
- `src/`: Home i weryfikacja certyfikatów, Next.js App Router na Vercel. Migracja tej aplikacji wymaga osobnej decyzji. Przyszła oferta kursów wymaga sprawdzenia warunków planu Vercel przed jej publikacją; nie zakładaj automatycznie zgodności z darmowym planem.
- `apps/live/`: React + Vite, Workers Free, Durable Objects z SQLite, prywatne KV dla PDF-ów, Access Free dla prezentera.
- `packages/ui/`: wspólne komponenty i zachowania. `packages/seo/`: wspólne treści oraz obsługa SEO. Zmieniaj wspólny komponent zamiast tworzyć inną wersję dla każdej aplikacji.
- Przed edycją sprawdź Git i lokalne instrukcje. Pracuj w istniejącym repozytorium na uzgodnionej gałęzi; nie twórz kopii repozytorium i nie resetuj cudzych zmian.
- Publikacja, DNS, przełączenie planu i zmiany zasobów chmurowych są osobnymi operacjami do uzgodnienia z właścicielem. Zgoda na lokalną implementację nie oznacza zgody na wdrożenie. Nie twórz dodatkowego procesu zatwierdzania dla już zleconej pracy.

## Marka i ton copy

Polski jest domyślny. Każda zmiana copy interfejsu obejmuje również naturalne tłumaczenie EN. Nie tłumacz nazw Home, Stage, Studio, Live ani treści wpisanej przez prezentera.

Pisz spokojnie, bezpośrednio i z perspektywy codziennej pracy. W polskim copy używaj słowa „software”, kiedy mowa o oprogramowaniu. Naturalne słownictwo IT jest odpowiednie; nie dodawaj anglicyzmów dla samego efektu.

Unikaj haseł takich jak „Lepsze rozmowy. Silniejsze zespoły.”, „Twoja następna dobra rozmowa”, obietnic transformacji i skupiania całego przekazu na „trudnych rozmowach”. Nie przywracaj odwołań do Kim Scott. Nie używaj pauzy „—” w copy strony; wybieraj kropkę, przecinek, dwukropek lub krótsze zdanie.

Punkty odniesienia dla nowych tekstów:

- Home: „Prowadzenie zespołów inżynierskich.”
- Bio: „Jestem Marcin Kołodziej. Prowadzę zespoły inżynierskie, a swoją wiedzą i doświadczeniem dzielę się w internecie oraz na konferencjach.”
- YouTube: codzienne prowadzenie zespołu i komentarze o branży IT. To główne medium. LinkedIn służy także do kontaktu; nie przywracaj X, Instagrama ani dodatkowych lejków społecznościowych.
- Stage: materiały z wystąpień i idee do zastosowania w zespole. Najpierw jasny cel, warunki do pracy i wsparcie, potem wymagania.
- Studio: krótkie, robocze etykiety i komunikaty. Panel jest dla właściciela; nie dodawaj sloganów sprzedażowych ani zbędnych dopisków technicznych.

Zatwierdzony akapit Home zachowuj dosłownie, chyba że właściciel zleci jego zmianę:

> Prowadzenie zespołów inżynierskich wymaga wiedzy technicznej i zrozumienia ludzi. Obu poświęcam tyle uwagi, na ile zasługują.

Nie traktuj tych przykładów jako treści do powielania w każdej sekcji. Unikaj powtarzających się nagłówków, np. „Porozmawiajmy o leadershipie” i „Porozmawiajmy”.

## System wizualny

Charakter: spokojny, redakcyjny minimalizm, ciemne tło, ciepła jasna typografia i delikatny niebieski. Używaj istniejących tokenów, proporcji, odstępów i komponentów. Nie wprowadzaj odrębnego stylu dla Live.

| Rola | Kolor / źródło |
| --- | --- |
| Tło | `#191919` |
| Tekst główny | `#f1e9db` |
| Akcent | `#a9c9ef` |
| Mocniejszy akcent | `#c7ddf6` |
| Pozostałe kolory | Tokeny w `src/styles/global.css` i `apps/live/src/style.css` |

Nagłówki używają Georgia/serif, tekst użytkowy Inter w Home oraz istniejącego sans-serif w Live. Nie dodawaj nowych fontów i bibliotek animacji przy zwykłej zmianie UI. Nie wracaj do zielonego akcentu, dawnych logotypów kodowych, ciężkich gradientów ani ozdobników konkurujących z treścią.

Interakcje są współdzielone w `packages/ui/interaction.css`:

- Linki: takie samo animowane podkreślenie na hover i fokusie klawiatury.
- Przyciski, inputy, textarea i dropdown: takie samo stopniowo wypełniane niebieskie obramowanie. Nie dodawaj zmiany tła przy hoverze ani osobnej dekoracyjnej ramki fokusu.
- Zachowaj widoczny fokus, obsługę klawiatury, `prefers-reduced-motion` i systemowy wskaźnik w forced-colors. Nie usuwaj informacji o fokusie bez zastępczego efektu.
- Dropdown języka obsługuje Enter, spację, strzałki, Escape i Tab; klawisze nie przełączają równocześnie slajdów.
- Zachowaj sensowne odstępy między akcjami również po zawinięciu na telefonie. Separatory `.public-presentation` są nad wierszami.

Nie przywracaj dividerów, strzałki ani zmiany tła w karcie YouTube na Home. Animowane podkreślenie wystarcza. Lista prezentacji Stage nie pokazuje etykiety „PDF · X stron”.

## Nagłówki i nawigacja

| Wariant | Kliknięcie marki | Linki w nagłówku |
| --- | --- | --- |
| CodeStoryBro Home | Home | Stage („Prezentacje”) i YouTube |
| CodeStoryBro Stage | Home | Stage („Prezentacje”) i YouTube |
| CodeStoryBro Studio | Stage | Brak linków Stage/YouTube |
| CodeStoryBro Live | Stage | Tylko YouTube |

Wspólna stopka zawiera markę, krótki opis i subtelny wybór PL/EN. Nie dodawaj odnośnika do panelu prezentera. Obecna ścieżka panelu to `/presenter`; zmiana wymaga spójnej aktualizacji routingu, reguł Workera i Access.

W pełnym ekranie projektora widać tylko slajd lub pytanie: bez nagłówka, nazwy marki, statusu połączenia, przycisku pełnego ekranu, strzałek i numeracji slajdów. Zachowaj skróty, klikacz i standardowe wyjście z pełnego ekranu. QR ma być przy pytaniu/wyniku oraz przed startem, nie stale pod PDF-em. Podgląd Studio odpowiada projektorowi i zachowuje proporcje PDF; przy zmianie slajdu zachowaj poprzedni kadr do ukończenia renderowania.

## Języki, SEO i assety

- Źródła copy: `src/components/PersonalLanding.tsx`, `packages/ui/translations.ts`, `apps/live/src/main.tsx`. Najpierw dopracuj tekst widoczny na stronie, na końcu dopasuj metadane.
- `packages/seo/content.ts` jest źródłem tekstów SEO PL/EN; `src/utils/Metadata.ts` tworzy metadane Next.js, a `apps/live/worker/seo.ts` obsługuje HTML Stage. `packages/seo/browser.ts` synchronizuje metadane po wyborze języka.
- Zachowaj PL jako wariant domyślny, `?lang=en` dla EN, zgodne `html lang`, canonical, hreflang, sitemapy, OG i karty udostępniania. Sprawdzaj początkowy HTML, nie tylko DOM po uruchomieniu JS.
- Home jest renderowane na żądanie w Next.js. Nie usuwaj przekazywania języka przez middleware/layout bez zachowania języka treści i metadanych SSR.
- Publiczne Home/Stage mogą być indeksowane. Studio, uczestnicy, projektor i weryfikacja certyfikatów nie powinny być indeksowane. Zachowaj routing `run_worker_first` dla chronionego panelu oraz HTML przetwarzanego przez Worker; pliki statyczne mają nadal korzystać z obsługi Assets.
- Kanoniczny adres Home wynika z `AppConfig.url` / `NEXT_PUBLIC_SITE_URL` (domyślnie `https://www.codestorybro.com`); adres Stage to `https://stage.codestorybro.com`. Używaj `NEXT_PUBLIC_STAGE_URL` i `VITE_HOME_URL` zgodnie z istniejącym mechanizmem linków.
- Oryginały brandingu są w głównym `public/`: `favicon.svg`, warianty ICO/PNG/Apple, `assets/img/og-codestorybro.png` (1200×630), `assets/img/logo-main.svg`. Vite kopiuje potrzebne pliki przy buildzie; nie utrzymuj drugiego zestawu źródeł w `apps/live/public`.
- Obraz udostępniania zawiera wyłącznie „CodeStoryBro”, ciemne tło i niebieski akcent. Favicon to monogram „cb”. Zachowaj zdjęcie właściciela i font Inter, które są używane. Usuwaj assety dopiero po sprawdzeniu odwołań w kodzie, CSS, metadanych i konfiguracji buildu; nie edytuj wygenerowanych katalogów zamiast źródeł.
- Blog jest wycofany. Zachowaj przekierowania dawnych adresów na Home i nie przywracaj go do nawigacji ani sitemap.

## Niezmienniki Live i kosztów

Właściciel wymaga bezwzględnego limitu kosztów hostingu 0 zł, nawet kosztem odmowy operacji. Utrzymuj Workers/DO/KV/Access Free; nie zamieniaj blokady planu Free na sam alert budżetowy ani nie przywracaj R2. Aktualne limity aplikacji są w `LIMITS` w `apps/live/shared/protocol.ts`: 1000 uczestników, 5 pytań, 20 MB na plik, 750 MB łącznie, 100 sesji, 2000 slajdów. Nie duplikuj wartości w walidacji klienta i serwera.

Uczestnik jest anonimową tożsamością przeglądarki z cookie danej sesji, nie adresem IP ani zweryfikowaną osobą. Jeden QR działa przez całe wystąpienie. Odpowiedź można zmieniać do zamknięcia pytania. Pytania otwierają się automatycznie po przypisanych slajdach, pozostają pozycjami osi prezentacji i można do nich wracać. Ponowne uruchomienie zeruje nową rundę, zachowując historię poprzedniej.

Dokładne liczby głosów i historyczny szczyt uczestników są prywatne, tylko w Studio. Publiczne wyniki pokazują procenty. Materiały stają się publiczne dopiero po zakończeniu sesji i jawnym „Udostępnij”. Wycofanie i autoryzację egzekwuje spójny DO; eventual consistency KV nie może pozostawiać dostępu przez stary URL.

Telefon prezentera i komputer projektora mają działać z tego samego konta w różnych sieciach przez wspólne wdrożenie HTTPS. Nie zastępuj synchronizacji rozwiązaniem zależnym od LAN.

## Weryfikacja i dokumentacja

Uruchamiaj sprawdzenia odpowiednie do zmiany opisane w [README.md](README.md) i [apps/live/README.md](apps/live/README.md). Nie deklaruj sprawdzenia produkcji na podstawie lokalnego workerd. Dla zmian wyglądu obejrzyj desktop i telefon (minimum 390 px); dla interakcji sprawdź klawiaturę, a dla SEO języki w początkowym HTML i dostępność assetów.

Nie zatrzymuj serwera użytkownika. Gdy Next dev działa równolegle, buduj podgląd w `.next-qa` przez `CODESTORYBRO_DIST_DIR`, aby nie nadpisywać manifestów `.next`. Nie dokładaj testów odtwarzających samo brzmienie kosmetycznej zmiany copy; utrzymuj istniejące testy i sprawdzaj zachowanie, które mogło się zepsuć.

Aktualizuj właściwy dokument zamiast dopisywać kolejne dzienniki rozmów i audytów. Aktualny opis projektu jest w README, przebieg Live w jego README, a wdrożenie w [apps/live/DEPLOYMENT.md](apps/live/DEPLOYMENT.md). Historię dawnych decyzji zachowuje Git. Przy zmianach planów dostawców sprawdzaj bieżące oficjalne limity; zapisane wartości nie są bezterminową gwarancją.
