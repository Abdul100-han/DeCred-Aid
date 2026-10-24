'use client'

import { useState } from 'react'
import { Dashboard, type DashboardTab } from '@/components/Dashboard'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'

export default function Page() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('passport')
  const [requestedTab, setRequestedTab] = useState<DashboardTab>('passport')
  const [requestId, setRequestId] = useState(0)

  function openWorkspace(tab: DashboardTab) {
    setActiveTab(tab)
    setRequestedTab(tab)
    setRequestId((current) => current + 1)
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  function navigate(target: DashboardTab | 'impact') {
    if (target === 'impact') {
      document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    openWorkspace(target)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090D16] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,242,254,0.14),transparent_36%),radial-gradient(circle_at_92%_18%,rgba(157,78,221,0.16),transparent_32%)]" />
      <Navbar activeTab={activeTab} onNavigate={navigate} />
      <Hero
        onLaunchPassport={() => openWorkspace('passport')}
        onVerifySkill={() => openWorkspace('verifier')}
      />
      <Dashboard
        requestedTab={requestedTab}
        requestId={requestId}
        onTabChange={setActiveTab}
      />
      <FeatureGrid />
      <Footer />
    </main>
  )
}
