export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-7 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© 2026 DeCred-Aid</span>
        <span>
          Powered by <span className="text-slate-300">Base</span>,{' '}
          <span className="text-slate-300">Sepolia</span>,{' '}
          <span className="text-slate-300">Solidity</span>, and{' '}
          <span className="text-slate-300">Next.js 14</span>
        </span>
        <a href="#top" className="text-slate-300 transition hover:text-[#00F2FE]">
          Back to top
        </a>
      </div>
    </footer>
  )
}
