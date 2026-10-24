'use client'

import { type FormEvent, useState } from 'react'
import { Search, ShieldCheck, ShieldX } from 'lucide-react'
import { cn } from '@/lib/utils'

type LookupResult = {
  query: string
  valid: boolean
  skill: string
  ngoName: string
  ngoAddress: string
  timestamp: string
  zkStatus: string
}

const registry: Record<string, Omit<LookupResult, 'query'>> = {
  'sbt-004850': {
    valid: true,
    skill: 'Carpentry Level 3',
    ngoName: 'Kigali Skills Collective',
    ngoAddress: '0x71C4…4E9A',
    timestamp: '14 Jan 2026 · 09:22 UTC',
    zkStatus: 'Proof valid · holder identity hidden',
  },
  'sbt-004851': {
    valid: true,
    skill: 'Solar Infrastructure Specialist',
    ngoName: 'SunWorks Initiative',
    ngoAddress: '0x4b18…A21C',
    timestamp: '02 Nov 2025 · 16:04 UTC',
    zkStatus: 'Proof valid · location commitment sealed',
  },
  'sbt-004852': {
    valid: true,
    skill: 'Frontend Web Dev',
    ngoName: 'Code for Good DAO',
    ngoAddress: '0x9e02…F31D',
    timestamp: '19 Aug 2025 · 11:40 UTC',
    zkStatus: 'Proof valid · skills-only disclosure',
  },
  qmywapjzv5czsna625s3xf2nemtygppdwez79ojwnpbdg: {
    valid: true,
    skill: 'Carpentry Level 3',
    ngoName: 'Kigali Skills Collective',
    ngoAddress: '0x71C4…4E9A',
    timestamp: '14 Jan 2026 · 09:22 UTC',
    zkStatus: 'IPFS hash matches sealed proof · identity hidden',
  },
}

export function VerifierTab() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<LookupResult | null>(null)
  const [searched, setSearched] = useState(false)

  function lookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = query.trim().toLowerCase().replace(/\s+/g, '')
    setSearched(true)
    if (!normalized) {
      setResult(null)
      return
    }
    const match = registry[normalized]
    if (!match) {
      setResult({
        query: query.trim(),
        valid: false,
        skill: 'No matching credential',
        ngoName: '—',
        ngoAddress: '—',
        timestamp: '—',
        zkStatus: 'No zero-knowledge proof on file',
      })
      return
    }
    setResult({ query: query.trim(), ...match })
  }

  return (
    <div className="p-5 sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl border border-[#00F2FE]/20 bg-[#00F2FE]/10 text-[#00F2FE]">
          <Search className="size-5" />
        </div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00F2FE]">
          Verification engine
        </p>
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">Check a skill token</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
          Employers and donors look up a token ID or proof hash. The result shows validity, the
          issuing NGO, the timestamp, and the zero-knowledge proof status.
        </p>

        <form onSubmit={lookup} className="mt-8 flex w-full gap-2">
          <label className="sr-only" htmlFor="credential-query">
            Token ID or hash
          </label>
          <input
            id="credential-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-[#00F2FE]/50"
            placeholder="Token ID or hash · e.g. SBT-004850"
          />
          <button
            type="submit"
            className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#00F2FE] text-[#07131b] hover:bg-[#8af7ff]"
            aria-label="Look up credential"
          >
            <Search className="size-4" />
          </button>
        </form>
        <p className="mt-3 text-[11px] text-slate-500">Try SBT-004850, SBT-004851, or SBT-004852.</p>
      </div>

      {searched && result && (
        <div
          className={cn(
            'mx-auto mt-8 max-w-2xl rounded-2xl border p-5 text-left backdrop-blur-md',
            result.valid ? 'border-emerald-300/20 bg-emerald-300/5' : 'border-rose-300/20 bg-rose-300/5',
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] text-slate-400">{result.query}</p>
              <h4 className="mt-1 text-lg font-semibold">{result.skill}</h4>
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                result.valid ? 'bg-emerald-400/15 text-emerald-200' : 'bg-rose-400/15 text-rose-200',
              )}
            >
              {result.valid ? <ShieldCheck className="size-3.5" /> : <ShieldX className="size-3.5" />}
              {result.valid ? 'Valid' : 'Invalid'}
            </span>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Issuing NGO</dt>
              <dd className="mt-1 text-sm">{result.ngoName}</dd>
              <dd className="mt-1 break-all font-mono text-[11px] text-slate-400">{result.ngoAddress}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Timestamp</dt>
              <dd className="mt-1 text-sm">{result.timestamp}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                ZK verification proof
              </dt>
              <dd className="mt-1 text-sm text-slate-200">{result.zkStatus}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}
