'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, Sparkles } from 'lucide-react'

const metrics = [
  { value: '$1.2M+', label: 'Grants Unlocked' },
  { value: '4,850+', label: 'Verified SBTs' },
  { value: '99.4%', label: 'Privacy Score' },
]

type HeroProps = {
  onLaunchPassport: () => void
  onVerifySkill: () => void
}

export function Hero({ onLaunchPassport, onVerifySkill }: HeroProps) {
  return (
    <section id="top" className="relative z-10 mx-auto max-w-[1200px] px-5 pb-16 pt-16 text-center lg:px-8 lg:pb-24 lg:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#00F2FE]/25 bg-[#00F2FE]/10 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#00F2FE] backdrop-blur-md">
          <Sparkles className="size-3" />
          Built for Web3 Social Good 2026 • SMU
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-[68px]">
          A credential passport for{' '}
          <span className="bg-gradient-to-r from-[#00F2FE] to-[#9D4EDD] bg-clip-text text-transparent">
            displaced workers
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Soulbound skill tokens that employers can verify, and that workers can share without
          exposing their identity, location, or history.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onLaunchPassport}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#00F2FE] px-5 py-3 text-sm font-semibold text-[#07131b] transition hover:bg-[#8af7ff] sm:w-auto"
          >
            Launch Worker Passport
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={onVerifySkill}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
          >
            <ScanLine className="size-4 text-[#00F2FE]" />
            Verify Skill Token
          </button>
        </div>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-5 py-5">
            <p className="text-2xl font-semibold tracking-[-0.04em] text-white">{metric.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
