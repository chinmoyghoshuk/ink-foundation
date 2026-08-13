'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email.trim()) setSent(true)
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-4 text-white placeholder:text-white/35 focus:border-leaf-400 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-leaf-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-leaf-400"
      >
        {sent ? 'Thank you' : 'Sign up'}
      </button>
    </form>
  )
}
