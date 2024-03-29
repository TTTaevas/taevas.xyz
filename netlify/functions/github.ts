import { Handler } from '@netlify/functions'
import { Octokit } from '@octokit/core'
import { GithubInfo } from '../../src/components/infos/Git'

const handler: Handler = async () => {
  const octokit = new Octokit({auth: process.env.API_GITHUB})
  const github = await octokit.request("GET /users/TTTaevas/events", {per_page: 100})
  if (github.status !== 200) {
    return {
      statusCode: 404,
      body: ""
    }
  }

  const public_push = github.data.find((e: {type: string, public: boolean}) => e.type === "PushEvent" && e.public === true)
  const private_push = github.data.find((e: {type: string, public: boolean}) => e.type === "PushEvent" && e.public === false)
  if (!public_push || !private_push) {
    return {
      statusCode: 404,
      body: ""
    }
  }
  
  const info: GithubInfo = {
    public: {
      repo: public_push.repo.name,
      date: public_push.created_at.substring(0, public_push.created_at.indexOf("T"))
    },
    private: {
      date: private_push.created_at.substring(0, private_push.created_at.indexOf("T"))
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}

export { handler }
