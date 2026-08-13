// Starts the Next standalone server on 3000 (what foundation.pencloud.uk routes
// to) and mirrors it on 80, which is the port recorded on the Shipyard service
// and therefore what its deploy health check probes. Delete the mirror once the
// service's port field is set to 3000.
import { spawn } from 'node:child_process'
import http from 'node:http'

const APP_PORT = 3000
const MIRROR_PORT = 80

const child = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: String(APP_PORT), HOSTNAME: '0.0.0.0' },
})
child.on('exit', (code) => process.exit(code ?? 0))

http
  .createServer((req, res) => {
    const proxy = http.request(
      {
        host: '127.0.0.1',
        port: APP_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (upstream) => {
        res.writeHead(upstream.statusCode ?? 502, upstream.headers)
        upstream.pipe(res)
      },
    )
    proxy.on('error', () => {
      res.writeHead(502, { 'content-type': 'text/plain' })
      res.end('upstream not ready')
    })
    req.pipe(proxy)
  })
  .listen(MIRROR_PORT, '0.0.0.0')
