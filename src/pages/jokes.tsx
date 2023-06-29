"use client"
import React, { useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { IJoke } from '../interfaces/jokes';
import useJokes from '../hooks/jokes';

export const Jokes = ({ match }: RouteComponentProps<{ jokeId?: string }>) => {
  const history = useHistory();
  const { jokeId } = match.params;
  const { joke, getJoke, updateJoke, deleteJoke, createJoke } = useJokes();

  useEffect(() => {
    if (jokeId) {
      getJoke(jokeId)
    }
  }, [jokeId])

  const getValue = (event: React.FormEvent<HTMLFormElement>, name: string) => {
    const obj = event.currentTarget.elements.namedItem(name) as HTMLInputElement
    return obj.value
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const jokeForm: IJoke = {
      title: getValue(event, 'title'),
      views: parseInt(getValue(event, 'views')),
      body: getValue(event, 'body'),
      author: getValue(event, 'author'),
      id: jokeId,
    }

    // const validJoke = JSON.parse(JSON.stringify(jokeForm))
    // delete validJoke.id
    // delete validJoke.createdAt
    // const validated = Object.values(validJoke).every(value => !!value);
    // if (!validated) {
    //   alert('Please fill all fields')
    //   return
    // }

    if (jokeId) {
      jokeForm.createdAt = joke.createdAt
      await updateJoke(jokeForm)
    } else {
      const res = await createJoke(jokeForm)
      if (res) {
        localStorage.removeItem('page')
        history.push('/jokes')
      }
    }
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this joke?')) {
      const res = await deleteJoke(jokeId as string)
      if (res) history.push('/jokes')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required maxLength={50} defaultValue={joke.title}></input>
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <input type="text" id="body" name="body" required maxLength={350} defaultValue={joke.body}></input>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" required maxLength={30} defaultValue={joke.author}></input>
      </div>
      {/* <div>
        <label htmlFor="date">Created date:</label>
        <input readOnly type="text" id="date" name="date" defaultValue={joke.createdAt}></input>
      </div> */}
      <div>
        <label htmlFor="views">Views:</label>
        <input type="number" id="views" name="views" required defaultValue={joke.views}></input>
      </div>
      <div>
        <button type='submit'>Save</button>
        {jokeId && <button onClick={handleDelete}>Delete</button>}
        <button onClick={() => { history.push('/jokes') }}>Close</button>
      </div>
    </form>
  )
}
