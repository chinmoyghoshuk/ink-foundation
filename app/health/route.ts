export const dynamic = 'force-static'

/** Deploy health check target. */
export function GET() {
  return new Response('ok', { headers: { 'content-type': 'text/plain' } })
}
