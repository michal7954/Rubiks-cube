# Rubiks-cube
Projekt końcoworoczny - aplikacje serwerowe, w zespołach dwuosobowych.

Zalecane wersje oprogramowania:

- Node.js v8.9.4
- Socket.io ^1.7.3
- MongoDB
- Firefox 60 / Chrome 67

Aby uruchomić aplikację należy:

1. Posiadać lub doinstalować wyżej wymienione/kompatybilne wersje oprogramowania.
2. Uruchomić lokalnie serwer MongoDB
3. Uruchomić plik server.js poleceniem node server.js
4. http://localhost:3000

Sterowanie:

1. Prawy przycisk myszki: obracanie kamery wokół kostki.
2. Kółko myszki: przybliżanie i oddalanie kamery od kostki.
3. Przytrzymaj klawisz Enter aby wymieszać kostkę.
4. Przytrzymaj lewy przycisk myszki i przeciągnij kursorem po przynajmniej trzech blokach należących dokładnie do jednej płaszczyzny (tylko jedna wartość z obiektu position jest identyczna dla wybranych bloków) - obrót odpowiedniego rzędu wykona się automatycznie po zwolnieniu przycisku.

Sterowanie opcjonalne:

5. Wybierz oś obrotu: w panelu kontrolnym, przyciski X Y Z lub klawisze X Y Z Q W E na klawiaturze.
6. Wybierz obracany rząd (licząc od centrum osi pomocniczych: przyciski w panelu kontrolnym lub klawisze 1 2 3 na klawiaturze.
7. Strzałkami lewo/góra lub prawo/dół na klawiaturze obracaj wybranym rzędem.
