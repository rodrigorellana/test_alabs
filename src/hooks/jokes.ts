import { useState, useEffect } from 'react';
import { IJoke } from '../interfaces/jokes';
const URL = 'https://retoolapi.dev/zu9TVE/jokes'

const useJokes = () => {
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [joke, setJoke] = useState<IJoke>({} as IJoke);
  const [error, setError] = useState(null);

  // const [page, setPage] = useState(initialPage);
  // const [limit, setLimit] = useState(initialLimit);

  // useEffect(() => {
  //   fetchJokesPaginate();
  // }, [page, limit]);

  const sanitizeJoke = (joke: any): IJoke => {
    return {
      id: joke.id,
      title: joke.title || joke.Title,
      views: joke.views || joke.Views,
      body: joke.body || joke.Body,
      author: joke.author || joke.Author,
      createdAt: joke.createdAt || joke.CreatedAt,
    }
  }

  const fetchJokesPaginate = async (page: number = 1, limit: number = 5) => {
    try {
      const target = URL + `/?_page=${page}&_limit=${limit}}`
      const response = await fetch(target);
      const data = await response.json() as IJoke[]
      console.log('fetchJokesPaginate', {target, data})
      setJokes(data.map((joke: any) => sanitizeJoke(joke)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchJokes = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json() as IJoke[]
      setJokes(data.map((joke: any) => sanitizeJoke(joke)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getJoke = async (id: string) => {
    try {
      const response = await fetch(`${URL}/${id}`);
      const data = await response.json() as IJoke
      setJoke(sanitizeJoke(data));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createJoke = async (joke: IJoke) => {
    try {
      const now = new Date()
      joke.createdAt = now.toISOString()
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke),
      })
      const data = await response.json()
      setJokes([...jokes, data]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateJoke = async (updatedJoke: IJoke) => {
    try {
      const response = await fetch(`${URL}/${updatedJoke.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJoke),
      })
      const data = await response.json()
      setJokes(jokes.map(joke => joke.id === updatedJoke.id ? data : joke));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteJoke = async (id: string) => {
    try {
      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      })
      setJokes(jokes.filter(joke => joke.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    jokes,
    joke,
    error,
    // page,
    // limit,
    // setPage,
    // setLimit,
    getJoke,
    deleteJoke,
    fetchJokes,
    updateJoke,
    createJoke,
    fetchJokesPaginate
  };
};

export default useJokes;