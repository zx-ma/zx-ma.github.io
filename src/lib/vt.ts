// Type-safe guard for the experimental View Transitions API
type ViewTransitionStarter = (cb: () => void) => unknown;

export function withViewTransition(fn: () => void) {
  const start = (document as unknown as { startViewTransition?: ViewTransitionStarter })
    .startViewTransition;
  if (typeof start === "function") {
    start(() => {
      fn();
    });
  } else {
    fn();
  }
}
