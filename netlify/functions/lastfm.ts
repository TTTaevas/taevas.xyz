import { Handler } from '@netlify/functions'
import { api } from "./shared/api"

const handler: Handler = async (event, context) => {
  let lastfm = await api<{
    recenttracks: {
      track: {
        artist: {
          "#text": string
        },
        image: {
          size: string,
          "#text": string
        }[]
        album: {
          "#text": string
        },
        name: string,
        "@attr"?: {
          nowplaying?: string
        }
      }[]
    }
  }>
  (`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=TTTaevas&api_key=${process.env["API_LASTFM"]}&format=json&limit=1`)
  return {
    statusCode: 200,
    body: JSON.stringify(lastfm.recenttracks.track[0])
  }
}

export { handler }
