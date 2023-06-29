import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { IJoke } from '../interfaces/jokes';
import { useErrorBoundary } from 'react-error-boundary'
const URL = 'https://retoolapi.dev/zu9TVE/jokes'

const useJokes = () => {
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [joke, setJoke] = useState<IJoke>({} as IJoke);
  const [error, setError] = useState(null);
  const { showBoundary } = useErrorBoundary()
  //PULGX TODO move page logic to this hook

  const getFormatedDate = (date: string) => {
    try {
      return new Intl.DateTimeFormat('en-US').format(new Date(date))
    } catch (error) {
      return date
    }
  }

  const sanitizeJoke = (joke: any): IJoke => {
    return {
      id: joke.id,
      title: joke.title || joke.Title || joke.query,
      // views: (joke.views ? joke.views : joke.Views) ,
      views: joke.views,
      body: joke.body || joke.Body,
      author: joke.author || joke.Author,
      createdAt: getFormatedDate(joke.createdAt || joke.CreatedAt)
    }
  }

  useEffect(() => {
    if (error) {
      const err = error as AxiosError
      if (err.response) {
        showBoundary(err);
      }
    }
  }, [error]);

  const manageError = (error: any) => {
    setError(error);
    return false;
  }

  const fetchJokesPaginate = async (page: number = 1, limit: number = 5) => {
    try {
      const target = URL + `/?_page=${page}&_limit=${limit}&_sort=id&_order=desc`
      const response = await axios.get(target)
      const data = response.data as IJoke[]
      localStorage.setItem('page', JSON.stringify(page));
      localStorage.setItem('limit', JSON.stringify(limit));
      setJokes(data.map((joke: any) => sanitizeJoke(joke)));
    } catch (err: any) {
      return manageError(error);
    }
  };

  const fetchJokes = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data as IJoke[]
      setJokes(data.map((joke: any) => sanitizeJoke(joke)));
    } catch (err: any) {
      return manageError(error);
    }
  };

  const getJoke = async (id: string) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const data = await response.data as IJoke
      setJoke(sanitizeJoke(data));
    } catch (err: any) {
      // return manageError(err);
    }
  };

  const createJoke = async (joke: IJoke): Promise<boolean> => {
    try {
      const now = new Date()
      joke.createdAt = now.toISOString()
      const response = await axios.post(URL, joke)
      const data = await response.data
      setJokes([...jokes, data]);
      return true;
    } catch (err: any) {
      return manageError(err);
    }
  };

  const updateJoke = async (updatedJoke: IJoke): Promise<boolean> => {
    try {
      const response = await axios.put(`${URL}/${updatedJoke.id}`, updatedJoke)
      const data = await response.data
      setJokes(jokes.map(joke => joke.id === updatedJoke.id ? data : joke));
      return true;
    } catch (err: any) {
      return manageError(err);
    }
  };

  const deleteJoke = async (id: string): Promise<boolean> => {
    try {
      await axios({
        baseURL: URL,
        url: `/${id}`,
        method: "DELETE"
      })
      setJokes(jokes.filter(joke => joke.id !== id));
      return true;
    } catch (err: any) {
      return manageError(err);
    }
  };

  return {
    jokes,
    joke,
    error,
    getJoke,
    deleteJoke,
    fetchJokes,
    updateJoke,
    createJoke,
    fetchJokesPaginate
  };
};

export default useJokes;