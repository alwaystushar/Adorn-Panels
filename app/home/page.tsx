import React from 'react'
import Hero from './comp/hero'
import InnovationSection from './comp/InnovationSection'
import ProductsSection from './comp/Products'
import WhyChooseSection from './comp/WhyChooseSection'
import GallerySection from './comp/GalleryCard'
import ProjectsSection from './comp/ProjectsSection'

const Homepage = () => {
  return (
    <>
    <Hero />
    <InnovationSection />  
    <ProductsSection />   
    <WhyChooseSection />
    <GallerySection />
    <ProjectsSection/>
    </>

  )
}

export default Homepage
