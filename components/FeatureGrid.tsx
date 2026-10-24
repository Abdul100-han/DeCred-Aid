'use client'

import { motion } from 'framer-motion'
import { Fingerprint, LockKeyhole, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: LockKeyhole,
    title: 'Non-Transferable Soulbound Tokens (SBTs)',
    text: 'A skill credential is minted to one worker and cannot be sold, lent, or reassigned.',
    accent: 'teal',
  },
  {
    icon: Fingerprint,
    title: 'Zero-Knowledge Identity Guard',
    text: 'Employers check that a skill is real while the worker’s name, location, and documents stay hidden.',
    accent: 'violet',
  },
  {
    icon: Network,
    title: 'Multi-Sig NGO Attestation Network',
    text: 'Accredited training centers co-sign each credential so a single issuer cannot fabricate trust.',
    accent: 'teal',
  },
] as const

export function FeatureGrid() {
  return (
    <section id="impact" className="relative z-10 mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-24 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9D4EDD]">
          Impact analytics
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Trust that travels with the worker.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className={cn(
                  'mb-10 grid size-11 place-items-center rounded-xl border',
                  feature.accent === 'teal'
                    ? 'border-[#00F2FE]/30 bg-[#00F2FE]/10 text-[#00F2FE]'
                    : 'border-[#9D4EDD]/30 bg-[#9D4EDD]/15 text-[#c084fc]',
                )}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold leading-6">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-400">{feature.text}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
