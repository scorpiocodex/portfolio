/**
 * The intro overlay is controlled by `<html data-intro="playing">`, set by the
 * pre-paint script in app/layout.tsx and removed by IntroSequence (or a failsafe
 * timeout). Anything that should wait for the intro — e.g. the hero typewriter —
 * can await this.
 */
export function whenIntroDone(): Promise<void> {
  const root = document.documentElement;
  if (root.getAttribute("data-intro") !== "playing") return Promise.resolve();

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (root.getAttribute("data-intro") !== "playing") {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
  });
}
