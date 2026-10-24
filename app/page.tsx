'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Menu,
  Network,
  QrCode,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  Zap,
} from 'lucide-react'

const credentials = [
  { name: 'Carpentry Level 3', issuer: 'Kigali Skills Collective', date: 'Verified Jan 2026', tone: 'teal', icon: '⌁' },
  { name: 'Solar Tech Certified', issuer: 'SunWorks Initiative', date: 'Verified Nov 2025', tone: 'violet', icon: '✦' },
  { name: 'Frontend Developer', issuer: 'Code for Good DAO', date: 'Verified Aug 2025', tone: 'blue', icon: '◈' },
]

const features = [
  { icon: LockKeyhole, title: 'Non-transferable SBTs', text: 'Credentials are bound to a wallet forever. No trading, no counterfeits, no gatekeeping.', accent: 'teal' },
  { icon: Fingerprint, title: 'Zero-knowledge identity', text: 'Prove what you can do without exposing who you are, where you live, or your history.', accent: 'violet' },
  { icon: Network, title: 'Decentralized attestation', text: 'Accredited NGOs co-sign every credential with transparent, multi-party verification.', accent: 'blue' },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState('passport')
  const [walletOpen, setWalletOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  function copyLink() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#090d16] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(0,242,254,0.10),transparent_38%),radial-gradient(circle_at_95%_35%,rgba(157,78,221,0.09),transparent_28%)]" />
      <header className="relative z-20 border-b border-white/[0.08] bg-[#090d16]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="DeCred-Aid home">
            <span className="grid size-9 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(0,242,254,0.16)]"><ShieldCheck /></span>
            <span className="text-[15px] font-semibold tracking-[-0.03em]">DeCred<span className="text-cyan-300">-Aid</span></span>
          </a>
          <nav className={`${mobileMenu ? 'flex' : 'hidden'} absolute left-4 right-4 top-[68px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#101727] p-3 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            {['Explore Credentials', 'Issuer Portal', 'Verification Engine', 'Impact Analytics'].map((item, index) => <a key={item} href="#workspace" onClick={() => setMobileMenu(false)} className={`rounded-lg px-3 py-2 text-xs transition-colors hover:text-cyan-300 ${index === 0 ? 'text-white' : 'text-slate-400'}`}>{item}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-[11px] text-slate-400 sm:flex"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f2fe]" /> Base / Sepolia <ChevronDown className="size-3" /></div>
            <button onClick={() => setWalletOpen(true)} className="hidden items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3.5 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/20 sm:flex"><Wallet className="size-3.5" /> Connect wallet</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden" aria-label="Toggle navigation">{mobileMenu ? <X className="size-4" /> : <Menu className="size-4" />}</button>
          </div>
        </div>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-[1240px] px-5 pb-20 pt-20 text-center lg:px-8 lg:pt-28">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-200"><Sparkles className="size-3" /> Built for Web3 Social Good 2026 <span className="text-slate-600">•</span> DoraHacks SMU</div>
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[72px]">Sovereign work credentials for the <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent">world&apos;s unbanked</span> &amp; displaced</h1>
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Empowering refugees and informal workers with tamper-proof, privacy-first Soulbound Credentials verifiable anywhere on-chain.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"><button onClick={() => { setActiveTab('passport'); document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }) }} className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#07131b] transition hover:bg-cyan-200 sm:w-auto">Launch worker passport <ArrowRight className="size-4 transition group-hover:translate-x-1" /></button><button onClick={() => { setActiveTab('verify'); document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] sm:w-auto"><ScanLine className="size-4 text-cyan-300" /> Verify a skill token</button></div>
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025] text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0"><Metric value="$1.2M+" label="Unlocked grant funds" /><Metric value="4,850+" label="Verified worker SBTs" /><Metric value="99.4%" label="Privacy integrity score" suffix="ZK" /></div>
      </section>

      <section id="workspace" className="relative z-10 mx-auto max-w-[1240px] scroll-mt-20 px-5 pb-24 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">The credential layer</p><h2 className="text-2xl font-semibold tracking-[-0.04em]">One passport. Anywhere.</h2></div><div className="flex items-center gap-2 text-xs text-slate-500"><span className="size-1.5 rounded-full bg-emerald-400" /> Network operational <span className="ml-2 font-mono text-[10px]">BASE_MAINNET</span></div></div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-cyan-950/10">
          <div className="flex overflow-x-auto border-b border-white/10 bg-white/[0.02]">{[['passport', 'Worker passport hub'], ['issuer', 'NGO / issuer portal'], ['verify', 'Verification lookup']].map(([key, label]) => <button key={key} onClick={() => setActiveTab(key)} className={`whitespace-nowrap border-b-2 px-5 py-4 text-xs font-medium transition ${activeTab === key ? 'border-cyan-300 text-cyan-200' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>{label}</button>)}</div>
          {activeTab === 'passport' && <Passport copied={copied} onCopy={copyLink} />}
          {activeTab === 'issuer' && <Issuer />}
          {activeTab === 'verify' && <Verify />}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 lg:px-8"><div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">Why DeCred-Aid</p><h2 className="text-2xl font-semibold tracking-[-0.04em]">Trust, without compromise.</h2></div><Zap className="size-5 text-cyan-300" /></div><div className="grid gap-4 md:grid-cols-3">{features.map(({ icon: Icon, title, text, accent }) => <div key={title} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-white/20"><div className={`mb-10 grid size-11 place-items-center rounded-xl border ${accent === 'teal' ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200' : accent === 'violet' ? 'border-violet-300/25 bg-violet-300/10 text-violet-200' : 'border-blue-300/25 bg-blue-300/10 text-blue-200'}`}><Icon className="size-5" /></div><h3 className="mb-2 text-sm font-semibold">{title}</h3><p className="text-sm leading-6 text-slate-500">{text}</p></div>)}</div></section>

      <footer className="relative z-10 border-t border-white/10"><div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-7 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 DeCred-Aid Protocol</span><span>Powered by <span className="text-slate-400">Base</span>, <span className="text-slate-400">Ethereum</span>, <span className="text-slate-400">Foundry</span> &amp; <span className="text-slate-400">Next.js</span></span><a href="#top" className="text-slate-400 hover:text-cyan-300">Documentation <ExternalLink className="ml-1 inline size-3" /></a></div></footer>

      {walletOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#111827] p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between"><div><p className="text-xs uppercase tracking-widest text-cyan-300">Secure connection</p><h2 className="mt-2 text-xl font-semibold">Connect your wallet</h2></div><button onClick={() => setWalletOpen(false)} className="text-slate-500 hover:text-white" aria-label="Close wallet dialog"><X /></button></div><div className="flex flex-col gap-2">{['Coinbase Wallet', 'MetaMask', 'WalletConnect'].map(name => <button key={name} onClick={() => setWalletOpen(false)} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]"><span className="flex items-center gap-3"><Wallet className="size-4 text-cyan-300" /> {name}</span><ArrowRight className="size-4 text-slate-500" /></button>)}</div><p className="mt-5 text-center text-[11px] leading-5 text-slate-500">By connecting, you agree to verify credentials on Base Sepolia.</p></div></div>}
    </main>
  )
}

function Metric({ value, label, suffix }: { value: string; label: string; suffix?: string }) { return <div className="px-5 py-5"><div className="flex items-baseline gap-2"><span className="text-2xl font-semibold tracking-[-0.04em] text-white">{value}</span>{suffix && <span className="text-[10px] text-cyan-300">{suffix}</span>}</div><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">{label}</p></div> }

function Passport({ copied, onCopy }: { copied: boolean; onCopy: () => void }) { return <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_290px]"><div><div className="mb-7 flex items-start justify-between"><div><div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-300" /> Passport active</div><h3 className="text-2xl font-semibold tracking-[-0.04em]">Amina K.</h3><p className="mt-1 font-mono text-[11px] text-slate-500">did:decred:0x71...4e9a</p></div><BadgeCheck className="size-7 text-cyan-300" /></div><div className="grid gap-3">{credentials.map(c => <div key={c.name} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"><div className={`grid size-10 shrink-0 place-items-center rounded-lg text-xl ${c.tone === 'teal' ? 'bg-cyan-300/10 text-cyan-200' : c.tone === 'violet' ? 'bg-violet-300/10 text-violet-200' : 'bg-blue-300/10 text-blue-200'}`}>{c.icon}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium">{c.name}</p><span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300">VERIFIED</span></div><p className="mt-1 truncate text-xs text-slate-500">{c.issuer} · {c.date}</p></div><ArrowRight className="hidden size-4 text-slate-600 sm:block" /></div>)}</div></div><aside className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0b111e] p-6 text-center"><div className="mb-4 grid size-32 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.04]"><QrCode className="size-24 text-cyan-200" strokeWidth={1} /></div><p className="text-xs font-medium">Share your passport</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Identity stays private. Skills stay provable.</p><button onClick={onCopy} className="mt-5 flex items-center gap-2 text-[11px] text-cyan-300 hover:text-cyan-200">{copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? 'Link copied' : 'Copy share link'}</button></aside></div> }

function Issuer() { return <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_300px]"><div><div className="mb-7"><p className="mb-2 text-[10px] uppercase tracking-widest text-violet-300">Accredited issuer</p><h3 className="text-2xl font-semibold tracking-[-0.04em]">Mint a skill passport</h3><p className="mt-2 text-sm text-slate-500">Create a permanent, privacy-preserving credential for a worker.</p></div><div className="grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-xs text-slate-400 sm:col-span-2">Worker wallet address / DID<input className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" placeholder="0x... or did:decred:..." /></label><label className="flex flex-col gap-2 text-xs text-slate-400">Skill category<select className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-xs text-slate-300 outline-none focus:border-cyan-300/50"><option>Skilled trades</option><option>Technology</option><option>Healthcare</option></select></label><label className="flex flex-col gap-2 text-xs text-slate-400">Verification expiry<input type="date" className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-xs text-slate-300 outline-none focus:border-cyan-300/50" /></label><label className="flex flex-col gap-2 text-xs text-slate-400 sm:col-span-2">Proof hash / off-chain IPFS hash<input className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" placeholder="Qm..." /></label></div><button className="mt-6 flex items-center gap-2 rounded-lg bg-violet-300 px-4 py-3 text-xs font-semibold text-[#140c20] hover:bg-violet-200">Review &amp; mint credential <ArrowRight className="size-4" /></button></div><div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-5"><ShieldCheck className="mb-10 size-6 text-violet-200" /><h4 className="text-sm font-medium">Your attestation matters</h4><p className="mt-2 text-xs leading-6 text-slate-500">Every credential is co-signed by accredited humanitarian bodies and recorded on Base.</p><div className="mt-6 flex items-center gap-2 text-[10px] text-emerald-300"><Check className="size-3" /> Multi-sig protected</div></div></div> }

function Verify() { return <div className="min-h-[370px] p-5 sm:p-8"><div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center"><div className="mb-6 grid size-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Search /></div><p className="mb-2 text-[10px] uppercase tracking-widest text-cyan-300">Public verification engine</p><h3 className="text-2xl font-semibold tracking-[-0.04em]">Is this credential authentic?</h3><p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Enter a token ID or scan the worker&apos;s QR code. No personal identity is ever revealed.</p><div className="mt-8 flex w-full gap-2"><input className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" placeholder="Credential token ID · e.g. SBT-004850" /><button className="grid size-11 shrink-0 place-items-center rounded-lg bg-cyan-300 text-[#07131b] hover:bg-cyan-200" aria-label="Search credential"><Search className="size-4" /></button></div><button className="mt-5 flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300"><QrCode className="size-4" /> Scan a QR code instead</button></div></div> }
