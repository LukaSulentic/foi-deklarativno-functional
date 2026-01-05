export const CODE_SNIPPETS = {
  filter: `// Rekurzivna implementacija FILTER funkcije
export const myFilter = <T>(array: T[], predicateFn: (item: T) => boolean): T[] => {
    // Base case: Ako je niz prazan, vrati prazan niz
    if (array.length === 0){
        return [];
    }

    // Destrukturiranje: glava (prvi element) i rep (ostatak)
    const [head, ...tail] = array;

    // Rekurzivni korak
    if(predicateFn(head!)){
        // Ako glava zadovoljava uvjet, zadrži je i nastavi s repom
        return [head!, ...myFilter(tail, predicateFn)];
    } else {
        // Ako ne, odbaci glavu i nastavi s repom
        return myFilter(tail, predicateFn);
    }
};`,

  map: `// Rekurzivna implementacija MAP funkcije
export const myMap = <T, U>(array: T[], transformFn: (item: T) => U): U[] => {
    if (array.length === 0){
        return [];
    }

    const [head, ...tail] = array;

    // Primijeni transformaciju na glavu i rekurzivno na rep
    return [transformFn(head!), ...myMap(tail, transformFn)];
};`,

  reduce: `// Rekurzivna implementacija REDUCE funkcije
export const myReduce = <T, A>(array: T[], reducerFn: (acc: A, item: T) => A, initialValue: A): A => {
    if (array.length === 0) {
        return initialValue;
    }

    const [head, ...tail] = array;

    // Izračunaj novu vrijednost akumulatora
    const newAcc = reducerFn(initialValue, head!);

    // Rekurzivni poziv s novim akumulatorom
    return myReduce(tail, reducerFn, newAcc);
};`,

  pipe: `// Implementacija PIPE funkcije korištenjem Reduce-a
export const myPipe = <T>(initialValue: T, ...fns: Function[]): any => {
    // Prolazimo kroz listu funkcija i prosljeđujemo rezultat jedne u drugu
    return myReduce(fns, (acc, fn) => fn(acc), initialValue);
};`
};