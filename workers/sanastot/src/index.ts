import { Router } from 'itty-router';
import { sanastotHandler } from './sanastotHandler';
import { sanastoHandler } from './sanastoHandler';
import ruotsi from './ruotsi.json'

const errorHandler = (error: { message: any; status: any }) =>
  new Response(error.message || 'Server Error', { status: error.status || 500, headers: {
    'Access-Control-Allow-Origin': '*'
  }})

const router = Router()

router.get("/sanastot/:id", sanastoHandler)
router.get("/sanastot", sanastotHandler)
router.get("/ruotsi", (req) => {
  return new Response(JSON.stringify(ruotsi), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
})

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request).catch(errorHandler))
})
