const close =
  'M23.4719 0.546282a1.81366 1.81366 0 0 0 -2.56753 0L12 9.43247 3.0956 0.528073a1.81366 1.81366 0 0 0 -2.56753 0c-0.710167 0.710167 -0.710167 1.85736 0 2.56753L9.43247 12 0.528073 20.9044c-0.710167 0.710167 -0.710167 1.85736 0 2.56753s1.85736 0.710167 2.56753 0L12 14.5675l8.9044 8.9044c0.710167 0.710167 1.85736 0.710167 2.56753 0s0.710167 -1.85736 0 -2.56753L14.5675 12l8.9044 -8.9044c0.691958 -0.691958 0.691958 -1.85736 0 -2.54932';
const link =
  'm11.6143 3.9 2.14286 -2.14286a6 6 0 1 1 8.48571 8.48571l-4.28571 4.28571a6 6 0 0 1 -8.48571 0 1.28743 1.28743 0 0 1 0.0308571 -1.78629 1.28743 1.28743 0 0 1 1.78629 -0.0308571 3.42514 3.42514 0 0 0 4.85143 0l4.28571 -4.28571a3.432 3.432 0 0 0 -4.85143 -4.85143l-2.14286 2.14286a1.28743 1.28743 0 0 1 -1.78629 -0.0308571 1.28743 1.28743 0 0 1 -0.0308571 -1.78629zm-8.04 16.5257a3.42514 3.42514 0 0 0 4.85143 0l2.14286 -2.14286a1.28743 1.28743 0 0 1 1.78629 0.0308571 1.28743 1.28743 0 0 1 0.0308571 1.78629l-2.14286 2.14286a6 6 0 1 1 -8.48571 -8.48571l4.28571 -4.28571a6 6 0 0 1 8.48571 0 1.28743 1.28743 0 0 1 -0.0308571 1.78629 1.28743 1.28743 0 0 1 -1.78629 0.0308571 3.42514 3.42514 0 0 0 -4.85143 0l-4.28571 4.28571a3.42514 3.42514 0 0 0 0 4.85143z' as const;
const location =
  'm18.894 17.394 -5.3025 5.304a2.25 2.25 0 0 1 -3.183 0l-5.3025 -5.304a9.75 9.75 0 1 1 13.788 -13.7895 9.75 9.75 0 0 1 0 13.7895zm-1.59 -12.198l0 -0.0015a7.5 7.5 0 1 0 -10.608 10.608L12 21.105l5.304 -5.301a7.5 7.5 0 0 0 0 -10.608zM12 13.5a3 3 0 1 1 -0.0015 -5.9985A3 3 0 0 1 12 13.5z' as const;
const moon =
  'M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1' as const;
const octocat =
  'M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z' as const;
const repo =
  'M3 3.75A3.75 3.75 0 0 1 6.75 0l13.125 0a1.125 1.125 0 0 1 1.125 1.125l0 18.75a1.125 1.125 0 0 1 -1.125 1.125l-3.75 0a1.125 1.125 0 0 1 0 -2.25l2.625 0l0 -3l-12 0a1.5 1.5 0 0 0 -1.071 2.55 1.125 1.125 0 1 1 -1.608 1.575A3.7425 3.7425 0 0 1 3 17.25zm15.75 -1.5l-12 0a1.5 1.5 0 0 0 -1.5 1.5l0 10.062A3.729 3.729 0 0 1 6.75 13.5l12 0zM7.5 18.375a0.375 0.375 0 0 1 0.375 -0.375l5.25 0a0.375 0.375 0 0 1 0.375 0.375l0 4.875a0.375 0.375 0 0 1 -0.6 0.3l-2.175 -1.6305a0.3735 0.3735 0 0 0 -0.45 0L8.1 23.55a0.375 0.375 0 0 1 -0.6 -0.3z' as const;
const search =
  'M16.02 17.61a9 9 0 0 1 -11.883 -13.473 9 9 0 0 1 13.473 11.883l4.56 4.56a1.1235 1.1235 0 0 1 -0.489 1.9125 1.1235 1.1235 0 0 1 -1.101 -0.3225zM17.25 10.5a6.7485 6.7485 0 1 0 -13.4955 0A6.7485 6.7485 0 0 0 17.25 10.5z' as const;
const sortByAlphabet =
  'M0 5.84615C0 5.33636 0.41328 4.92308 0.923077 4.92308L13.2308 4.92308C13.7406 4.92308 14.1538 5.33636 14.1538 5.84615C14.1538 6.35595 13.7406 6.76923 13.2308 6.76923L0.923077 6.76923C0.41328 6.76923 0 6.35595 0 5.84615zM17.5385 4.92308C17.9017 4.92308 18.2311 5.13611 18.3802 5.46736L23.9186 17.775C24.1279 18.24 23.9206 18.7865 23.4558 18.9956C22.9908 19.2048 22.4443 18.9975 22.2352 18.5327L20.4661 14.6014L14.6108 14.6014L12.8417 18.5327C12.6326 18.9975 12.0862 19.2048 11.6212 18.9956C11.1563 18.7865 10.949 18.24 11.1583 17.775L16.6967 5.46736C16.8458 5.13611 17.1753 4.92308 17.5385 4.92308zM15.4416 12.7552L19.6353 12.7552L17.5385 8.09556L15.4416 12.7552zM0 12C0 11.4902 0.41328 11.0769 0.923077 11.0769L9.53846 11.0769C10.0482 11.0769 10.4615 11.4902 10.4615 12C10.4615 12.5098 10.0482 12.9231 9.53846 12.9231L0.923077 12.9231C0.41328 12.9231 0 12.5098 0 12zM0 18.1538C0 17.6441 0.41328 17.2308 0.923077 17.2308L7.07692 17.2308C7.58672 17.2308 8 17.6441 8 18.1538C8 18.6636 7.58672 19.0769 7.07692 19.0769L0.923077 19.0769C0.41328 19.0769 0 18.6636 0 18.1538z' as const;
const sortByTime =
  'M0.837209 5.5814A0.837209 0.837209 0 0 0 0 6.4186 0.837209 0.837209 0 0 0 0.837209 7.25581l8.93023 0A0.837209 0.837209 0 0 0 10.6047 6.4186 0.837209 0.837209 0 0 0 9.76744 5.5814zm16.7442 0c-3.53496 0 -6.4186 2.88364 -6.4186 6.4186 0 3.53496 2.88364 6.4186 6.4186 6.4186 3.53496 0 6.4186 -2.88364 6.4186 -6.4186 0 -3.53496 -2.88364 -6.4186 -6.4186 -6.4186zm0 1.67442c2.63002 0 4.74419 2.11417 4.74419 4.74419 0 2.63002 -2.11417 4.74419 -4.74419 4.74419 -2.63002 0 -4.74419 -2.11417 -4.74419 -4.74419 0 -2.63002 2.11417 -4.74419 4.74419 -4.74419zm0 1.67442A0.837209 0.837209 0 0 0 16.7442 9.76744l0 2.06032a0.837293 0.837293 0 0 0 0.204942 0.549419l1.11628 1.28634a0.837209 0.837209 0 0 0 1.17951 0.085027 0.837209 0.837209 0 0 0 0.085027 -1.17951L18.4186 11.516L18.4186 9.76744A0.837209 0.837209 0 0 0 17.5814 8.93023zm-16.7442 2.23256A0.837209 0.837209 0 0 0 0 12 0.837209 0.837209 0 0 0 0.837209 12.8372L7.53488 12.8372A0.837209 0.837209 0 0 0 8.37209 12 0.837209 0.837209 0 0 0 7.53488 11.1628zm0 5.5814A0.837209 0.837209 0 0 0 0 17.5814 0.837209 0.837209 0 0 0 0.837209 18.4186l8.93023 0A0.837209 0.837209 0 0 0 10.6047 17.5814 0.837209 0.837209 0 0 0 9.76744 16.7442z' as const;
const sun =
  'M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z' as const;

export const Svg = {
  close,
  link,
  location,
  moon,
  octocat,
  repo,
  search,
  sortByAlphabet,
  sortByTime,
  sun,
};

export type Icon = keyof typeof Svg;
export type DrawPath = valueof<typeof Svg>;
