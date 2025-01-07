import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pathfit = require('pathfit');

function rePath(path: string, viewBox: string) {
  const pathfitter = new Pathfit({ viewBox }, undefined, path);
  return pathfitter.scale_with_aspect_ratio(24, 24);
}

/**
 * Example Usage: `npm run redraw`
 */
const drawPath =
  'm12.0041 12.0041a12.0041 12.0041 0 0 0 -12.0041 12.0041 12.0041 12.0041 0 0 0 12.0041 12.0041 12.0041 12.0041 0 0 0 12.0041 -12.0041 12.0041 12.0041 0 0 0 -12.0041 -12.0041zm0 0.49779a11.4981 11.4981 0 0 1 11.4981 11.4981 11.4981 11.4981 0 0 1 -11.4981 11.4981 11.4981 11.4981 0 0 1 -11.4981 -11.4981 11.4981 11.4981 0 0 1 11.4981 -11.4981z';
const currentViewBox = '0 12 24.01 24.01';
console.log(rePath(drawPath, currentViewBox));
