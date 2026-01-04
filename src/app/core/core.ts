

// Vlastiti Map
export const myMap = <T, U>(array: T[], transformFn: (item: T) => U): U[] => {
    if (array.length === 0){
        return [];
    }

    const [head, ...tail] = array;

    return [transformFn(head!), ...myMap(tail, transformFn)];
};

// Vlastiti Filter
export const myFilter = <T>(array: T[], predicateFn: (item: T) => boolean): T[] => {
    if (array.length === 0){
        return [];
    }

    const [head, ...tail] = array;

    if(predicateFn(head!)){
        return[head!, ...myFilter(tail,predicateFn)];
    } else {
        return myFilter(tail, predicateFn);
    }
};

// Vlastiti Reducer
export const myReduce = <T, A>(array: T[], reducerFn: (acc: A, item: T) => A, initialValue: A): A => {
    if (array.length === 0) {
        return initialValue;
    }

    const [head, ...tail] = array;

    const newAcc = reducerFn(initialValue, head!);

    return myReduce(tail, reducerFn, newAcc);
};

// Vlastiti Pipe
export const myPipe = <T>(initialValue: T, ...fns: Function[]): any => {
    return myReduce(fns, (acc, fn) => fn(acc), initialValue);
};