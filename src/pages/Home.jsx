import Seo from '../components/ui/Seo.jsx'
import { schoolJsonLd } from '../data/seo.js'
import Hero from '../components/home/Hero.jsx'
import Welcome from '../components/home/Welcome.jsx'
import ClassBands from '../components/home/ClassBands.jsx'
import WhyUs from '../components/home/WhyUs.jsx'
import GalleryTeaser from '../components/home/GalleryTeaser.jsx'
import CtaBand from '../components/home/CtaBand.jsx'
import RidgeDivider from '../components/ui/RidgeDivider.jsx'

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={schoolJsonLd()} />
      <Hero />
      <RidgeDivider />
      <Welcome />
      <ClassBands />
      <WhyUs />
      <GalleryTeaser />
      <CtaBand />
    </>
  )
}
