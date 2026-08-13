'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Reveal } from './Reveal'

const STORIES = [
  {
    quote:
      'She used to hide at the back of the class. Now she reads to the little ones on a Friday, and she chooses the book.',
    name: 'Amara O.',
    role: 'Parent, Riverside Reading Room',
    image: '/img/person-1.webp',
  },
  {
    quote:
      'The bundles changed what our library corner is for. Children come in at break now — not because we ask them to.',
    name: 'Daniel M.',
    role: 'Head teacher, partner school',
    image: '/img/person-2.webp',
  },
  {
    quote:
      'I signed up for one Saturday. Two years later I run the garden rota. It is the best hour of my week, every week.',
    name: 'Priya R.',
    role: 'Volunteer, Learning Gardens',
    image: '/img/person-3.webp',
  },
]

export function Stories() {
  const [index, setIndex] = useState(0)

  const go = useCallback((next: number) => {
    setIndex((next + STORIES.length) % STORIES.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % STORIES.length), 7500)
    return () => clearInterval(id)
  }, [index])

  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-leaf-600">In their words</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.07] font-semibold tracking-[-0.025em]">
              The people the numbers are actually about.
            </h2>
          </Reveal>

          <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous story"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 transition-colors hover:border-navy-900/50 hover:bg-white"
        >
          <Arrow className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next story"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/15 transition-colors hover:border-navy-900/50 hover:bg-white"
        >
          <Arrow className="h-4 w-4" />
        </button>
        <div className="ml-4 flex gap-2">
          {STORIES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Story ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-leaf-500' : 'w-3 bg-navy-900/15 hover:bg-navy-900/30'
              }`}
            />
          ))}
        </div>
      </div>

        </div>

        <div className="lg:col-span-8">
          <div className="story-panel relative mt-14 min-h-[22rem] overflow-hidden rounded-[1.8rem] border border-navy-900/10 bg-white p-8 sm:min-h-[20rem] sm:p-12 lg:mt-0">
        <Quote className="absolute top-8 right-8 h-16 w-16 text-leaf-100" />
        {STORIES.map((story, i) => (
          <figure
            key={story.name}
            aria-hidden={i !== index}
            className={`story-slide relative flex flex-col justify-between gap-10 ${
              i === index ? 'is-active' : ''
            }`}
          >
            <blockquote className="max-w-[52rem] font-display text-[clamp(1.4rem,2.6vw,2.05rem)] leading-[1.3] font-medium tracking-[-0.015em] text-navy-900 sm:pr-16">
              “{story.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <Image
                src={story.image}
                alt=""
                width={56}
                height={56}
                sizes="56px"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-semibold">{story.name}</p>
                <p className="text-sm text-navy-900/55">{story.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Quote({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 10c-6.6 3.4-11 9.6-11 17.4C7 34.4 11.3 39 17 39c4.7 0 8.3-3.4 8.3-8 0-4.4-3.2-7.6-7.4-7.6-.8 0-1.8.2-2.2.3.9-4.2 4.9-8.4 9-10.5L18 10Zm22 0c-6.6 3.4-11 9.6-11 17.4C29 34.4 33.3 39 39 39c4.7 0 8.3-3.4 8.3-8 0-4.4-3.2-7.6-7.4-7.6-.8 0-1.8.2-2.2.3.9-4.2 4.9-8.4 9-10.5L40 10Z" />
    </svg>
  )
}
