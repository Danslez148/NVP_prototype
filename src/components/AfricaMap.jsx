import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

const METRICS = [
  { key: 'gdp',       label: 'GDP Growth',   color1: '#c8e6c9', color2: '#1B5E20' },
  { key: 'inflation', label: 'Inflation',     color1: '#ffccbc', color2: '#BF360C' },
  { key: 'urban',     label: 'Urban Density', color1: '#fff9c4', color2: '#F57F17' },
  { key: 'fdi',       label: 'FDI Score',     color1: '#bbdefb', color2: '#0D47A1' },
]

const NAME_MAP = {
  "Ivory Coast":                 "Côte d'Ivoire",
  "Côte d'Ivoire":               "Côte d'Ivoire",
  "United Republic of Tanzania": "Tanzania",
  "Tanzania":                    "Tanzania",
}

const AFRICA_ISO = new Set([
  12,24,72,108,120,132,140,148,174,175,178,180,204,231,232,
  262,266,270,288,324,328,384,404,426,430,434,450,454,466,
  478,480,504,508,516,562,566,624,630,638,646,678,686,694,
  706,710,716,728,729,732,748,768,788,800,818,834,854,894
])

export default function AfricaMap({ countries, activeMetric, onCountryClick }) {
  const svgRef    = useRef(null)
  const zoomRef   = useRef(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleZoom = (direction) => {
    const svg  = d3.select(svgRef.current)
    const zoom = zoomRef.current
    if (!zoom) return
    const factor = direction === 'in' ? 1.4 : 1 / 1.4
    svg.transition().duration(300).call(zoom.scaleBy, factor)
  }

  const handleReset = () => {
    const svg  = d3.select(svgRef.current)
    const zoom = zoomRef.current
    if (!zoom) return
    svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity)
  }

  const metric         = METRICS.find(m => m.key === activeMetric) ?? METRICS[0]
  const { color1, color2 } = metric

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return

    setLoading(true)
    setError(null)

    const W = svgEl.clientWidth || 700
    const H = 400

    const getOurName = rawName => NAME_MAP[rawName] ?? rawName

    const getVal = rawName => {
      const name = getOurName(rawName)
      return countries.find(c => c.name === name)?.[activeMetric] ?? null
    }

    const getFill = rawName => {
      const val = getVal(rawName)
      if (val === null) return '#e0e0e0'
      return d3.interpolateRgb(color1, color2)(0.15 + (val / 100) * 0.85)
    }

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
        return r.json()
      })
      .then(world => {
        setLoading(false)
        const allFeatures    = topojson.feature(world, world.objects.countries)
        const africaFeatures = allFeatures.features.filter(f => AFRICA_ISO.has(+f.id))

        const nameById = {}
        world.objects.countries.geometries.forEach(g => {
          if (g.properties?.name) nameById[g.id] = g.properties.name
        })

        const svg = d3.select(svgEl)
        svg.selectAll('*').remove()
        svg.attr('viewBox', `0 0 ${W} ${H}`)

        const projection = d3.geoMercator()
        projection.fitExtent([[10, 10], [W - 10, H - 10]], {type: "FeatureCollection", features: africaFeatures})

        const path = d3.geoPath().projection(projection)

        const g = svg.append('g')

        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on('zoom', (event) => {
            g.attr('transform', event.transform)
            setZoomLevel(+event.transform.k.toFixed(2))
          })

        zoomRef.current = zoom
        svg.call(zoom)

        // Reset to initial view
        svg.call(zoom.transform, d3.zoomIdentity)

        g.selectAll('path')
          .data(africaFeatures)
          .join('path')
          .attr('d', path)
          .attr('fill', d => getFill(nameById[d.id] ?? ''))
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5)
          .style('cursor', 'pointer')
          .on('click', (event, d) => {
            event.stopPropagation()
            const name    = getOurName(nameById[d.id] ?? '')
            const country = countries.find(c => c.name === name)
            if (country) onCountryClick(country)
          })
          .on('mouseover', (event, d) => {
            const name = getOurName(nameById[d.id] ?? '')
            const country = countries.find(c => c.name === name)
            if (country) {
              setHoveredCountry(country)
              setTooltipPos({ x: event.pageX, y: event.pageY })
            }
          })
          .on('mousemove', (event) => {
            setTooltipPos({ x: event.pageX, y: event.pageY })
          })
          .on('mouseout', () => {
            setHoveredCountry(null)
          })
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
        console.error('Failed to load map data:', err)
        // Fallback: show error message
        const svg = d3.select(svgEl)
        svg.selectAll('*').remove()
        svg.append('text')
          .attr('x', W / 2)
          .attr('y', H / 2)
          .attr('text-anchor', 'middle')
          .attr('fill', 'red')
          .style('font-size', '16px')
          .text('Failed to load map data')
      })
  }, [activeMetric, countries, color1, color2, onCountryClick])

  return (
    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#EAF4FB' }}>
      {loading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.8)', zIndex: 10
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
            <div>Loading map...</div>
          </div>
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.9)', zIndex: 10
        }}>
          <div style={{ textAlign: 'center', color: 'red' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <div>Failed to load map</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{error}</div>
          </div>
        </div>
      )}
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '400px', display: 'block' }}
      />

      {/* Tooltip */}
      {hoveredCountry && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x + 10,
            top: tooltipPos.y - 10,
            background: 'var(--midnight)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '200px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{hoveredCountry.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)' }}>
            {METRICS.find(m => m.key === activeMetric)?.label}: {hoveredCountry[activeMetric]}{activeMetric !== 'fdi' ? '%' : ''}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '2px' }}>
            {hoveredCountry.region} Africa
          </div>
        </div>
      )}

      {/* Tooltip */}
      {hoveredCountry && (
        <div
          style={{
            position: 'fixed',
            left: Math.min(tooltipPos.x + 10, window.innerWidth - 220),
            top: Math.max(tooltipPos.y - 10, 10),
            background: 'var(--midnight)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '200px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{hoveredCountry.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)' }}>
            {METRICS.find(m => m.key === activeMetric)?.label}: {hoveredCountry[activeMetric]}{activeMetric !== 'fdi' ? '%' : ''}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '2px' }}>
            {hoveredCountry.region} Africa
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div style={{
        position: 'absolute', bottom: '12px', right: '12px',
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        <button
          onClick={() => handleZoom('in')}
          title="Zoom in"
          style={{
            width: '30px', height: '30px',
            background: 'white', border: '1px solid #D1D5DB',
            borderRadius: '6px', fontSize: '16px', lineHeight: 1,
            cursor: 'pointer', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          +
        </button>
        <button
          onClick={handleReset}
          title="Reset"
          style={{
            width: '30px', height: '30px',
            background: 'white', border: '1px solid #D1D5DB',
            borderRadius: '6px', fontSize: '16px', lineHeight: 1,
            cursor: 'pointer', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          ⊙
        </button>
        <button
          onClick={() => handleZoom('out')}
          title="Zoom out"
          style={{
            width: '30px', height: '30px',
            background: 'white', border: '1px solid #D1D5DB',
            borderRadius: '6px', fontSize: '16px', lineHeight: 1,
            cursor: 'pointer', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          −
        </button>
      </div>

      {/* Zoom level badge */}
      <div style={{
        position: 'absolute', bottom: '12px', left: '12px',
        background: 'rgba(255,255,255,0.85)', borderRadius: '6px',
        padding: '3px 8px', fontSize: '11px', color: '#6B7280',
        border: '1px solid #E5E7EB',
      }}>
        {Math.round(zoomLevel * 100)}%
      </div>
    </div>
  )
}