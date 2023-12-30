import { useCallback, useRef } from "react";

const fadeInKeyframes: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
const fadeOutKeyframes: Keyframe[] = [{ opacity: 1 }, { opacity: 0 }];

const fadeOptions = {
  duration: 200,
  iterations: 1,
};

export function useDialogController() {
  const ref = useRef<HTMLDialogElement>(null);

  const show = useCallback(() => {
    if (!ref.current?.open) {
      ref.current?.show();
      ref.current?.animate(fadeInKeyframes, fadeOptions);
    }
  }, []);

  const showModal = useCallback(() => {
    if (!ref.current?.open) {
      ref.current?.showModal();
      ref.current?.animate(fadeInKeyframes, fadeOptions);
    }
  }, []);

  const close = useCallback((cb?: () => void) => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const animation = el.animate(fadeOutKeyframes, fadeOptions);
    animation.onfinish = () => {
      el.close();
      cb?.();
    };
  }, []);

  return { ref, show, showModal, close };
}
