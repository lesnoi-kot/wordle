const pluckKeyframes = [
  { transform: 'scale(0.8)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
];

const pluckTiming = {
  duration: 100,
  iterations: 1,
};

export function pluckElement(el: HTMLElement | null | undefined) {
  if (el) {
    el.animate(pluckKeyframes, pluckTiming);
  }
}
