import { Handler } from '@netlify/functions'
import { api } from "./shared/api"

const handler: Handler = async (event, context) => {
  let hackthebox = await api<{
    profile: {
      activity: {
        id: string
        date_diff: string
        object_type: string
        type: string
        name: string
        machine_avatar: string
      }[]
    }
  }>
  (`https://www.hackthebox.com/api/v4/profile/activity/1063999`)

  let pwn = hackthebox.profile.activity.find((a) => a.object_type === "machine")
  if (!pwn) {
    return {
      statusCode: 404,
      body: ""
    }
  }
  
  pwn.machine_avatar = `https://www.hackthebox.com${pwn.machine_avatar}`
  
  return {
    statusCode: 200,
    body: JSON.stringify(pwn)
  }
}

export { handler }