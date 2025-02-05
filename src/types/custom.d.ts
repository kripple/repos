declare type Union<T extends ReadonlyArray<string>> = T[number];

declare type ValueOf<T> = T[keyof T];
