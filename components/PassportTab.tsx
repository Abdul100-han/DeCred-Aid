'use client'

import { useState } from 'react'
import { BadgeCheck, Check, Copy, QrCode } from 'lucide-react'
import { cn } from '@/lib/utils'

const skills = [
  {
    name: 'Carpentry Level 3',
    issuer: 'Kigali Skills Collective',
    date: 'Verified Jan 2026',
    tone: 'teal',
  },
  {
    name: 'Solar Infrastructure Specialist',
    issuer: 'SunWorks Initiative',
    date: 'Verified Nov 2025',
    tone: 'violet',
  },
  {
    name: 'Frontend Web Dev',
    issuer: 'Code for Good DAO',
    date: 'Verified Aug 2025',
    tone: 'blue',
  },
] as const

const toggles = [
  { key: 'hideName', label: 'Hide legal name', detail: 'Verifiers see a pseudonym only.' },
  { key: 'hideLocation', label: 'Hide location', detail: 'Country and camp stay off the proof.' },
  { key: 'skillsOnly', label: 'Disclose skills only', detail: 'Share claims, not identity documents.' },
] as const

type PrivacyKey = (typeof toggles)[number]['key']

const qrCells = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 1, 0, 0, 1,
  1, 1, 0, 1, 1, 0, 1,
  0, 1, 1, 0, 1, 1, 0,
  1, 0, 1, 1, 0, 1, 1,
  1, 0, 0, 1, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
]

export function PassportTab() {
  const [copied, setCopied] = useState(false)
  const [privacy, setPrivacy] = useState<Record<PrivacyKey, boolean>>({
    hideName: true,
    hideLocation: true,
    skillsOnly: true,
  })

  const displayName = privacy.hideName ? 'Worker #004850' : 'Amina K.'
  const shareLink = 'https://decredaid.app/verify/sbt-004850'

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink)
    } catch {
      // Clipboard can be blocked outside a secure context; still confirm the action locally.
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.2fr_320px]">
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              Passport active
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em]">{displayName}</h3>
            <p className="mt-1 font-mono text-[11px] text-slate-500">did:decred:0x71C4…4E9A</p>
          </div>
          <BadgeCheck className="size-7 text-[#00F2FE]" />
        </div>

        <div className="mb-6 grid gap-2 sm:grid-cols-3">
          {toggles.map((toggle) => {
            const enabled = privacy[toggle.key]
            return (
              <button
                key={toggle.key}
                type="button"
                aria-pressed={enabled}
                onClick={() =>
                  setPrivacy((current) => ({ ...current, [toggle.key]: !current[toggle.key] }))
                }
                className={cn(
                  'rounded-xl border px-3 py-3 text-left transition',
                  enabled
                    ? 'border-[#00F2FE]/30 bg-[#00F2FE]/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10',
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-white">{toggle.label}</span>
                  <span
                    className={cn(
                      'relative h-4 w-7 rounded-full transition',
                      enabled ? 'bg-[#00F2FE]' : 'bg-white/15',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 size-3 rounded-full bg-[#090D16] transition',
                        enabled ? 'left-3.5' : 'left-0.5',
                      )}
                    />
                  </span>
                </span>
                <span className="mt-2 block text-[11px] leading-4 text-slate-400">{toggle.detail}</span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
            >
              <div
                className={cn(
                  'grid size-10 shrink-0 place-items-center rounded-lg text-xs font-semibold',
                  skill.tone === 'teal' && 'bg-[#00F2FE]/10 text-[#00F2FE]',
                  skill.tone === 'violet' && 'bg-[#9D4EDD]/15 text-[#c084fc]',
                  skill.tone === 'blue' && 'bg-sky-400/10 text-sky-200',
                )}
              >
                SBT
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
                    VERIFIED
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {skill.issuer} · {skill.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0b111e] p-6 text-center">
        <div className="mb-4 rounded-xl border border-[#00F2FE]/20 bg-white p-3" aria-hidden="true">
          <div className="grid grid-cols-7 gap-1">
            {qrCells.map((cell, index) => (
              <span
                key={index}
                className={cn('size-3.5 rounded-[2px]', cell ? 'bg-[#090D16]' : 'bg-transparent')}
              />
            ))}
          </div>
        </div>
        <QrCode className="mb-2 size-4 text-[#00F2FE]" />
        <p className="text-xs font-medium">QR verification share link</p>
        <p className="mt-1 break-all font-mono text-[10px] leading-5 text-slate-500">{shareLink}</p>
        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          {privacy.skillsOnly
            ? 'The link proves skills only. Identity stays off-chain.'
            : 'This preview would also disclose the worker profile.'}
        </p>
        <button
          type="button"
          onClick={copyLink}
          className="mt-5 inline-flex items-center gap-2 text-[11px] text-[#00F2FE] hover:text-white"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? 'Link copied' : 'Copy share link'}
        </button>
      </aside>
    </div>
  )
}
