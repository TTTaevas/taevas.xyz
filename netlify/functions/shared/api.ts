export async function api<T>(url: string, restful_token?: string, post?: boolean, body?: BodyInit): Promise<T> {
  let fetched: Promise<Response>;
  if (post) {
    fetched = fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${restful_token}`,
        "Content-Type": "application/json",
      },
      body,
    });
  } else {
    fetched = (restful_token ? fetch(url, {headers: {"Authorization": `Bearer ${restful_token}`}}) : fetch(url));
  }
   
  return fetched.then(async response => {
    if (!response.ok) {
      console.error(response.status, response.statusText);
      throw new Error("Request failed :(");
    }

    return response.json() as Promise<T>;
  });
}
