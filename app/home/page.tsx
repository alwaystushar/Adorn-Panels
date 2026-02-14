import React from 'react'
import Hero from './comp/hero'
import InnovationSection from './comp/InnovationSection'
import ProductsSection from '../components/UI/Products'
import WhyChooseSection from './comp/WhyChooseSection'
import GallerySection from './comp/GalleryCard'
import ProjectsSection from './comp/ProjectsSection'
import Help from '../components/UI/Help'
import FAQ from '../components/UI/FAQ'
import Cta from '../components/UI/Cta'

const Homepage = () => {
  return (
    <>
    <Hero />
    <InnovationSection />  
    <ProductsSection />   
    <WhyChooseSection />
    <GallerySection />
    <ProjectsSection/>
    <Help />
    <FAQ />
    <Cta />
    </>

  )
}

export default Homepage
