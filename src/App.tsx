import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useSmoothScroll, useNativeAnchorScroll } from './lib/useSmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Story } from './components/Story'
import { Stats } from './components/Stats'
import { Programmes } from './components/Programmes'
import { Journey } from './components/Journey'
import { Stories } from './components/Stories'
import { Donate } from './components/Donate'
import { Involved } from './components/Involved'
import { Footer } from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-leaf-500"
    />
  )
}

export default function App() {
  useSmoothScroll()
  useNativeAnchorScroll()

  // Images settle after first paint — re-measure every pinned/scrubbed trigger.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const id = setTimeout(refresh, 1500)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(id)
    }
  }, [])

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Stats />
        <Programmes />
        <Journey />
        <Stories />
        <Donate />
        <Involved />
      </main>
      <Footer />
    </>
  )
}
