# FintrackFrontend

FintrackFrontend je frontendová část aplikace pro sledování financí. Tento projekt je napsán v TypeScriptu a využívá moderní technologie pro tvorbu uživatelského rozhraní. Cílem projektu je poskytnout uživatelům jednoduchý a intuitivní způsob sledování jejich finančních toků.

## Funkce projektu
- Sledování příjmů a výdajů
- Vizualizace finančních dat pomocí grafů
- Uživatelsky přívětivé rozhraní

## Požadavky
Před spuštěním projektu se ujistěte, že máte nainstalovány následující nástroje:
- [Node.js](https://nodejs.org/) (doporučená verze: 16.x nebo vyšší)
- [npm](https://www.npmjs.com/) nebo [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) pro práci s Expo aplikací.

## Instalace a spuštění

Před samotnou instalací a spuštěním projektu je důležité věnovat pozornost několika klíčovým bodům, uvedeným níže:

### 1. Požadavky
Ujistěte se, že máte nainstalováno:
- [Node.js](https://nodejs.org/) (doporučená verze: 16.x nebo vyšší)
- [npm](https://www.npmjs.com/) nebo [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) pro práci s Expo aplikací.

### 2. Konfigurace prostředí
Projekt používá různé konfigurace v závislosti na prostředí (např. `local`, `production`). Konfigurace se nachází v souboru `app.config.js`. Před spuštěním je nutné ověřit následující:
- **API_URL**: Pro místní prostředí (`local`) je třeba zajistit, aby adresa API byla správná (např. `http://192.168.1.83:8080/api/v1`).
- **OAuth Klienti**: Tato aplikace používá Google OAuth klientské ID pro Android a iOS. Ověřte, že hodnoty v `AUTH` odpovídají vašim pověřením.

Pokud chcete změnit prostředí, upravte hodnotu `ENV` v souboru `app.config.js`:
`javascript
const ENV = 'local'; // nebo 'production' `

### 3. Instalace závislostí
Po naklonování repozitáře nainstalujte všechny závislosti:

`bash
git clone https://github.com/baiukov/fintrackFrontend.git
cd fintrackFrontend
npm install
# nebo použijte yarn
yarn install`

### 4. Spuštění aplikace
Spusťte vývojový server pomocí Expo CLI:

Po spuštění vývojového сервера uvidíte QR kód. Tento QR kód můžete naskenovat pomocí aplikace Expo Go na vašem mobilním zařízení (dostupné v [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) a [App Store](https://apps.apple.com/app/expo-go/id982107779)).

### 5. Otevření na mobilním zařízení
1. Stáhněte a nainstalujte aplikaci **Expo Go** na vašem telefonu.
2. Ujistěte se, že váš telefon i počítač jsou připojeny ke stejné Wi-Fi síti.
3. Spusťte vývojový сервер pomocí `npm start` nebo `yarn start`.
4. Otevře se **Expo Developer Tools** ve vašem prohlížeči. Zde uvidíte QR kód.
5. Otevřete aplikaci **Expo Go** na telefonu a naskenujte QR kód.
6. Aplikace se automaticky načte na vašem zařízení.

### 6. Další poznámky k instalaci
- **Bezpečnostní úložiště**: Aplikace používá `expo-secure-store` pro ukládání citlivých dat, jako jsou `accessToken` a `refreshToken`. Zajistěte, že máte správně nainstalovaný modul Secure Store.
- **Interceptors**: Backend API využívá interceptory (např. pro obnovu tokenů). Zkontrolujte, že váš backend poskytuje správné odpovědi na `/user/auth/refresh`.

### 7. Testování
Pro ověření funkčnosti API a dalších služeb se doporučuje použít místní nebo produkční server, který odpovídá nastavení v `ENV`.

### 8. Debugging
Pokud narazíte na problém při spuštění, ověřte:
- Správnost hodnot v `app.config.js`.
- Dostupnost API na zadané adrese (`API_URL`).
- Správné nainstalování všech modulů (`node_modules`).

### Struktura projektu
- **src/**: Obsahuje zdrojový kód aplikace.
- **public/**: Obsahuje veřejné statické soubory, jako jsou obrázky nebo ikony.

### Příspěvky
Pokud chcete přispět do tohoto projektu, neváhejte vytvořit pull request nebo nahlásit chybu v sekci Issues.

### Licence
Tento projekt je licencován pod licencí MIT
