import { useState, useEffect } from 'react';
import { IJoke } from '../interfaces/jokes';
// import axios from 'axios';
const URL = 'https://retoolapi.dev/zu9TVE/jokes'

const useJokes = () => {
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [joke, setJoke] = useState<IJoke>({} as IJoke);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchJokes();
  // }, []);

  const fetchJokes = async () => {
    try {
      // const response = await axios.get('/api/jokes');
      const response = await fetch(URL);
      const data = await response.json()
      console.log('fetchJokes', data)
      setJokes(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getJoke = async (id: string) => {
    try {
      // const response = await axios.get('/api/jokes');
      const response = await fetch(`${URL}/${id}`);
      const data = await response.json()
      setJoke(data);
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

  // const deleteJoke = async (id) => {
  //   try {
  //     await axios.delete(`/api/jokes/${id}`);
  //     setJokes(jokes.filter(joke => joke.id !== id));
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  return { jokes, joke, error, getJoke, fetchJokes, updateJoke, createJoke };
};

export default useJokes;