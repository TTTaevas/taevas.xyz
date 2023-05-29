import { Handler } from '@netlify/functions'
import { api } from "./shared/api"
import { HacktheboxInfo } from '../../src/components/infos/Hackthebox'

const handler: Handler = async (event, context) => {
  let hackthebox: {profile: {activity: HacktheboxInfo[]}} = await api<{
    profile: {
      activity: HacktheboxInfo[]
    }
  }>
  (`https://www.hackthebox.com/api/v4/profile/activity/1063999`)

  let pwn = hackthebox.profile.activity.find((a: HacktheboxInfo) => a!.object_type === "machine")
  if (!pwn) {
    return {
      statusCode: 404,
      body: ""
    }
  }
  
  pwn.machine_avatar = `https://www.hackthebox.com${pwn.machine_avatar}`
  pwn.date = pwn.date.substring(0, pwn.date.indexOf("T"))
  
  return {
    statusCode: 200,
    body: JSON.stringify(pwn)
  }
}

export { handler }
