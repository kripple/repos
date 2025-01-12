declare type Union<T extends Array<string>> = T[number];

declare type ValueOf<T> = T[keyof T];
