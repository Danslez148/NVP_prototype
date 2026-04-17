import { useState } from 'react'

export default function Landing({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setError('')
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: 'Daniel', email })
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{ background: 'var(--midnight)', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--terracotta)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,14 2,14" fill="white" opacity="0.9"/></svg>
          </div>
          <span style={{ color: 'var(--white)', fontWeight: '600', fontSize: '18px', letterSpacing: '0.5px' }}>IntelAfrica<span style={{ color: 'var(--terracotta-light)' }}>IQ</span></span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Product', 'Pricing', 'About'].map(item => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex' }}>

        <div style={{ flex: 1, background: 'var(--midnight)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(193,68,14,0.12)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,160,23,0.08)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(193,68,14,0.2)', border: '1px solid rgba(193,68,14,0.4)', borderRadius: '20px', padding: '4px 14px', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--terracotta-light)', fontSize: '12px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>Africa Market Intelligence</span>
            </div>
            <h1 style={{ color: 'var(--white)', fontSize: '48px', fontWeight: '700', lineHeight: '1.15', marginBottom: '1.5rem' }}>
              Invest in Africa<br />
              <span style={{ color: 'var(--terracotta-light)' }}>with Confidence</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: '1.7', maxWidth: '480px', marginBottom: '2.5rem' }}>
              Real-time market intelligence, predictive analytics, and expert networks across 54 African markets — built for institutional investors.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[['54', 'African Markets'], ['1,200+', 'Data Feeds'], ['200+', 'Expert Contacts']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ color: 'var(--gold-light)', fontSize: '28px', fontWeight: '700' }}>{num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '460px', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '2rem' }}>Sign in to your IntelAfrica account</p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@institution.com"
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)' }}
              />
            </div>

            {error && <div style={{ background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '8px', padding: '10px 14px', marginBottom: '1rem', color: '#C53030', fontSize: '13px' }}>{error}</div>}

            <button
              onClick={handleLogin}
              style={{ width: '100%', padding: '12px', background: loading ? 'var(--terracotta-dark)' : 'var(--terracotta)', color: 'white', borderRadius: '8px', fontSize: '15px', fontWeight: '600', transition: 'background 0.2s' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: 'var(--text-muted)' }}>
              Don't have an account? <span style={{ color: 'var(--terracotta)', fontWeight: '500', cursor: 'pointer' }}>Request access</span>
            </p>

            <div style={{ marginTop: '2rem', padding: '12px', background: 'var(--surface)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Demo: enter any email + password to continue
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}