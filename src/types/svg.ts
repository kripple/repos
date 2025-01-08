const link =
  'm11.6625 4.9125 1.875 -1.875a5.25 5.25 0 1 1 7.425 7.425l-3.75 3.75a5.25 5.25 0 0 1 -7.425 0 1.1265 1.1265 0 0 1 0.027 -1.563 1.1265 1.1265 0 0 1 1.563 -0.027 2.997 2.997 0 0 0 4.245 0l3.75 -3.75a3.003 3.003 0 0 0 -4.245 -4.245l-1.875 1.875a1.1265 1.1265 0 0 1 -1.563 -0.027 1.1265 1.1265 0 0 1 -0.027 -1.563zm-7.035 14.46a2.997 2.997 0 0 0 4.245 0l1.875 -1.875a1.1265 1.1265 0 0 1 1.563 0.027 1.1265 1.1265 0 0 1 0.027 1.563l-1.875 1.875a5.25 5.25 0 1 1 -7.425 -7.425l3.75 -3.75a5.25 5.25 0 0 1 7.425 0 1.1265 1.1265 0 0 1 -0.027 1.563 1.1265 1.1265 0 0 1 -1.563 0.027 2.997 2.997 0 0 0 -4.245 0l-3.75 3.75a2.997 2.997 0 0 0 0 4.245z' as const;
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
const sun =
  'M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z' as const;

export const Svg = {
  link,
  location,
  moon,
  octocat,
  repo,
  search,
  sun,
};

export type Icon = keyof typeof Svg;
export type DrawPath = valueof<typeof Svg>;
