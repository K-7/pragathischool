import { describe, it, expect } from 'vitest'
import { CATEGORIES, gallery } from './images.js'
import { BANDS } from './academics.js'
import { FACILITIES } from './facilities.js'
import { seo, schoolJsonLd } from './seo.js'
import { NAV, isPhoneConfigured } from './site.js'

describe('gallery data', () => {
  it('uses the agreed category list', () => {
    expect(CATEGORIES).toEqual(['All', 'Campus', 'Events', 'Sports', 'Annual Day', 'Classroom'])
  })

  it('has complete, unique items', () => {
    const ids = gallery.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const item of gallery) {
      expect(item.alt.trim()).not.toBe('')
      expect(CATEGORIES.filter((c) => c !== 'All')).toContain(item.category)
      expect(['tall', 'square', 'wide']).toContain(item.aspect)
    }
  })

  it('covers every category with at least two photos', () => {
    for (const c of CATEGORIES.filter((c) => c !== 'All')) {
      expect(gallery.filter((i) => i.category === c).length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('academics and facilities', () => {
  it('defines the four class bands in order', () => {
    expect(BANDS.map((b) => b.id)).toEqual(['pre-primary', 'primary', 'middle', 'high'])
  })

  it('lists at least eight facilities', () => {
    expect(FACILITIES.length).toBeGreaterThanOrEqual(8)
  })
})

describe('seo and site', () => {
  it('has meta for all seven routes within length limits', () => {
    for (const p of ['/', '/about', '/academics', '/campus', '/gallery', '/contact', '/404']) {
      expect(seo[p], p).toBeTruthy()
      expect(seo[p].description.length).toBeLessThanOrEqual(160)
    }
  })

  it('omits telephone from JSON-LD while the phone is a placeholder', () => {
    expect(isPhoneConfigured()).toBe(false)
    expect(schoolJsonLd().telephone).toBeUndefined()
    expect(schoolJsonLd()['@type']).toBe('EducationalOrganization')
  })

  it('has six nav items', () => {
    expect(NAV).toHaveLength(6)
  })
})
