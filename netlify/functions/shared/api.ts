import fetch from "node-fetch"

export async function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        console.error(response.status, response.statusText)
        throw new Error("Request failed :(")
      }
      return response.json() as Promise<T>
    })
}
