// declare type valueof<T> = T[number];
declare type valueof<T> = T[keyof T];
