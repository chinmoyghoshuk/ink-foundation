import { AnchorScroll } from '@/components/AnchorScroll'
import { Donate } from '@/components/Donate'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Initiatives } from '@/components/Initiatives'
import { Involved } from '@/components/Involved'
import { Journey } from '@/components/Journey'
import { LogoMark } from '@/components/BrandLogo'
import { Nav } from '@/components/Nav'
import { Programmes } from '@/components/Programmes'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Stats } from '@/components/Stats'
import { Stories } from '@/components/Stories'
import { Story } from '@/components/Story'

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <AnchorScroll />
      <ScrollProgress />
      <Nav logo={<LogoMark className="h-full" />} />
      <main>
        <Hero />
        <Story />
        <Stats />
        <Programmes />
        <Initiatives />
        <Journey />
        <Stories />
        <Donate />
        <Involved />
      </main>
      <Footer />
    </>
  )
}
