import { IJoke } from "../interfaces/jokes";
import { Jokes as mockJokes } from "../mocks/jokes"
const URL = 'https://retoolapi.dev/zu9TVE/jokes'

const Jokes = (): any => {
  return mockJokes;
}

// export async function JokesGET({ search } : { search: string }) {
export async function JokesGET() {
  // if (search.trim() === "") {
  //   return null
  // }

  try {
    const response = await fetch(URL)
    const data = await response.json() as IJoke[]
    // return data
    return data?.map((joke: any) => ({
      id: joke.id,
      title: joke.title,
      views: joke.views,
      body: joke.body,
      author: joke.author,
      createdAt: joke.createdAt,
    }))

  } catch (error) {
    throw new Error('error')
  }
}

export async function JokesPOST(joke: IJoke) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joke),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('error')
  }
}

// const loadNFT = async ({ queryKey, pageParam }) => {
//   const limit = 20;
//   const page = 20;
//   const offset = pageParam ? pageParam : 0;
//   const queryparams = `/?_page=${page}&_limit=${limit}}`;
 
//   const res = await fetch(url + queryparams, {
//     headers: {
//       'mode': 'no-cors',
//     }
//   });
//   if (!res.ok) {
//     throw Error(`${url} responded with ${res.status}`);
//   }

//   const json = await res.json();
//   return {
//     results: json.results.map(item => {
//       return {
//         title: item.title,
//         img: item.img,
//         price: item.price,
//       }
//     }),
//     offset: offset + limit,
//   };
// }

export default Jokes