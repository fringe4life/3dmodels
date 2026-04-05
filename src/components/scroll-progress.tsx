const ScrollProgress = () => (
  <div
    aria-hidden="true"
    className="nav-scroll-progress block-2 inline-full pointer-events-none fixed inset-x-0 z-20 shrink-0 bg-gray-400/15"
  >
    <div className="nav-scroll-progress-fill size-full bg-orange-accent" />
  </div>
);

export { ScrollProgress };
