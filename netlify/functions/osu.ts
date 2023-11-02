import { Handler } from '@netlify/functions'
import { API, APIError, User } from 'osu-api-v2-js'
import { OsuInfo } from '../../src/components/infos/Osu'

const handler: Handler = async (event, context) => {
  let api = await API.createAsync({id: 11451, secret: process.env.API_OSU!})
  if (!api) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let profile = await Promise.all([
    new Promise((resolve, reject) => resolve(api!.getUser({id: 7276846}, 0))),
    new Promise((resolve, reject) => resolve(api!.getUser({id: 7276846}, 1))),
    new Promise((resolve, reject) => resolve(api!.getUser({id: 7276846}, 2))),
    new Promise((resolve, reject) => resolve(api!.getUser({id: 7276846}, 3)))
  ])
  
  if (profile.find((mode) => mode instanceof APIError)) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  let info: OsuInfo = {
    country: (profile[0] as User).country?.name!,
    osu: {global: 0, country: 0},
    taiko: {global: 0, country: 0},
    fruits: {global: 0, country: 0},
    mania: {global: 0, country: 0}
  }

  for (let i = 0; i < profile.length; i++) {
    let umode = profile[i] as User
    if (umode.statistics && umode.rank_history) {
      // At the time of writing this, osu-api-v2-js ain't exactly the greatest package ever written
      let stats = umode.statistics as any
      info[umode.rank_history.mode].global = stats.global_rank
      info[umode.rank_history.mode].country = stats.country_rank
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}

export { handler }
