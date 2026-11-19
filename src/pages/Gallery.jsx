import Seo from '../components/ui/Seo.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Section from '../components/ui/Section.jsx'
import GalleryGrid from '../components/gallery/GalleryGrid.jsx'
import CtaBand from '../components/home/CtaBand.jsx'

export default function Gallery() {
  return (
    <>
      <Seo path="/gallery" />

      <PageHero
        kicker="Gallery"
        title="Life at Pragathi School"
        lede="The campus, classrooms, sports days, events and Annual Day, in photographs."
      />

      <Section width="wide">
        <GalleryGrid />
      </Section>

      <CtaBand />
    </>
  )
}
