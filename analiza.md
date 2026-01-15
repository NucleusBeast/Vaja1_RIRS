# Kratek opis analize (na podlagi priloženih zaslonskih posnetkov)

## Datadog \- splošno

- Pipeline success rate prikazan kot 89%.
- Vidnih 9 izvedb za izbrani pipeline; večina jobov kratkih (večino pod ~1 min).
- Jobs summary prikazuje en commit/izvedbo na job; to pomeni majhen vzorec podatkov — metrike so pa vseeno uporabne za odkrivanje vzorcev.
- Vidni jobi: `build-frontend`, `build-backend`, `test-frontend`, `test-backend`, `docker-build`, `sonarcloud-analysis`, `deploy-*`, … Trajanje nekaterih jobov (`docker-build`, `deploy-production`) ~1 min.

## Snyk (Dockerfile / base image)

- Trenutna baza v repo/scan: `node:18-alpine` — Snyk prikaže 8 ranljivosti.
- Priporočilo za nadgradnjo: `node:25.2.1-alpine` — v predlogu 0 ranljivosti.
- To kaže, da so varnostne pomanjkljivosti povezane predvsem z zastarelo verzijo.

## GitHub Secret Scanning

- Najden javni puščajoči MongoDB Atlas URI v `backend/.env` (oznaka: Public leak).
- Lokacija in tip skrivnosti zahtevata takojšnjo obravnavo (rotacija, odstranitev iz repozitorija + čiščenje zgodovine).

## Dodatna opazka iz metapodatkov (screenshot)

- Repo manifest prikazuje Dockerfile, target OS `alpine:3.21.3` — skladno z uporabo alpine base image.

## Zaključek / prioritete (kratko)

- **Kritično:** javna MongoDB URI (tretji screenshot) — obravnava kot kompromitacija.
- **Nizko:** 8 ranljivosti v trenutni base image (Snyk) — nadgradnja verzije bi znatno zmanjšala tveganje.