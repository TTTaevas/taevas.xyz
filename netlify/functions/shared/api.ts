import fetch from "node-fetch"

export async function api<T>(url: string, restful_token?: string): Promise<T> {
  return (restful_token ? fetch(url, {headers: {"Authorization": `Bearer ${restful_token}`}}) : fetch(url))
    .then(response => {
      if (!response.ok) {
        console.error(response.status, response.statusText)
        throw new Error("Request failed :(")
      }
      return response.json() as Promise<T>
    })
}
