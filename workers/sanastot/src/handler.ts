const headers = new Headers()
headers.set("Access-Control-Allow-Origin", "*");


export async function handleRequest(request: Request): Promise<Response> {
  return new Response(`request method: otei ${request.method}`, {
    headers
  })
}
