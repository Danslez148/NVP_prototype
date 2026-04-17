import { useState } from 'react'

const countries = [
  { name: 'Nigeria', gdp: 92, inflation: 22, urban: 54, fdi: 88, region: 'West' },
  { name: 'South Africa', gdp: 78, inflation: 6, urban: 68, fdi: 82, region: 'South' },
  { name: 'Kenya', gdp: 71, inflation: 8, urban: 29, fdi: 74, region: 'East' },
  { name: 'Ethiopia', gdp: 68, inflation: 28, urban: 22, fdi: 61, region: 'East' },
  { name: 'Ghana', gdp: 65, inflation: 18, urban: 58, fdi: 69, region: 'West' },
  { name: 'Egypt', gdp: 88, inflation: 32, urban: 43, fdi: 85, region: 'North' },
  { name: 'Morocco', gdp: 74, inflation: 7, urban: 64, fdi: 78, region: 'North' },
  { name: 'Tanzania', gdp: 62, inflation: 10, urban: 37, fdi: 58, region: 'East' },
  { name: 'Rwanda', gdp: 69, inflation: 9, urban: 18, fdi: 72, region: 'East' },
  { name: 'Senegal', gdp: 63, inflation: 11, urban: 49, fdi: 64, region: 'West' },
  { name: 'Côte d\'Ivoire', gdp: 70, inflation: 5, urban: 52, fdi: 67, region: 'West' },
  { name: 'Angola', gdp: 58, inflation: 25, urban: 68, fdi: 55, region: 'South' },
]

const metrics = [
  { key: 'gdp', label: 'GDP Growth', unit: '%', color: '#2D6A4F', desc: 'Relative GDP growth score' },
  { key: 'inflation', label: 'Inflation', unit: '%', color: '#C1440E', desc: 'Annual inflation rate' },
  { key: 'urban', label: 'Urban Density', unit: '%', color: '#D4A017', desc: 'Urban population percentage' },
  { key: 'fdi', label: 'FDI Attractiveness', unit: '', color: '#1B4F8A', desc: 'Foreign direct investment score' },
]

const getColor = (value, key) => {
  const intensity = value / 100
  if (key === 'gdp') return `rgba(45,106,79,${0.2 + intensity * 0.8})`
  if (key === 'inflation') return `rgba(193,68,14,${0.2 + intensity * 0.8})`
  if (key === 'urban') return `rgba(212,160,23,${0.2 + intensity * 0.8})`
  if (key === 'fdi') return `rgba(27,79,138,${0.2 + intensity * 0.8})`
  return '#ccc'
}

const trendData = {
  Nigeria: [4.1, 3.6, 2.7, 3.4, 3.8, 4.2],
  'South Africa': [1.2, 0.8, 1.5, 1.9, 1.4, 1.7],
  Kenya: [5.2, 4.9, 4.1, 5.5, 5.8, 6.1],
  Ethiopia: [8.5, 7.7, 6.2, 6.8, 7.1, 7.4],
  Ghana: [3.8, 3.2, 2.9, 3.5, 4.1, 4.4],
  Egypt: [5.5, 4.2, 3.8, 4.5, 5.1, 5.6],
  Morocco: [3.2, 2.8, 3.5, 3.9, 4.2, 4.5],
  Tanzania: [6.8, 6.2, 5.9, 6.4, 6.7, 7.0],
  Rwanda: [7.2, 6.8, 5.5, 6.9, 7.5, 8.0],
  Senegal: [5.1, 4.8, 4.2, 5.3, 5.7, 6.0],
  "Côte d'Ivoire": [6.5, 6.0, 5.2, 6.3, 6.8, 7.1],
  Angola: [2.1, 1.5, 0.8, 1.9, 2.4, 2.8],
}

const years = ['2019', '2020', '2021', '2022', '2023', '2024']

function MiniSparkline({ data, color }) {
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const w = 80, h = 32
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export default function Dashboard({ user, navigate }) {
  const [activeMetric, setActiveMetric] = useState('gdp')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filterRegion, setFilterRegion] = useState('All')

  const metric = metrics.find(m => m.key === activeMetric)
  const regions = ['All', 'West', 'East', 'North', 'South']
  const filtered = filterRegion === 'All' ? countries : countries.filter(c => c.region === filterRegion)
  const sorted = [...filtered].sort((a, b) => b[activeMetric] - a[activeMetric])

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
          {[['dashboard', 'Overview'], ['market', 'Market Search']].map(([screen, label]) => (
            <button key={screen} onClick={() => navigate(screen)} style={{ padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', background: screen === 'dashboard' ? 'rgba(193,68,14,0.25)' : 'transparent', color: screen === 'dashboard' ? 'var(--terracotta-light)' : 'rgba(255,255,255,0.6)', border: screen === 'dashboard' ? '1px solid rgba(193,68,14,0.4)' : '1px solid transparent', transition: 'all 0.2s' }}>
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Market Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Macro-economic intelligence across 54 African markets</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
          {[
            { label: 'Markets Tracked', value: '54', sub: 'across 5 regions' },
            { label: 'Avg GDP Growth', value: '5.2%', sub: '+0.4% vs last yr' },
            { label: 'Active Data Feeds', value: '1,247', sub: 'updated daily' },
            { label: 'Expert Contacts', value: '214', sub: 'vetted professionals' },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ background: 'var(--white)', borderRadius: '12px', padding: '1.25rem', border: '1px solid #E8E0D5' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>{value}</div>
              <div style={{ fontSize: '12px', color: 'var(--forest-light)' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>

          <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>Macro-Economic Heatmap</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{metric.desc} — click a country to inspect</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {metrics.map(m => (
                  <button key={m.key} onClick={() => setActiveMetric(m.key)} style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', background: activeMetric === m.key ? m.color : 'transparent', color: activeMetric === m.key ? 'white' : 'var(--text-secondary)', border: `1.5px solid ${activeMetric === m.key ? m.color : '#E2E8F0'}`, transition: 'all 0.2s', cursor: 'pointer' }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {regions.map(r => (
                <button key={r} onClick={() => setFilterRegion(r)} style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', background: filterRegion === r ? 'var(--midnight)' : 'var(--surface)', color: filterRegion === r ? 'white' : 'var(--text-secondary)', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                  {r}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
              {sorted.map(country => (
                <div key={country.name} onClick={() => setSelectedCountry(selectedCountry?.name === country.name ? null : country)} style={{ borderRadius: '10px', padding: '1rem', background: getColor(country[activeMetric], activeMetric), border: selectedCountry?.name === country.name ? `2px solid ${metric.color}` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--midnight)', marginBottom: '6px' }}>{country.name}</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--midnight)' }}>{country[activeMetric]}{activeMetric !== 'fdi' ? '%' : ''}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(13,27,42,0.6)', marginTop: '2px' }}>{metric.label}</div>
                  <div style={{ marginTop: '8px' }}>
                    <MiniSparkline data={trendData[country.name] ?? [5,5,5,5,5,5]} color={metric.color} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Low</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: `linear-gradient(to right, ${getColor(10, activeMetric)}, ${getColor(90, activeMetric)})` }} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>High</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {selectedCountry ? (
              <div style={{ background: 'var(--midnight)', borderRadius: '12px', padding: '1.5rem', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>{selectedCountry.name}</h3>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{selectedCountry.region} Africa</span>
                  </div>
                  <button onClick={() => setSelectedCountry(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>✕</button>
                </div>
                {metrics.map(m => (
                  <div key={m.key} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{m.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{selectedCountry[m.key]}{m.key !== 'fdi' ? '%' : ''}</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>
                      <div style={{ height: '100%', borderRadius: '3px', background: m.color, width: `${selectedCountry[m.key]}%`, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>GDP Growth Trend</div>
                  <MiniSparkline data={trendData[selectedCountry.name] ?? []} color="#F0C040" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    {years.map(y => <span key={y} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{y}</span>)}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--midnight)', borderRadius: '12px', padding: '1.5rem', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '0.75rem', opacity: 0.4 }}>◎</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Click any country card to inspect its full macro profile</p>
              </div>
            )}

            <div style={{ background: 'var(--white)', borderRadius: '12px', border: '1px solid #E8E0D5', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '1rem' }}>Top Opportunities</h3>
              {[
                { country: 'Rwanda', tag: 'High Growth', color: '#2D6A4F', bg: '#EAF3DE' },
                { country: 'Kenya', tag: 'Fintech Hub', color: '#1B4F8A', bg: '#E6F1FB' },
                { country: 'Morocco', tag: 'Stable Market', color: '#D4A017', bg: '#FDF3DC' },
              ].map(({ country, tag, color, bg }) => (
                <div key={country} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F0EBE3' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{country}</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', color, background: bg, padding: '3px 10px', borderRadius: '12px' }}>{tag}</span>
                </div>
              ))}
              <button onClick={() => navigate('market')} style={{ width: '100%', marginTop: '1rem', padding: '10px', background: 'var(--terracotta)', color: 'white', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>
                Explore Market Search →
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}