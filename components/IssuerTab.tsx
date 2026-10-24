'use client'

import { type FormEvent, useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'

const categories = [
  'Skilled trades',
  'Clean energy',
  'Technology',
  'Healthcare',
  'Agriculture',
]

type IssuedCredential = {
  tokenId: string
  worker: string
  category: string
  proof: string
  expiry: string
}

export function IssuerTab() {
  const [worker, setWorker] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [proof, setProof] = useState('')
  const [expiry, setExpiry] = useState('')
  const [error, setError] = useState('')
  const [issued, setIssued] = useState<IssuedCredential | null>(null)

  function issueCredential(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!worker.trim() || !proof.trim() || !expiry) {
      setIssued(null)
      setError('Enter a worker wallet or DID, an IPFS proof hash, and an expiry date.')
      return
    }
    const suffix = proof.trim().slice(-4).toUpperCase() || '4E9A'
    setError('')
    setIssued({
      tokenId: `SBT-${suffix}`,
      worker: worker.trim(),
      category,
      proof: proof.trim(),
      expiry,
    })
  }

  return (
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.2fr_300px]">
      <form onSubmit={issueCredential}>
        <div className="mb-7">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9D4EDD]">
            Accredited issuer
          </p>
          <h3 className="text-2xl font-semibold tracking-[-0.04em]">Issue a soulbound credential</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            NGOs and training centers attest a skill. The token stays bound to the worker wallet.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs text-slate-400 sm:col-span-2">
            Worker Wallet Address / DID
            <input
              value={worker}
              onChange={(event) => setWorker(event.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-[#00F2FE]/50"
              placeholder="0x... or did:decred:..."
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-slate-400">
            Skill Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#101727] px-3 py-3 text-xs text-slate-200 outline-none focus:border-[#00F2FE]/50"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs text-slate-400">
            Verification Expiry
            <input
              type="date"
              value={expiry}
              onChange={(event) => setExpiry(event.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs text-slate-200 outline-none focus:border-[#00F2FE]/50"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-slate-400 sm:col-span-2">
            Proof Hash (IPFS)
            <input
              value={proof}
              onChange={(event) => setProof(event.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-[#00F2FE]/50"
              placeholder="Qm..."
            />
          </label>
        </div>

        {error && <p className="mt-4 text-xs text-rose-300">{error}</p>}

        <button
          type="submit"
          className="mt-6 rounded-lg bg-[#9D4EDD] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#b56cf0]"
        >
          Issue Soulbound Credential
        </button>

        {issued && (
          <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm">
            <p className="flex items-center gap-2 font-medium text-emerald-200">
              <Check className="size-4" />
              Credential staged locally as {issued.tokenId}
            </p>
            <dl className="mt-3 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Worker</dt>
                <dd className="mt-1 break-all font-mono">{issued.worker}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Category</dt>
                <dd className="mt-1">{issued.category}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Proof hash</dt>
                <dd className="mt-1 break-all font-mono">{issued.proof}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Expires</dt>
                <dd className="mt-1">{issued.expiry}</dd>
              </div>
            </dl>
          </div>
        )}
      </form>

      <aside className="h-fit rounded-xl border border-[#9D4EDD]/20 bg-[#9D4EDD]/10 p-5 backdrop-blur-md">
        <ShieldCheck className="mb-8 size-6 text-[#c084fc]" />
        <h4 className="text-sm font-medium">Attestation stays with the NGO</h4>
        <p className="mt-2 text-xs leading-6 text-slate-400">
          Issuance is prepared here for review. On-chain minting waits until the multi-sig
          attestation contract is connected.
        </p>
        <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300">
          <Check className="size-3" />
          Non-transferable by design
        </div>
      </aside>
    </div>
  )
}
