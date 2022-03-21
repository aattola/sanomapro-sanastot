import { Request, RouteHandler } from 'itty-router';
import ruotsi from './ruotsi.json'
import ontrack from './on_track.json'

const on_track = {
  "state": "published",
  "hidden": false,
  "version": "1.0",
  "primaryColor": "#cc6699",
  "language": "en",
  "bundleId": "custom_on_track",
  "bundleTitle": "On Track",
  "materialTitle": "On Track",
  "materialId": "custom_on_track",
  "productId": "JEFF-2",
  "updatedAt": "2022-02-22T08:15:54.421Z",
  "createdAt": "2022-02-22T14:41:42.562Z",
  "coverImage": "https://i.imgur.com/mIS3hlU.png",
  "coverImages": {
    "large": {
      "height": 1410,
      "width": 1092,
      "url": "https://i.imgur.com/KYtr2H0.png"
    },
    "medium": {
      "height": 705,
      "width": 546,
      "url": "https://i.imgur.com/KYtr2H0.png"
    },
    "small": {
      "height": 353,
      "width": 274,
      "url": "https://i.imgur.com/KYtr2H0.png"
    }
  },
  alphaEntries: ontrack
}

const sanastoHandler: RouteHandler<Request> = async (req) => {
  const {params} = req

  if (!params || !params.id) {
    throw new Error("Paramit puuttuu (id)")
  }

  if (params.id === "custom_on_track") {
    return new Response(JSON.stringify(on_track), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
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
      cacheTtl: 604800,
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
