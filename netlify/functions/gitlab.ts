import { Handler } from '@netlify/functions'
import fetch from "node-fetch"

const handler: Handler = async (event, context) => {
  let gitlab = await fetch("https://gitlab.com/api/v4/events?action=pushed", {
    method: "GET",
    headers: {
      "PRIVATE-TOKEN": process.env.API_GITLAB!,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })

  if (gitlab.status !== 200) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let json = await gitlab.json() as {[key: string]: any}
  let date = json[0].created_at.substring(0, json[0].created_at.indexOf("T"))
  
  return {
    statusCode: 200,
    body: JSON.stringify({date})
  }
}

export { handler }
