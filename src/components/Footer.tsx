export function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-4 px-12 py-5"
      style={{ background: "var(--dark)" }}
    >
      <div className="font-display text-[14px] font-black uppercase tracking-[0.28em] text-white">
        <span className="text-fire2">Crude</span> Academy
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
        Made with love, Claude, and Dr. Pepper
      </div>
    </footer>
  );
}
