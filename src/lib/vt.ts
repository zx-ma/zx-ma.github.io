// Type-safe guard for experimental API without eslint any errors
type ViewTransitionStarter = (cb: () => void) => { finished: Promise<void> };

export async function withViewTransition(fn: () => void | Promise<void>) {
  // Gracefully fall back if the API isn't available
  const start = (document as unknown as { startViewTransition?: ViewTransitionStarter })
    .startViewTransition;
  if (start) {
    // Wrap synchronous state updates so the browser can animate between DOM snapshots
    const tx = start(() => {
      void fn();
    });
    try {
      await tx.finished;
    } catch {
      // ignore
    }
  } else {
    await fn();
  }
}
