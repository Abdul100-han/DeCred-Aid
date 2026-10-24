'use client'

import { useEffect, useState } from 'react'
import { Menu, ShieldCheck, Wallet, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DashboardTab } from '@/components/Dashboard'

type NavTarget = DashboardTab | 'impact'

const links: { label: string; target: NavTarget }[] = [
  { label: 'Explore Credentials', target: 'passport' },
  { label: 'Issuer Portal', target: 'issuer' },
  { label: 'Verification Engine', target: 'verifier' },
  { label: 'Impact Analytics', target: 'impact' },
]

type NavbarProps = {
  activeTab: DashboardTab
  onNavigate: (target: NavTarget) => void
}

export function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)

  useEffect(() => {
    if (!walletOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setWalletOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [walletOpen])

  function navigate(target: NavTarget) {
    setOpen(false)
    onNavigate(target)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#090D16]/80 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="DeCred-Aid home">
          <span className="grid size-9 place-items-center rounded-xl border border-[#00F2FE]/30 bg-[#00F2FE]/10 text-[#00F2FE] shadow-[0_0_22px_rgba(0,242,254,0.18)]">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.03em]">
            DeCred<span className="text-[#00F2FE]">-Aid</span>
          </span>
        </a>

        <nav
          className={cn(
            'absolute left-4 right-4 top-[68px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#101727]/95 p-3 shadow-2xl backdrop-blur-md md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none',
            open ? 'flex' : 'hidden md:flex',
          )}
        >
          {links.map((link) => {
            const selected = link.target !== 'impact' && link.target === activeTab
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => navigate(link.target)}
                className={cn(
                  'rounded-lg px-3 py-2 text-left text-xs transition-colors hover:text-[#00F2FE]',
                  selected ? 'text-white' : 'text-slate-400',
                )}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300 backdrop-blur-md sm:flex">
            <span className="size-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]" />
            Base Sepolia
          </div>
          <button
            type="button"
            onClick={() => setWalletOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#00F2FE]/30 bg-[#00F2FE]/10 px-3.5 py-2 text-xs font-medium text-[#00F2FE] transition hover:bg-[#00F2FE]/20"
          >
            <Wallet className="size-3.5" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {walletOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-title"
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#101727] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00F2FE]">
                  Placeholder
                </p>
                <h2 id="wallet-title" className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  Connect Wallet
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setWalletOpen(false)}
                className="text-slate-500 hover:text-white"
                aria-label="Close wallet dialog"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              This control is a placeholder. It does not open a wallet or sign a transaction.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {['Coinbase Wallet', 'MetaMask', 'WalletConnect'].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  <span>{name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Soon</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setWalletOpen(false)}
              className="mt-5 w-full rounded-lg bg-[#00F2FE] px-4 py-3 text-sm font-semibold text-[#07131b] hover:bg-[#8af7ff]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
