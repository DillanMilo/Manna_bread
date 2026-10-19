// Run: node --test components/kitchen-moments/entrance.test.mjs
// Local DOM-contract stubs only; no browser, network or live data.
import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { enhanceEntrance } from './entrance.ts';

const options = { delay: 0.1, load: false, compact: false, image: false };
let observed;
let animations;
let cancelled;
let played;
let disconnected;

beforeEach(() => {
  observed = [];
  animations = [];
  cancelled = 0;
  played = 0;
  disconnected = 0;
  globalThis.window = { innerHeight: 4200, matchMedia: () => ({ matches: false }) };
  globalThis.IntersectionObserver = class {
    constructor(callback, settings) { this.callback = callback; this.settings = settings; observed.push(this); }
    observe(element) { this.element = element; }
    disconnect() { disconnected++; }
  };
});

afterEach(() => { delete globalThis.window; delete globalThis.IntersectionObserver; });

function element(top = 3000) {
  return {
    style: {},
    getBoundingClientRect: () => ({ top, bottom: top + 200 }),
    animate: (frames, settings) => { animations.push({ frames, settings }); return { cancel: () => cancelled++ }; },
  };
}

test('content already visible in a 4200px viewport animates without waiting for an observer', () => {
  const target = element();
  enhanceEntrance(target, options, () => played++);
  assert.equal(played, 1);
  assert.equal(observed.length, 0);
  assert.equal(animations.length, 1);
  assert.equal(animations[0].settings.fill, 'backwards'); // No hidden fill survives completion.
  assert.deepEqual(target.style, {});
});

test('scroll entry uses a generous margin and low threshold and runs only once', () => {
  enhanceEntrance(element(6000), options, () => played++);
  assert.deepEqual(observed[0].settings, { rootMargin: '360px 0px', threshold: 0.01 });
  observed[0].callback([{ isIntersecting: true }]);
  observed[0].callback([{ isIntersecting: true }]);
  assert.equal(played, 1);
  assert.equal(animations.length, 1);
});

test('an observer that never calls back leaves offscreen content fully readable', () => {
  const target = element(6000);
  enhanceEntrance(target, options, () => played++);
  assert.equal(animations.length, 0);
  assert.deepEqual(target.style, {});
});

test('missing or failed observers never leave hidden styles behind', () => {
  for (const Observer of [undefined, class { constructor() { throw new Error('Unavailable'); } }]) {
    globalThis.IntersectionObserver = Observer;
    const target = element(6000);
    assert.doesNotThrow(() => enhanceEntrance(target, options, () => played++));
    assert.deepEqual(target.style, {});
  }
});

test('Pause motion cleanup cancels active animations and observers', () => {
  const cleanup = enhanceEntrance(element(6000), options, () => played++);
  observed[0].callback([{ isIntersecting: true }]);
  cleanup();
  assert.equal(cancelled, 1);
  assert.ok(disconnected >= 1);
});

test('reduced motion and absent or broken animation APIs preserve visible content', () => {
  const target = element();
  globalThis.window.matchMedia = () => ({ matches: true });
  enhanceEntrance(target, options, () => played++);
  assert.equal(played, 0);
  globalThis.window.matchMedia = () => ({ matches: false });
  target.animate = undefined;
  assert.doesNotThrow(() => enhanceEntrance(target, options, () => played++));
  target.animate = () => { throw new Error('Unavailable'); };
  assert.doesNotThrow(() => enhanceEntrance(target, options, () => played++));
  assert.deepEqual(target.style, {});
});
