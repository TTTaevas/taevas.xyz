import { Handler } from '@netlify/functions'
import * as osu from 'osu-api-v2-js'
import { OsuInfo } from '../../src/components/infos/Osu'

const handler: Handler = async () => {
  const api = await osu.API.createAsync({id: 11451, secret: process.env.API_OSU!})

  const profile = await Promise.all([
    new Promise((resolve) => resolve(api.getUser({id: 7276846}, osu.Rulesets.osu))),
    new Promise((resolve) => resolve(api.getUser({id: 7276846}, osu.Rulesets.taiko))),
    new Promise((resolve) => resolve(api.getUser({id: 7276846}, osu.Rulesets.fruits))),
    new Promise((resolve) => resolve(api.getUser({id: 7276846}, osu.Rulesets.mania)))
  ]) as osu.UserExtended[]

  const info: OsuInfo = {
    country: (profile[0]).country.name || "Unknown",
    osu: {global: 0, country: 0},
    taiko: {global: 0, country: 0},
    fruits: {global: 0, country: 0},
    mania: {global: 0, country: 0}
  }

  for (let i = 0; i < profile.length; i++) {
    const ruleset = profile[i]
    if (ruleset.statistics && ruleset.rank_history) {
      const stats = ruleset.statistics
      info[ruleset.rank_history.mode].global = stats.global_rank
      info[ruleset.rank_history.mode].country = stats.country_rank
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}

export { handler }
