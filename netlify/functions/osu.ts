import { Handler } from '@netlify/functions'
import { API, APIError, User } from 'osu-api-v2-js'
import { OsuInfo } from '../../src/components/Osu'

const handler: Handler = async (event, context) => {
  let api = await API.createAsync({id: 11451, secret: process.env.API_OSU!})
  if (!api) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let profile = await Promise.all([
    new Promise((resolve, reject) => resolve((api!.getUser({id: 7276846}, 0)))),
    new Promise((resolve, reject) => resolve((api!.getUser({id: 7276846}, 1)))),
    new Promise((resolve, reject) => resolve((api!.getUser({id: 7276846}, 2)))),
    new Promise((resolve, reject) => resolve((api!.getUser({id: 7276846}, 3))))
  ])
  
  if (profile.find((mode) => mode instanceof APIError)) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let ranks: OsuInfo = {
    osu: [0,0],
    taiko: [0,0],
    fruits: [0,0],
    mania: [0,0]
  }

  for (let i = 0; i < profile.length; i++) {
    let mode = profile[i] as User
    if (mode.rank_history) {
      ranks[mode.rank_history.mode] = mode.rank_history.data
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(ranks)
  }
}

export { handler }
