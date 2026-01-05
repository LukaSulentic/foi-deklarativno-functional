# Functional Sensor Dashboard

Projektni zadatak iz kolegija **Deklarativno programiranje**.
Aplikacija demonstrira primjenu paradigmi funkcijskog programiranja (rekurzija, imutabilnost, funkcije višeg reda) unutar imperativnog okruženja (TypeScript/Angular).

## Cilj projekta

Implementirati osnovne funkcijske primitive (`map`, `filter`, `reduce`, `pipe`) korištenjem **rekurzije**, bez oslanjanja na ugrađene metode prototipa niza (`Array.prototype.map` i sl.), te prikazati njihovo korištenje na stvarnom setu podataka (očitanja IoT senzora).

## Funkcionalnosti

Aplikacija omogućuje vizualizaciju transformacije podataka kroz interaktivno sučelje:

1.  **Filter (Rekurzivni):** Izdvajanje kritičnih senzora (npr. baterija < 20%).
2.  **Map (Rekurzivni):** Transformacija objekata očitanja u string format alarma.
3.  **Reduce (Rekurzivni):** Agregacija podataka (izračun prosječne temperature).
4.  **Pipe (Kompozicija funkcija):** Lančano izvršavanje operacija (Filter -> Map) kroz vlastitu `pipe` implementaciju.
5.  **Edge Case Handling:** Demonstracija ponašanja rekurzivnih funkcija nad praznim skupom podataka.
6.  **Code Inspection:** Prikaz izvornog koda implementirane funkcije unutar sučelja.

## Implementacija jezgre (Core)

Sva logika nalazi se u `src/app/core/functional-utils.ts`.
Funkcije su implementirane prema principima $\lambda$-računa:
*   **Imutabilnost:** Ulazni nizovi se ne mijenjaju.
*   **Rekurzija:** Iteracija se vrši odvajanjem glave (`head`) i repa (`tail`) niza.
*   **Bez petlji:** U `core` dijelu se ne koriste `for`, `while` ni `forEach` petlje.

Primjer implementacije `filter` funkcije:
```typescript
export const myFilter = <T>(array: T[], predicateFn: (item: T) => boolean): T[] => {
    if (array.length === 0) return [];
    const [head, ...tail] = array;
    return predicateFn(head!) 
        ? [head!, ...myFilter(tail, predicateFn)] 
        : myFilter(tail, predicateFn);
};
```

## Pokretanje aplikacije

Za pokretanje projekta potrebno je imati instaliran **Node.js**.

1.  **Instalacija zavisnosti:**
    Otvorite terminal u mapi projekta i pokrenite:
    ```bash
    npm install
    ```

2.  **Pokretanje lokalnog servera:**
    Nakon instalacije, pokrenite aplikaciju naredbom:
    ```bash
    ng serve
    ```

3.  **Pristup aplikaciji:**
    Otvorite preglednik i posjetite: `http://localhost:4200/`

## Autor

Student: **Luka Šulentić**  
Fakultet organizacije i informatike (FOI)
