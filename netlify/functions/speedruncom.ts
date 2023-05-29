import { Handler } from '@netlify/functions'
import { api } from "./shared/api"
import { SpeedruncomInfo } from '../../src/components/infos/Speedruncom'

const handler: Handler = async (event, context) => {
  // embedding would be stupid here, as that'd create lag due to irrelevant runs
  let speedruncom = await api<{
    data: {
      place: number,
      run: {
        weblink: string
        game: string
        level: string | null
        category: string | null
        date: string
      }
    }[]
  }>
  (`https://www.speedrun.com/api/v1/users/j03v45mj/personal-bests`)

  let details_to_request = [new Promise((resolve, reject) => {
    resolve(api<{
      data: {
        names: {
          international: string
        }
        assets: {
          "cover-tiny": {
            uri: string
          } 
        }
      }
    }>
    (`https://www.speedrun.com/api/v1/games/${speedruncom.data[0].run.game}`))
  })]

  if (speedruncom.data[0].run.level) {
    details_to_request.push(new Promise((resolve, reject) => {
      resolve(api<{
        data: {
          name: string
        }
      }>
      (`https://www.speedrun.com/api/v1/levels/${speedruncom.data[0].run.level}`))
    }))
  }

  if (speedruncom.data[0].run.category) {
    details_to_request.push(new Promise((resolve, reject) => {
      resolve(api<{
        data: {
          name: string
        }
      }>
      (`https://www.speedrun.com/api/v1/categories/${speedruncom.data[0].run.category}`))
    }))
  }

  let details = await Promise.all(details_to_request) as [{[key: string]: any}]

  let run: SpeedruncomInfo = {
    place: speedruncom.data[0].place,
    link: speedruncom.data[0].run.weblink,
    date: speedruncom.data[0].run.date,
    thumbnail: details[0].data.assets["cover-tiny"].uri,
    game: details[0].data.names.international,
    details: details.slice(1).map((d) => d.data.name) || []
  }

  return {
    statusCode: 200,
    body: JSON.stringify(run)
  }
}

export { handler }
