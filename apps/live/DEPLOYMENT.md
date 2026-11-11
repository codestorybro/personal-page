# Wdrożenie CodeStoryBro Stage na stage.codestorybro.com

Konfiguracja zgodna z kodem na 2026-11-11. Instrukcja opisuje pierwsze wdrożenie przygotowanej aplikacji; nie potwierdza stanu kont dostawców ani wykonania operacji. Przed publikacją sprawdź bieżące warunki Free w podlinkowanej dokumentacji. Zasady projektu: [AGENTS.md](../../AGENTS.md), lokalne uruchomienie i wyniki testów: [README.md](README.md). Publikacja Stage/Studio/Live jest oddzielna od deployu Next.js na Vercel.

## 1. Potwierdź Vercel i przygotuj zmiany

W istniejącym projekcie Vercel sprawdź:

- Framework: **Next.js**.
- Root Directory: katalog główny tego repozytorium, nie `apps/live`.
- Git: właściwe repozytorium, Production Branch: **main**, automatyczne deploymenty włączone.
- Dotychczasowe zmienne środowiskowe pozostają ustawione; dodaj/zmień `NEXT_PUBLIC_STAGE_URL=https://stage.codestorybro.com` dla Production.
- `CODESTORYBRO_DIST_DIR` pozostaw nieustawione na Vercel. `.next-qa` jest tylko do równoległej lokalnej weryfikacji.
- Nie konfiguruj landingu jako eksportu statycznego: język treści i metadanych jest ustalany przy żądaniu. Pozostaje to zwykły projekt Next.js; źródła brandingu i SEO są współdzielone z Live.

Po zacommitowaniu bieżących zmian, ich merge do `main` i push uruchamiają standardowy deploy landingu, jeśli powyższa integracja jest aktywna. Sam push nie publikuje Workera. W repozytorium nie ma workflow publikującego Live automatycznie. Zmiana adresu Stage wymaga nowego buildu Next.js; można ją opublikować dopiero po uruchomieniu Stage, aby uniknąć przejściowego martwego linku.

Źródło: [Vercel Git integration](https://vercel.com/docs/git).

Jeżeli Home ma zacząć promować lub sprzedawać kursy, przed publikacją oferty sprawdź zgodność obecnego planu z [zasadami Vercel Hobby](https://vercel.com/docs/plans/hobby). Nie zakładaj, że bezpłatne wystąpienia i strona sprzedażowa mają te same warunki hostingu. Migracja Home i wybór innego planu pozostają osobnymi decyzjami.

## 2. Przygotuj darmowe konto Cloudflare

Załóż/zaloguj się na konto Cloudflare. Sprawdź **Workers & Pages → plan: Workers Free**. Domena również ma korzystać z planu **Free**, a Zero Trust z **Free**. Nie wybieraj Workers Paid, R2, płatnych dodatków ani płatnych prób. Przydziały dotyczą całego konta; najlepiej nie współdzielić ich z innymi obciążonymi aplikacjami.

Na tych planach przekroczenie limitu blokuje operacje. Nie zastępuj tego alertem budżetowym: alert nie jest blokadą wydatków. Nasz limit plików 750 MB pozostawia zapas w 1 GB KV; pojedynczy PDF ma 20 MB zamiast platformowych 25 MiB. Limit aplikacji nie rezerwuje zapasu dla innych usług konta.

[Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [DO pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/), [KV pricing](https://developers.cloudflare.com/kv/platform/pricing/).

## 3. Przenieś obsługę DNS z OVH do Cloudflare

Rejestracja i odnowienia domeny pozostają w OVH. Hosting landingu pozostaje na Vercel. Zmieniasz dostawcę autorytatywnego DNS dla całej domeny.

1. Wyeksportuj/zapisz aktualną strefę DNS w OVH. Zapisz również adresy obecnych serwerów nazw.
2. W Cloudflare dodaj istniejącą domenę **codestorybro.com**, wybierz Free i zaimportuj rekordy.
3. Porównaj import z OVH. Zachowaj dokładne wartości rekordów dla apexu i `www` wskazujących Vercel. Nie kopiuj wartości z przykładowych poradników. Sprawdź też MX, SPF, DKIM, DMARC, pozostałe TXT, CAA i inne używane subdomeny. Automatyczne skanowanie nie gwarantuje kompletnego importu.
4. Rekordy landingu kierujące na Vercel pozostaw jako **DNS only** (szara chmurka). Nie zmieniaj ich adresów docelowych. Nie twórz jeszcze zwykłego CNAME dla `stage`; doda go Worker Custom Domain.
5. Jeżeli DNSSEC jest aktywne w OVH, najpierw wyłącz je/usuń stary DS zgodnie z instrukcją OVH i poczekaj na wygaśnięcie starego DS w resolverach. Nie przełączaj NS ze starym aktywnym DS.
6. W OVH, dla domeny, w sekcji serwerów DNS wpisz dwa serwery nazw przydzielone przez Cloudflare. To zmiana serwerów DNS, nie rekordów NS wpisanych ręcznie do starej strefy OVH.
7. Poczekaj, aż Cloudflare pokaże domenę jako **Active**. Sprawdź ponownie landing, `www`, HTTPS oraz pocztę. Propagacja zależy od TTL i resolvera; nie usuwaj od razu starej konfiguracji.
8. Po ustabilizowaniu migracji możesz włączyć DNSSEC w Cloudflare i dodać **nowy DS Cloudflare** u rejestratora OVH. Nie przywracaj starego DS.

Standardowe Worker Custom Domains wymagają aktywnej strefy Cloudflare. Darmowy wariant nie polega na zwykłym CNAME w pozostawionej strefie OVH.

[Cloudflare full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), [zmiana DNS w OVH](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-server-edit), [DNSSEC OVH](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-dnssec).

## 4. Zainstaluj narzędzia i zaloguj Wrangler

Node.js **22.12+**, Yarn Classic 1.22. W terminalu:

```sh
cd /Users/marcin.kolodziej/Documents/Projects/personal-page/apps/live
yarn install --frozen-lockfile
yarn wrangler login
yarn wrangler whoami
```

Zaloguj się na właściwe konto Cloudflare w otwartej przeglądarce. Nie zapisuj tokenów CLI w repozytorium. Jeśli konto ma kilka profili/organizacji, upewnij się, że korzystasz z tego, na którym domena jest Active i Workers pozostaje Free.

## 5. Utwórz prywatne KV dla PDF-ów

```sh
yarn wrangler kv namespace create codestorybro-live-pdfs --env=""
```

Zapisz zwrócone **namespace ID**. Nie twórz R2, D1 ani publicznego magazynu plików. SQLite powstanie automatycznie wewnątrz Durable Objects przy wdrożeniu migracji `v1`.

## 6. Skonfiguruj logowanie Cloudflare Access

1. Otwórz **Zero Trust**, wybierz Free i ustaw nazwę zespołu. Zapisz dokładny team domain, np. `twoj-zespol.cloudflareaccess.com`.
2. W ustawieniach logowania dodaj metodę **One-time PIN** na e-mail lub własny istniejący IdP.
3. W **Access controls → Applications** dodaj aplikację typu **Self-hosted**.
4. W jednej aplikacji dodaj publiczne adresy/ścieżki:

   - `stage.codestorybro.com/presenter`
   - `stage.codestorybro.com/presenter/*`
   - `stage.codestorybro.com/api/presenter/*`

   Wszystkie mają należeć do tej samej aplikacji Access, z jednym audience. Nie chroń całego hosta, `/s/*`, `/api/sessions/*`, `/api/presentations*` ani publicznego `/`.
5. Dodaj politykę **Allow**, warunek **Include → Emails → wyłącznie Twój dokładny adres e-mail**. Nie stosuj Bypass ani Include Everyone.
6. Ustaw czas sesji aplikacji i polityki na **24 godziny**. Sprawdź także czas sesji globalnej. Zaloguj się na obu urządzeniach przed wystąpieniem.
7. Z ustawień aplikacji skopiuj **Application Audience (AUD) Tag**.

Obecna ścieżka panelu to `/presenter` i nie ma do niej linku w interfejsie. Jeżeli chcesz inną nazwę, trzeba ją zmienić w aplikacji, `run_worker_first` oraz wszystkich regułach Access przed publikacją. Samo niepublikowanie adresu nie zastępuje logowania.

[Access dla Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/), [ścieżki aplikacji](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/), [czasy sesji](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).

## 7. Przygotuj lokalną konfigurację produkcyjną

Nie wpisuj prawdziwego adresu konta ani identyfikatorów do współdzielonego szablonu. Z katalogu `apps/live`:

```sh
cp wrangler.jsonc wrangler.production.jsonc
cp .env.example .env.local
```

Oba pliki lokalne są ignorowane przez Git. W `wrangler.production.jsonc`:

- Ustaw `account_id` na ID właściwego konta Cloudflare, szczególnie jeśli masz ich kilka.
- W głównym `kv_namespaces` dla `PDFS` zastąp same zera prawdziwym namespace ID z kroku 5.
- Główne `vars.APP_ORIGIN`: `https://stage.codestorybro.com` (bez ukośnika na końcu).
- `vars.ACCESS_TEAM_DOMAIN`: dokładny team domain, bez `https://`.
- `vars.ACCESS_AUD`: AUD aplikacji z kroku 6.
- `vars.PRESENTER_EMAIL`: dokładnie ten sam dozwolony adres e-mail co w Access.
- Dodaj na głównym poziomie:

```json
"routes": [
  { "pattern": "stage.codestorybro.com", "custom_domain": true }
]
```

Pozostaw `workers_dev: false`, `preview_urls: false`, migrację `v1`, obie klasy DO oraz `assets.run_worker_first` z aktualnego szablonu bez zmian. Ostatnia lista obejmuje także `/`, `/s/*`, `/robots.txt` i `/sitemap.xml`, aby Worker zwracał właściwe metadane; same pliki JS/CSS/brandingu korzystają z Assets. Nie dodawaj `DEV_AUTH` do głównych vars. Wpis w `env.local` jest wyłącznie lokalnym środowiskiem; deploy użyje jawnie `--env=""`.

W `.env.local` ustaw docelowy adres landingu:

```dotenv
VITE_HOME_URL=https://codestorybro.com
```

To zmienna frontendu czytana podczas buildu; zmiana wymaga ponownego `yarn build`. Adresy i audience nie są hasłami, ale lokalny plik ułatwia uniknięcie przypadkowego commita. Tokenów dostępowych nie dodawaj do żadnego pliku projektu.

## 8. Zbuduj i wykonaj kontrolę przed publikacją

```sh
yarn build
yarn test
yarn test:integration
yarn test:e2e
DURATION_SECONDS=60 yarn test:load
yarn wrangler deploy --config wrangler.production.jsonc --env="" --dry-run --outdir .worker-build
```

Testy używają lokalnego workerd i tymczasowych danych. Sprawdź w podsumowaniu dry-run, że występują **Assets, KV Namespace i dwa Durable Objects**, a nie R2. Upewnij się jeszcze raz, że konto ma Workers Free. Nie publikuj, jeżeli masz same zera w namespace ID, puste vars Access albo `DEV_AUTH` poza `env.local`.

## 9. Wykonaj właściwe wdrożenie

Poniższe polecenie publikuje kod, tworzy migrację DO i podpina domenę. Wykonaj dopiero po zakończeniu kroków 1–8:

```sh
yarn wrangler deploy --config wrangler.production.jsonc --env=""
```

Cloudflare skonfiguruje DNS `stage` i certyfikat. Poczekaj na aktywny HTTPS. Nie twórz konkurencyjnego rekordu CNAME w OVH ani Cloudflare. Nie uruchamiaj deployu z `--env local`.

[Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

## 10. Sprawdź działanie produkcji

- Otwórz `https://stage.codestorybro.com/` w incognito: publiczne Stage działa bez logowania.
- Sprawdź również `/?lang=en`. W początkowym HTML, przed uruchomieniem JS, muszą zgadzać się język, title, description, OG, canonical i hreflang. Sprawdź `/robots.txt`, `/sitemap.xml` oraz `/assets/img/og-codestorybro.png` i `/favicon.svg`. Studio i widoki uczestnika mają pozostać noindex.
- Wejdź na `/presenter`: pojawia się Access. Niedozwolony e-mail nie dostaje dostępu. `/api/presenter/me` również wymaga logowania; nie wystarczy samo ukrycie strony panelu.
- Zaloguj się swoim kontem na komputerze i telefonie. Utwórz nową sesję, wgraj mały PDF, dodaj pytanie. Dane lokalnego emulatora nie są automatycznie publikowane w chmurze.
- Otwórz projektor na komputerze, Studio na telefonie. Telefon przełącz na LTE/5G i steruj slajdami oraz pytaniami. Potwierdź synchronizację i pełny ekran.
- Uczestnikiem dołącz w innym profilu przeglądarki; sprawdź zmianę A/B, odświeżenie, odłączenie i malejący licznik. Dokładne liczniki i szczyt mają być tylko w Studio.
- Zakończ sesję, udostępnij PDF, pobierz go z publicznej listy. Po wycofaniu stare URL ma odmawiać pobrania. Usuń sesję i potwierdź usunięcie z archiwum oraz brak dostępu do PDF.
- Po nowym uploadzie KV może potrzebować około minuty lub dłużej na propagację. Podgląd ponawia 503; pobieranie można ponowić. Wycofanie dostępu jest natychmiast egzekwowane w DO, niezależnie od fizycznego usunięcia KV.
- Sprawdź metryki Workers, DO i KV. Lokalna próba 1000 klientów nie jest pomiarem limitów konta ani gwarancją opóźnień chmury. Przed deklaracją obsługi 1000 osób na wydarzeniu potrzebna jest uzgodniona próba wdrożenia; lokalne skrypty celowo nie mają automatycznego celu produkcyjnego.
- Po potwierdzeniu Stage wykonaj deploy Next.js z `NEXT_PUBLIC_STAGE_URL=https://stage.codestorybro.com`, jeżeli nie zrobiono tego wcześniej.

## Kolejne aktualizacje i kopie danych

Landing: commit/merge/push do skonfigurowanej produkcyjnej gałęzi Vercel. Stage: osobno `yarn build`, testy i `yarn wrangler deploy --config wrangler.production.jsonc --env=""`. Push nie publikuje Stage samoczynnie.

Nie zmieniaj nazw Workera, klas DO, tagu migracji `v1`, namespace ID ani nie usuwaj zasobów przy zwykłej aktualizacji. Następne rzeczywiste migracje dodawaj jako nowe tagi. Zachowaj konfigurację produkcyjną lokalnie w bezpiecznym miejscu. Po wystąpieniu pobierz CSV i potrzebne PDF-y; Free nie jest gwarancją ciągłej dostępności. Przekroczenie quota zatrzymuje operacje do resetu dziennego lub zwolnienia miejsca, bez automatycznej dopłaty.
