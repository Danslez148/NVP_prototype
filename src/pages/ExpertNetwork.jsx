import { useState } from 'react'

const markets = ['All', 'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'Ghana', 'Rwanda', 'Ethiopia']
const expertises = ['All', 'Fintech', 'Energy', 'Agtech', 'Infrastructure', 'Healthcare', 'Private Equity', 'Policy & Regulation']

const experts = [
  {
    id: 1,
    name: 'Amara Diallo',
    title: 'Managing Partner',
    firm: 'West Africa Ventures',
    market: 'Nigeria',
    expertise: 'Fintech',
    bio: 'Former Goldman Sachs MD with 18 years deploying capital across West African fintech. Led $400M+ in Series A–C deals including PayStack pre-acquisition.',
    dealflow: '$400M+',
    years: 18,
    connections: 214,
    responseRate: '92%',
    responseTime: '< 24h',
    tags: ['Mobile Payments', 'Lending', 'B2B SaaS'],
    avatar: 'AD',
    avatarColor: '#1B4F8A',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Dr. Nkechi Osei',
    title: 'Director of Energy Investments',
    firm: 'AfricaEnergy Capital',
    market: 'Ghana',
    expertise: 'Energy',
    bio: 'PhD in Renewable Systems from MIT. Pioneered off-grid solar financing models now operating in 6 countries. Advisor to the African Development Bank.',
    dealflow: '$210M+',
    years: 14,
    connections: 178,
    responseRate: '88%',
    responseTime: '< 48h',
    tags: ['Solar', 'Off-grid', 'Carbon Credits'],
    avatar: 'NO',
    avatarColor: '#D4A017',
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Tariq El-Mansouri',
    title: 'Head of Infrastructure',
    firm: 'MENA-Africa Bridge Fund',
    market: 'Egypt',
    expertise: 'Infrastructure',
    bio: 'Structured over $1.2B in infrastructure financing across North and East Africa. Deep relationships with sovereign wealth funds and DFIs.',
    dealflow: '$1.2B+',
    years: 22,
    connections: 341,
    responseRate: '79%',
    responseTime: '< 72h',
    tags: ['Ports', 'Roads', 'DFI Relations'],
    avatar: 'TE',
    avatarColor: '#C1440E',
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Wanjiru Kamau',
    title: 'Founder & CEO',
    firm: 'Savanna Health Ventures',
    market: 'Kenya',
    expertise: 'Healthcare',
    bio: 'Built and exited two health-tech startups in East Africa. Now backs early-stage founders solving last-mile healthcare delivery across the continent.',
    dealflow: '$85M+',
    years: 11,
    connections: 132,
    responseRate: '95%',
    responseTime: '< 12h',
    tags: ['Telemedicine', 'Diagnostics', 'Health Insurance'],
    avatar: 'WK',
    avatarColor: '#2D6A4F',
    verified: true,
    featured: true,
  },
  {
    id: 5,
    name: 'Jean-Paul Nkurunziza',
    title: 'Senior Investment Officer',
    firm: 'East Africa Growth Fund',
    market: 'Rwanda',
    expertise: 'Agtech',
    bio: 'Specialist in agricultural value chains across the Great Lakes region. Worked with IFC and Norfund to deploy blended finance in climate-smart agriculture.',
    dealflow: '$150M+',
    years: 13,
    connections: 189,
    responseRate: '84%',
    responseTime: '< 48h',
    tags: ['Value Chains', 'Blended Finance', 'Smallholders'],
    avatar: 'JN',
    avatarColor: '#7C3AED',
    verified: true,
    featured: false,
  },
  {
    id: 6,
    name: 'Fatima Benali',
    title: 'Partner, Policy & Regulatory',
    firm: 'Atlas Advisory Group',
    market: 'Morocco',
    expertise: 'Policy & Regulation',
    bio: 'Former advisor to the Moroccan Ministry of Finance. Expert in cross-border regulatory frameworks for foreign investors entering North and Francophone Africa.',
    dealflow: 'N/A',
    years: 16,
    connections: 267,
    responseRate: '81%',
    responseTime: '< 48h',
    tags: ['Regulatory Compliance', 'Market Entry', 'Francophone Africa'],
    avatar: 'FB',
    avatarColor: '#0F6E56',
    verified: true,
    featured: false,
  },
  {
    id: 7,
    name: 'Sipho Dlamini',
    title: 'Principal, Private Equity',
    firm: 'Southern Cross Capital',
    market: 'South Africa',
    expertise: 'Private Equity',
    bio: '15 years in PE across Southern Africa with JSE-listed exit experience. Focus on consumer, logistics, and tech-enabled services.',
    dealflow: '$320M+',
    years: 15,
    connections: 223,
    responseRate: '76%',
    responseTime: '< 72h',
    tags: ['Buyouts', 'Consumer', 'Logistics'],
    avatar: 'SD',
    avatarColor: '#8B2E08',
    verified: true,
    featured: false,
  },
  {
    id: 8,
    name: 'Hana Tesfaye',
    title: 'Investment Director',
    firm: 'Horn of Africa Capital',
    market: 'Ethiopia',
    expertise: 'Agtech',
    bio: 'Pioneering investor in Ethiopian agritech, with deep government and development finance relationships. Fluent in Amharic, Somali, and Arabic.',
    dealflow: '$60M+',
    years: 9,
    connections: 104,
    responseRate: '90%',
    responseTime: '< 24h',
    tags: ['Food Security', 'Supply Chain', 'East Africa'],
    avatar: 'HT',
    avatarColor: '#1B4F8A',
    verified: false,
    featured: false,
  },
]

const statCards = [
  { label: 'Vetted Experts', value: '214', sub: 'across 54 markets' },
  { label: 'Avg Response Rate', value: '86%', sub: 'within 48 hours' },
  { label: 'Combined Dealflow', value: '$4.2B+', sub: 'tracked capital deployed' },
  { label: 'New This Month', value: '12', sub: 'recently joined' },
]

export default function ExpertNetwork({ user, navigate }) {
  const [activeMarket, setActiveMarket] = useState('All')
  const [activeExpertise, setActiveExpertise] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [connectedIds, setConnectedIds] = useState([])
  const [requestedIds, setRequestedIds] = useState([])
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const filtered = experts
    .filter(e => activeMarket === 'All' || e.market === activeMarket)
    .filter(e => activeExpertise === 'All' || e.expertise === activeExpertise)
    .filter(e => !featuredOnly || e.featured)
    .filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.firm.toLowerCase().includes(search.toLowerCase()) ||
      e.expertise.toLowerCase().includes(search.toLowerCase()) ||
      e.market.toLowerCase().includes(search.toLowerCase())
    )

  const handleConnect = (e, id) => {
    e.stopPropagation()
    if (connectedIds.includes(id)) return
    setRequestedIds(prev => prev.includes(id) ? prev : [...prev, id])
    setTimeout(() => {
      setRequestedIds(prev => prev.filter(i => i !== id))
      setConnectedIds(prev => [...prev, id])
    }, 1500)
  }

  const handleDisconnect = (e, id) => {
  e.stopPropagation()
  setConnectedIds(prev => prev.filter(i => i !== id))
  }

  
  const navItems = [['dashboard', 'Overview'], ['market', 'Market Search'], ['experts', 'Expert Network']]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav style={{ background: 'var(--midnight)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--terracotta)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,14 2,14" fill="white" opacity="0.9" /></svg>
          </div>
          <span style={{ color: 'var(--white)', fontWeight: '600', fontSize: '18px' }}>IntelAfrica<span style={{ color: 'var(--terracotta-light)' }}>IQ</span></span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map(([screen, label]) => (
            <button key={screen} onClick={() => navigate(screen)} style={{
              padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500',
              background: screen === 'experts' ? 'rgba(193,68,14,0.25)' : 'transparent',
              color: screen === 'experts' ? 'var(--terracotta-light)' : 'rgba(255,255,255,0.6)',
              border: screen === 'experts' ? '1px solid rgba(193,68,14,0.4)' : '1px solid transparent',
              transition: 'all 0.2s', cursor: 'pointer',
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '600' }}>
            {user?.name?.[0] ?? 'U'}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{user?.name ?? 'User'}</span>
        </div>
      </nav>

      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Expert Network</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Connect with vetted industry leaders across African markets</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
          {statCards.map(({ label, value, sub }) => (
            <div key={label} style={{ background: 'var(--white)', borderRadius: '12px', padding: '1.25rem', border: '1px solid #E8E0D5' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--forest-light)' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>

          {/* Left: filters + cards */}
          <div>
            {/* Search & filters */}
            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, firm, expertise or market..."
                  style={{ flex: 1, minWidth: '200px', padding: '9px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => setFeaturedOnly(f => !f)}
                  style={{
                    padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
                    background: featuredOnly ? '#FDF3DC' : 'var(--surface)',
                    color: featuredOnly ? '#D4A017' : 'var(--text-secondary)',
                    border: `1.5px solid ${featuredOnly ? '#D4A017' : '#E2E8F0'}`,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  ★ Featured only
                </button>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Market</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {markets.map(m => (
                    <button key={m} onClick={() => setActiveMarket(m)} style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500',
                      background: activeMarket === m ? 'var(--midnight)' : 'var(--surface)',
                      color: activeMarket === m ? 'white' : 'var(--text-secondary)',
                      border: `1.5px solid ${activeMarket === m ? 'var(--midnight)' : '#E2E8F0'}`,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>{m}</button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expertise</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {expertises.map(ex => (
                    <button key={ex} onClick={() => setActiveExpertise(ex)} style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500',
                      background: activeExpertise === ex ? 'var(--terracotta)' : 'var(--surface)',
                      color: activeExpertise === ex ? 'white' : 'var(--text-secondary)',
                      border: `1.5px solid ${activeExpertise === ex ? 'var(--terracotta)' : '#E2E8F0'}`,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>{ex}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                {filtered.length} expert{filtered.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Expert cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map(expert => {
                const isSelected = selected?.id === expert.id
                const isConnected = connectedIds.includes(expert.id)
                const isRequested = requestedIds.includes(expert.id)

                return (
                  <div
                    key={expert.id}
                    onClick={() => setSelected(isSelected ? null : expert)}
                    style={{
                      background: 'var(--white)', borderRadius: '12px',
                      border: isSelected ? '2px solid var(--terracotta)' : '1px solid #E8E0D5',
                      padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>

                      {/* Avatar */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '50%',
                          background: expert.avatarColor,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: '16px', fontWeight: '700',
                        }}>
                          {expert.avatar}
                        </div>
                        {expert.verified && (
                          <div style={{
                            position: 'absolute', bottom: 0, right: 0,
                            width: '16px', height: '16px', borderRadius: '50%',
                            background: '#2D6A4F', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '8px', color: 'white',
                          }}>✓</div>
                        )}
                      </div>

                      {/* Main info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{expert.name}</span>
                              {expert.featured && (
                                <span style={{ fontSize: '10px', fontWeight: '600', background: '#FDF3DC', color: '#D4A017', padding: '2px 8px', borderRadius: '10px', border: '1px solid #D4A01740' }}>★ Featured</span>
                              )}
                              {expert.verified && (
                                <span style={{ fontSize: '10px', fontWeight: '600', background: '#EAF3DE', color: '#2D6A4F', padding: '2px 8px', borderRadius: '10px' }}>Vetted</span>
                              )}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '1px' }}>{expert.title} · {expert.firm}</div>
                          </div>

                          <button
                            onClick={e => handleConnect(e, expert.id)}
                            style={{
                              padding: '7px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                              background: isConnected ? '#EAF3DE' : isRequested ? 'rgba(193,68,14,0.08)' : 'var(--terracotta)',
                              color: isConnected ? '#2D6A4F' : isRequested ? 'var(--terracotta)' : 'white',
                              border: isConnected ? '1px solid #2D6A4F40' : isRequested ? '1px solid var(--terracotta)' : 'none',
                              cursor: isConnected ? 'default' : 'pointer',
                              transition: 'all 0.2s', flexShrink: 0,
                            }}
                          >
                            {isConnected ? '✓ Connected' : isRequested ? 'Sending...' : 'Connect'}
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: '#E6F1FB', color: '#1B4F8A', fontWeight: '600' }}>{expert.market}</span>
                          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: 'var(--surface)', color: 'var(--text-secondary)' }}>{expert.expertise}</span>
                          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: 'var(--surface)', color: 'var(--text-secondary)' }}>{expert.years} yrs exp</span>
                          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: 'var(--surface)', color: 'var(--text-secondary)' }}>↩ {expert.responseRate} response</span>
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.6' }}>{expert.bio}</p>

                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                      {expert.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: `${expert.avatarColor}12`, color: expert.avatarColor, fontWeight: '500' }}>{tag}</span>
                      ))}
                    </div>

                    {/* Expanded detail */}
                    {isSelected && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0EBE3' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
                          {[
                            ['Dealflow', expert.dealflow],
                            ['Network', `${expert.connections} contacts`],
                            ['Response Time', expert.responseTime],
                          ].map(([label, val]) => (
                            <div key={label} style={{ background: 'var(--surface)', borderRadius: '8px', padding: '10px' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{val}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={e => handleConnect(e, expert.id)}
                            style={{
                              flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                              background: isConnected ? '#EAF3DE' : 'var(--terracotta)',
                              color: isConnected ? '#2D6A4F' : 'white',
                              border: isConnected ? '1px solid #2D6A4F40' : 'none',
                              cursor: isConnected ? 'default' : 'pointer',
                            }}
                          >
                            {isConnected ? '✓ Connected' : 'Request Introduction →'}
                          </button>
                          <button
                            onClick={e => e.stopPropagation()}
                            style={{ padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', background: 'var(--midnight)', color: 'white', cursor: 'pointer', border: 'none' }}
                          >
                            View Full Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '3rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '1rem', opacity: 0.3 }}>◎</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No experts match your filters. Try adjusting your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* My connections */}
            <div style={{ background: 'var(--midnight)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem' }}>My Connections</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>Experts you've connected with</p>
              {connectedIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ fontSize: '28px', opacity: 0.3, marginBottom: '8px' }}>◎</div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Connect with experts to build your network</p>
                </div>
              ) : (
            connectedIds.map(id => {
            const expert = experts.find(ex => ex.id === id)  // ← rename e to expert
            return (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: expert.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>
                    {expert.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'white' }}>{expert.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{expert.market} · {expert.expertise}</div>
                </div>
                <button
                    onClick={e => handleDisconnect(e, id)}  // ← now e correctly = the click event
                    title="Remove connection"
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '6px', color: 'rgba(255,255,255,0.4)', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                    ✕
                </button>
                </div>
            )
            })
              )}
            </div>

            {/* Expertise breakdown */}
            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>Experts by Sector</h3>
              {[
                { label: 'Fintech', count: 2, color: '#1B4F8A' },
                { label: 'Energy', count: 2, color: '#D4A017' },
                { label: 'Agtech', count: 2, color: '#2D6A4F' },
                { label: 'Infrastructure', count: 1, color: '#C1440E' },
                { label: 'Healthcare', count: 1, color: '#7C3AED' },
              ].map(({ label, count, color }) => (
                <div key={label} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color }}>{count} experts</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--surface)' }}>
                    <div style={{ height: '100%', borderRadius: '4px', background: color, width: `${(count / 8) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Featured this week */}
            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>Featured This Week</h3>
              {experts.filter(e => e.featured).map(e => (
                <div
                  key={e.id}
                  onClick={() => setSelected(selected?.id === e.id ? null : e)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #F0EBE3', cursor: 'pointer' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: e.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                    {e.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{e.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{e.market} · {e.expertise}</div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#D4A017' }}>★</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--terracotta)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>Are you an expert?</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', lineHeight: '1.5' }}>Join our vetted network and connect with institutional investors across the continent.</p>
              <button style={{ width: '100%', padding: '9px', background: 'white', color: 'var(--terracotta)', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none' }}>
                Apply to Join →
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}