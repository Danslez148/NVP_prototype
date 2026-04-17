import { useState } from 'react'

const sectors = ['All', 'Fintech', 'Energy', 'Agtech', 'Infrastructure', 'Healthcare']

const opportunities = [
  { id: 1, company: 'PayFlow Africa', country: 'Nigeria', sector: 'Fintech', stage: 'Series A', marketSize: '$2.4B', growth: '+34%', risk: 'Medium', score: 87, description: 'Mobile-first payment infrastructure serving unbanked populations across West Africa.', founded: 2019, employees: '120-200' },
  { id: 2, company: 'SolarGrid Kenya', country: 'Kenya', sector: 'Energy', stage: 'Series B', marketSize: '$1.8B', growth: '+28%', risk: 'Low', score: 91, description: 'Distributed solar energy network connecting rural communities to clean power grids.', founded: 2018, employees: '200-500' },
  { id: 3, company: 'HarvestIQ', country: 'Ghana', sector: 'Agtech', stage: 'Seed', marketSize: '$3.1B', growth: '+41%', risk: 'High', score: 74, description: 'AI-driven crop yield prediction and supply chain optimization for smallholder farmers.', founded: 2021, employees: '20-50' },
  { id: 4, company: 'MediLink Rwanda', country: 'Rwanda', sector: 'Healthcare', stage: 'Series A', marketSize: '$890M', growth: '+22%', risk: 'Low', score: 83, description: 'Telemedicine platform connecting rural patients to certified physicians via mobile.', founded: 2020, employees: '50-120' },
  { id: 5, company: 'BuildRight Egypt', country: 'Egypt', sector: 'Infrastructure', stage: 'Series B', marketSize: '$5.2B', growth: '+19%', risk: 'Medium', score: 79, description: 'Tech-enabled construction management platform for large-scale infrastructure projects.', founded: 2017, employees: '500+' },
  { id: 6, company: 'CropChain Ethiopia', country: 'Ethiopia', sector: 'Agtech', stage: 'Seed', marketSize: '$2.7B', growth: '+38%', risk: 'High', score: 71, description: 'Blockchain-based commodity trading platform for agricultural exports.', founded: 2022, employees: '10-20' },
  { id: 7, company: 'FinSure Morocco', country: 'Morocco', sector: 'Fintech', stage: 'Series A', marketSize: '$1.2B', growth: '+25%', risk: 'Low', score: 85, description: 'Embedded insurance products distributed through existing mobile banking networks.', founded: 2019, employees: '80-150' },
  { id: 8, company: 'PowerSA', country: 'South Africa', sector: 'Energy', stage: 'Series C', marketSize: '$4.1B', growth: '+16%', risk: 'Low', score: 88, description: 'Utility-scale battery storage solutions addressing load-shedding across Southern Africa.', founded: 2016, employees: '500+' },
]

const riskColors = { Low: { color: '#2D6A4F', bg: '#EAF3DE' }, Medium: { color: '#D4A017', bg: '#FDF3DC' }, High: { color: '#C1440E', bg: '#FAEEE9' } }
const stageColors = { 'Seed': '#7C3AED', 'Series A': '#1B4F8A', 'Series B': '#0F6E56', 'Series C': '#8B2E08' }

const barData = [
  { sector: 'Fintech', value: 34, color: '#1B4F8A' },
  { sector: 'Energy', value: 28, color: '#D4A017' },
  { sector: 'Agtech', value: 41, color: '#2D6A4F' },
  { sector: 'Infra', value: 19, color: '#C1440E' },
  { sector: 'Health', value: 22, color: '#7C3AED' },
]

export default function MarketSearch({ user, navigate }) {
  const [activeSector, setActiveSector] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('score')
  const [selected, setSelected] = useState(null)
  const [savedIds, setSavedIds] = useState([])

  const filtered = opportunities
    .filter(o => activeSector === 'All' || o.sector === activeSector)
    .filter(o => o.company.toLowerCase().includes(search.toLowerCase()) || o.country.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : a.company.localeCompare(b.company))

  const toggleSave = (id) => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const maxBar = Math.max(...barData.map(d => d.value))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: 'var(--midnight)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--terracotta)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,14 2,14" fill="white" opacity="0.9" /></svg>
          </div>
          <span style={{ color: 'var(--white)', fontWeight: '600', fontSize: '18px' }}>IntelAfrica<span style={{ color: 'var(--terracotta-light)' }}>IQ</span></span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[['dashboard', 'Overview'], ['market', 'Market Search'], ['experts', 'Expert Network']].map(([screen, label]) => (
            <button key={screen} onClick={() => navigate(screen)} style={{ padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', background: screen === 'market' ? 'rgba(193,68,14,0.25)' : 'transparent', color: screen === 'market' ? 'var(--terracotta-light)' : 'rgba(255,255,255,0.6)', border: screen === 'market' ? '1px solid rgba(193,68,14,0.4)' : '1px solid transparent', transition: 'all 0.2s' }}>
              {label}
            </button>
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

        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Market Search</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Discover and analyse investment opportunities across African sectors</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>

          <div>
            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by company or country..."
                  style={{ flex: 1, minWidth: '200px', padding: '9px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)' }}
                />
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '9px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)', outline: 'none', background: 'white' }}>
                  <option value="score">Sort: Opportunity Score</option>
                  <option value="name">Sort: A–Z</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {sectors.map(s => (
                  <button key={s} onClick={() => setActiveSector(s)} style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', background: activeSector === s ? 'var(--terracotta)' : 'var(--surface)', color: activeSector === s ? 'white' : 'var(--text-secondary)', border: `1.5px solid ${activeSector === s ? 'var(--terracotta)' : '#E2E8F0'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                    {s}
                  </button>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)', alignSelf: 'center' }}>{filtered.length} results</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map(opp => (
                <div key={opp.id} onClick={() => setSelected(selected?.id === opp.id ? null : opp)} style={{ background: 'var(--white)', borderRadius: '12px', border: selected?.id === opp.id ? '2px solid var(--terracotta)' : '1px solid #E8E0D5', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '700' }}>
                        {opp.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--text-primary)' }}>{opp.company}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{opp.country} · {opp.sector}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: opp.score >= 85 ? '#2D6A4F' : opp.score >= 75 ? '#D4A017' : 'var(--text-secondary)' }}>{opp.score}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>opp. score</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleSave(opp.id) }} style={{ width: '32px', height: '32px', borderRadius: '8px', background: savedIds.includes(opp.id) ? '#FDF3DC' : 'var(--surface)', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>
                        {savedIds.includes(opp.id) ? '★' : '☆'}
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: '1.5' }}>{opp.description}</p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '12px', background: `${stageColors[opp.stage]}18`, color: stageColors[opp.stage] }}>{opp.stage}</span>
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '12px', ...riskColors[opp.risk] }}>Risk: {opp.risk}</span>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: 'var(--surface)', color: 'var(--text-secondary)' }}>Market {opp.marketSize}</span>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '12px', background: '#EAF3DE', color: '#2D6A4F', fontWeight: '600' }}>{opp.growth} YoY</span>
                  </div>

                  {selected?.id === opp.id && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0EBE3', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      {[['Founded', opp.founded], ['Employees', opp.employees], ['Sector', opp.sector]].map(([label, val]) => (
                        <div key={label} style={{ background: 'var(--surface)', borderRadius: '8px', padding: '10px' }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{val}</div>
                        </div>
                      ))}
                      <button style={{ gridColumn: '1 / -1', padding: '10px', background: 'var(--midnight)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                        Request Due Diligence Report →
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filtered.length === 0 && (
                <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '3rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '1rem', opacity: 0.3 }}>◎</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No opportunities match your search. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>Sector Growth Rates</h3>
              {barData.map(({ sector, value, color }) => (
                <div key={sector} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{sector}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color }}>+{value}%</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--surface)' }}>
                    <div style={{ height: '100%', borderRadius: '4px', background: color, width: `${(value / maxBar) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--midnight)', borderRadius: '12px', padding: '1.25rem', color: 'white' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem' }}>AI Market Forecast</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>3-month predictive outlook</p>
              {[
                { region: 'East Africa', outlook: 'Bullish', change: '+12%', color: '#40916C' },
                { region: 'West Africa', outlook: 'Neutral', change: '+6%', color: '#D4A017' },
                { region: 'North Africa', outlook: 'Bullish', change: '+9%', color: '#40916C' },
                { region: 'Southern Africa', outlook: 'Cautious', change: '+2%', color: '#C1440E' },
              ].map(({ region, outlook, change, color }) => (
                <div key={region} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500' }}>{region}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{outlook}</div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color }}>{change}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>Saved Opportunities</h3>
              {savedIds.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>Star opportunities to save them here</p>
              ) : (
                savedIds.map(id => {
                  const o = opportunities.find(op => op.id === id)
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F0EBE3' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500' }}>{o.company}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.country}</div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#2D6A4F' }}>{o.score}</span>
                    </div>
                  )
                })
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}