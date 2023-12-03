const shakeKeyframes = [
  { transform: "translateX(-1px)" },
  { transform: "translateX(2px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(4px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(4px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(2px)" },
  { transform: "translateX(-1px)" },
];

const shakeTiming = {
  duration: 500,
  iterations: 1,
};

export function shakeElement(el: HTMLElement | null | undefined) {
  if (el) {
    el.animate(shakeKeyframes, shakeTiming);
  }
}
