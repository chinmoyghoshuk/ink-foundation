import { Reveal } from './Reveal'
import { LogoLockup } from './BrandLogo'

const COLUMNS = [
  {
    title: 'Foundation',
    links: ['Our story', 'Programmes', 'Impact reports', 'Trustees', 'Careers'],
  },
  {
    title: 'Support us',
    links: ['Donate', 'Monthly giving', 'Volunteer', 'Corporate partners', 'Leave a legacy'],
  },
  {
    title: 'Contact',
    links: ['hello@pengroupfoundation.org', '+44 (0)20 0000 0000', 'Mon–Fri, 9am–5pm'],
  },
]

const SOCIALS = [
  {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.84-.4.4-.64.8-.84 1.3-.16.4-.35 1-.4 2.1C2.6 9.9 2.6 10.3 2.6 12s0 2.1.06 3.3c.05 1.1.24 1.7.4 2.1.2.5.44.9.84 1.3.4.4.8.64 1.3.84.4.16 1 .35 2.1.4 1.2.06 1.6.06 4.7.06s3.5 0 4.7-.06c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.84.4-.4.64-.8.84-1.3.16-.4.35-1 .4-2.1.06-1.2.06-1.6.06-3.3s0-2.1-.06-3.3c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.84-1.3 3.5 3.5 0 0 0-1.3-.84c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.3-8.2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z',
  },
  {
    label: 'LinkedIn',
    path: 'M6.9 8.5H3.6V21h3.3V8.5ZM5.25 3A1.9 1.9 0 1 0 5.3 6.8 1.9 1.9 0 0 0 5.25 3ZM21 14.1c0-3.5-1.9-5.1-4.4-5.1-2 0-2.9 1.1-3.4 1.9V8.5H9.9V21h3.3v-6.9c0-.4 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.7V21H21v-6.9Z',
  },
  {
    label: 'X',
    path: 'M17.6 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.6 3Zm-1.1 16.1h1.7L7.6 4.8H5.8l10.7 14.3Z',
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-20 pb-10 text-white">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <LogoLockup className="logo-on-dark h-24 text-white" label="PEN Group Foundation" />
              <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-navy-100/55">
                Books, learning and green community space within reach of every child.
              </p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-navy-100/55">
                The charitable organisation of{' '}
                <a
                  href="https://www.pengroup.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-leaf-400 transition-colors hover:text-leaf-300"
                >
                  PEN Group Holdings
                </a>
                .
              </p>
              <div className="mt-8 flex gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href="#top"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-leaf-400 hover:text-leaf-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {COLUMNS.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <h4 className="eyebrow text-leaf-400">{column.title}</h4>
                <ul className="mt-6 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[15px] text-navy-100/60 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h4 className="eyebrow text-leaf-400">Registered office</h4>
              <p className="mt-6 text-[15px] leading-relaxed text-navy-100/60">
                12 Chapter Street
                <br />
                London
                <br />
                United Kingdom
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} PEN Group Foundation. Registered charity no. 000000.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/35">
            <a href="#top" className="transition-colors hover:text-white/70">
              Privacy
            </a>
            <a href="#top" className="transition-colors hover:text-white/70">
              Safeguarding
            </a>
            <a href="#top" className="transition-colors hover:text-white/70">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* oversized watermark word, clipped by the footer */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 -mb-[5vw] text-center font-display text-[20vw] leading-[0.78] font-semibold tracking-[-0.04em] text-white/[0.035] select-none"
      >
        pen
      </p>
    </footer>
  )
}
