import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Grid3X3, List, MapPin, X, Flame, TrendingUp } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'
import './Properties.css'

const propertyTypes = ['All', 'House', 'Apartment', 'Condo', 'Villa', 'Townhouse', 'Penthouse']
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $1M', min: 0, max: 1000000 },
  { label: '$1M - $3M', min: 1000000, max: 3000000 },
  { label: '$3M - $5M', min: 3000000, max: 5000000 },
  { label: '$5M+', min: 5000000, max: Infinity },
]
const bedOptions = ['Any', '1+', '2+', '3+', '4+', '5+']

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [selectedType, setSelectedType] = useState('All')
  const [priceRange, setPriceRange] = useState(0)
  const [beds, setBeds] = useState('Any')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = useMemo(() => {
    let result = [...properties]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (selectedType !== 'All') result = result.filter(p => p.type === selectedType)
    const range = priceRanges[priceRange]
    result = result.filter(p => p.price >= range.min && p.price <= range.max)
    if (beds !== 'Any') result = result.filter(p => p.beds >= parseInt(beds))

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'newest': result.sort((a, b) => b.yearBuilt - a.yearBuilt); break
      case 'demand': result.sort((a, b) => b.demandScore - a.demandScore); break
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [search, selectedType, priceRange, beds, sortBy])

  // Demand heatmap data
  const demandData = useMemo(() => {
    const cityDemand = {}
    properties.forEach(p => {
      const city = p.city
      if (!cityDemand[city]) cityDemand[city] = { count: 0, totalDemand: 0 }
      cityDemand[city].count++
      cityDemand[city].totalDemand += p.demandScore
    })
    return Object.entries(cityDemand)
      .map(([city, data]) => ({ city, avg: Math.round(data.totalDemand / data.count), count: data.count }))
      .sort((a, b) => b.avg - a.avg)
  }, [])

  return (
    <div className="page-enter properties-page">
      <section className="properties-hero">
        <div className="container">
          <h1>Find Your <span className="gradient-text">Perfect Property</span></h1>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Browse {properties.length} premium listings across the nation's most desirable markets.
          </p>
        </div>
      </section>

      <section className="container properties-content">
        {/* Search & Filters Bar */}
        <div className="properties-toolbar" id="properties-toolbar">
          <div className="search-filter-bar">
            <div className="properties-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="properties-search-input"
                id="properties-search-input"
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}><X size={14} /></button>
              )}
            </div>
            <button className="btn btn-secondary btn-small" onClick={() => setShowFilters(!showFilters)} id="toggle-filters-btn">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="view-toggles">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                <Grid3X3 size={16} />
              </button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <List size={16} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filters-panel animate-fade-in-down" id="filters-panel">
              <div className="filter-group">
                <label>Property Type</label>
                <div className="filter-chips">
                  {propertyTypes.map(type => (
                    <button
                      key={type}
                      className={`filter-chip ${selectedType === type ? 'active' : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Price Range</label>
                <div className="filter-chips">
                  {priceRanges.map((range, i) => (
                    <button
                      key={i}
                      className={`filter-chip ${priceRange === i ? 'active' : ''}`}
                      onClick={() => setPriceRange(i)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Bedrooms</label>
                <div className="filter-chips">
                  {bedOptions.map(opt => (
                    <button
                      key={opt}
                      className={`filter-chip ${beds === opt ? 'active' : ''}`}
                      onClick={() => setBeds(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Sort By</label>
                <select className="input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="demand">Highest Demand</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Demand Heatmap */}
        <div className="demand-heatmap glass-card" id="demand-heatmap">
          <div className="heatmap-header">
            <Flame size={16} className="gold-text" />
            <h4>Market Demand Heatmap</h4>
          </div>
          <div className="heatmap-bars">
            {demandData.map((d, i) => (
              <div key={d.city} className="heatmap-item">
                <div className="heatmap-label">
                  <MapPin size={12} />
                  <span>{d.city}</span>
                  <span className="heatmap-count">{d.count} listings</span>
                </div>
                <div className="heatmap-bar-track">
                  <div
                    className="heatmap-bar-fill"
                    style={{
                      width: `${d.avg}%`,
                      animationDelay: `${i * 0.1}s`,
                      background: d.avg > 90 ? 'var(--danger)' : d.avg > 80 ? 'var(--gold)' : 'var(--success)',
                    }}
                  />
                </div>
                <span className="heatmap-score">{d.avg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <span>{filtered.length} properties found</span>
        </div>

        {/* Properties Grid */}
        <div className={`properties-grid ${viewMode}`} id="properties-grid">
          {filtered.map((prop, i) => (
            <PropertyCard key={prop.id} property={prop} style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <h3>No properties match your criteria</h3>
            <p>Try adjusting your filters or search terms.</p>
            <button className="btn btn-primary" onClick={() => { setSearch(''); setSelectedType('All'); setPriceRange(0); setBeds('Any') }}>
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
