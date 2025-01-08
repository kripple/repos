declare type OnClick = (event: { target: { value: string } }) => void;

// declare type valueof<T> = T[number];
declare type valueof<T> = T[keyof T];
