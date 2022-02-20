import { Request, RouteHandler } from 'itty-router';

const sanastotHandler: RouteHandler<Request> = async (req) => {
  const res = await fetch('https://sanastot.sanomapro.fi/api/v1/materials');
  const data = await res.json<any[]>();

  const returnData = [
    {
      "state": "published",
      "hidden": false,
      "version": "1.0",
      "primaryColor": "#cc6699",
      "language": "sv",
      "bundleId": "fokus",
      "bundleTitle": "Fokus",
      "materialTitle": "Fokus",
      "materialId": "custom_ruotsi",
      "productId": "JEFF-1",
      "updatedAt": "2022-02-22T08:15:54.421Z",
      "createdAt": "2022-02-22T14:41:42.562Z",
      "coverImage": "https://i.imgur.com/KYtr2H0.png",
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
      }
    },
    ...data
  ]
  return new Response(JSON.stringify(returnData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
};

export {sanastotHandler}
