const pluckKeyframes: Keyframe[] = [
  { transform: 'scale(0.8)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
];

const pluckTiming = {
  duration: 100,
  iterations: 1,
} satisfies KeyframeAnimationOptions;

export function pluckElement(el: HTMLElement | null | undefined) {
  if (el) {
    el.animate(pluckKeyframes, pluckTiming);
  }
}

const flipInKeyframes: Keyframe[] = [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(0.5)' },
  { transform: 'scaleY(0)' },
];

const flipOutKeyframes: Keyframe[] = [
  { transform: 'scaleY(0)' },
  { transform: 'scaleY(0.5)' },
  { transform: 'scaleY(1)' },
];

const flipTiming = {
  duration: 300,
  iterations: 1,
  fill: 'forwards',
  easing: 'linear',
} satisfies KeyframeAnimationOptions;

type FlipElementOptions = {
  delay: number;
  afterFlipIn: () => void;
};

export function flipElement(
  el: HTMLElement | null | undefined,
  { delay, afterFlipIn }: FlipElementOptions,
) {
  if (!el) {
    return;
  }

  const flipIn = new Animation(
    new KeyframeEffect(el, flipInKeyframes, { ...flipTiming, delay }),
  );
  const flipOut = new Animation(
    new KeyframeEffect(el, flipOutKeyframes, flipTiming),
  );

  flipIn.onfinish = () => {
    afterFlipIn();
    flipOut.play();
  };

  flipIn.play();
}
