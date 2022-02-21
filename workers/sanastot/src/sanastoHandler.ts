import { Request, RouteHandler } from 'itty-router';
import ruotsi from './ruotsi.json'

const sanastoHandler: RouteHandler<Request> = async (req) => {
  const {params} = req

  if (!params || !params.id) {
    throw new Error("Paramit puuttuu (id)")
  }

  if (params.id === "custom_ruotsi") {
    return new Response(JSON.stringify(ruotsi), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  }

  const res = await fetch(`https://sanastot.sanomapro.fi/api/v1/material/${params.id}`, {
    cf: {
      cacheTtl: 36100,
      cacheEverything: true
    }
  })
  const data = await res.json<any>()

  if (!data) {
    throw new Error("Errori tuli " + params.id)
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
};

export {sanastoHandler}
