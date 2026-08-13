// Bakes the rendered page into dist/index.html so the browser paints real
// content from the HTML instead of waiting on the JS bundle. Run after both
// the client and SSR builds; see the "build" script in package.json.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const htmlPath = resolve(root, 'dist/index.html')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const markup = render()

const html = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('prerender: could not find the root div in dist/index.html')
}

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${markup}</div>`))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

const kb = (Buffer.byteLength(markup) / 1024).toFixed(1)
console.log(`prerendered ${kb} kB of markup into dist/index.html`)
