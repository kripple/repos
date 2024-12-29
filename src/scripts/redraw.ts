import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pathfit = require('pathfit');

function rePath(path: string, viewBox: string) {
  const pathfitter = new Pathfit({ viewBox }, undefined, path);
  return pathfitter.scale_with_aspect_ratio(24, 24);
}

console.log(rePath('some-path', '0 0 16 16'));
