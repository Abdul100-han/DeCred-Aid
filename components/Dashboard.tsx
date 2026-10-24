'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { IssuerTab } from '@/components/IssuerTab'
import { PassportTab } from '@/components/PassportTab'
import { VerifierTab } from '@/components/VerifierTab'

export type DashboardTab = 'passport' | 'issuer' | 'verifier'

const tabs: { id: DashboardTab; label: string }[] = [
  { id: 'passport', label: 'Worker Passport' },
  { id: 'issuer', label: 'Issuer Portal' },
  { id: 'verifier', label: 'Verification Engine' },
]

type DashboardProps = {
  requestedTab: DashboardTab
  requestId: number
  onTabChange?: (tab: DashboardTab) => void
}

export function Dashboard({ requestedTab, requestId, onTabChange }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('passport')

  useEffect(() => {
    if (requestId === 0) return
    setActiveTab(requestedTab)
  }, [requestId, requestedTab])

  function selectTab(tab: DashboardTab) {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <section id="workspace" className="relative z-10 mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-20 lg:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00F2FE]">
            Credential workspace
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">One passport. Three roles.</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Base Sepolia
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-md">
        <div className="flex overflow-x-auto border-b border-white/10" role="tablist" aria-label="Credential workspace">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={cn(
                  'whitespace-nowrap border-b-2 px-5 py-4 text-xs font-medium transition',
                  selected
                    ? 'border-[#00F2FE] text-[#00F2FE]'
                    : 'border-transparent text-slate-500 hover:text-slate-300',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === 'passport' && <PassportTab />}
              {activeTab === 'issuer' && <IssuerTab />}
              {activeTab === 'verifier' && <VerifierTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
