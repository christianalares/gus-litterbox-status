import { httpRouter } from 'convex/server'
import { postVisit } from './litterboxVisits'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
  path: '/postVisit',
  method: 'POST',
  handler: postVisit,
})

http.route({
  path: '/postVisit',
  method: 'OPTIONS',
  handler: httpAction(async (_, request) => {
    const headers = request.headers
    if (
      headers.get('Origin') !== null &&
      headers.get('Access-Control-Request-Method') !== null &&
      headers.get('Access-Control-Request-Headers') !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          'Access-Control-Allow-Origin': 'https://my.homey.app',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        }),
      })
    } else {
      return new Response()
    }
  }),
})

export default http
