import { Handler } from '@netlify/functions'
import fetch from "node-fetch"

const handler: Handler = async (event, context) => {
  let anilist = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query: `
        query ($userName: String) {
          MediaList (userName: $userName, type: ANIME, sort: UPDATED_TIME_DESC) {
            media {
              title {
                romaji
              }
              episodes
              coverImage {
                medium
              }
            }
            progress
            score (format: POINT_10)
            startedAt {
              day
              month
              year
            }
            updatedAt
            completedAt {
              day
              month
              year
            }
          }
        }
      `,
      variables: {
        userName: "Taevas"
      }
    })
  })

  if (anilist.status !== 200) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let p_json = await anilist.json() as {[key: string]: any}
  let json = p_json.data.MediaList
  let anime = {
    title: json.media.title.romaji,
    episodes: {
      watched: json.progress,
      total: json.media.episodes,
    },
    score: json.score,
    startDate: new Date(`${json.startedAt.year}-${json.startedAt.month}-${json.startedAt.day}`).toISOString(),
    updateDate: new Date(json.updatedAt * 1000).toISOString(),
    endDate: new Date(`${json.completedAt.year}-${json.completedAt.month}-${json.completedAt.day}`).toISOString(),
    cover: json.media.coverImage.medium
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(anime)
  }
}

export { handler }
